const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { extractText } = require('../services/documentAI.service');
const { chunkText } = require('../services/chunking.service');
const { getEmbedding } = require('../services/sbert.service');
const { upsertPoints } = require('../services/qdrant.service');
const { handleError } = require('../utils/errorHandler');

// Configure Multer
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/documents/index
// POST /api/documents/upload
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: true, message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;
    const mimeType = req.file.mimetype;

    if (mimeType !== 'application/pdf') {
        fs.unlinkSync(filePath); // Cleanup
        return res.status(400).json({ error: true, message: 'Only PDF files are allowed' });
    }

    try {
        // 1. Extract Text via Document AI
        const fileBuffer = fs.readFileSync(filePath);
        const pageData = await extractText(fileBuffer, mimeType);

        // 2. Chunk Text
        const chunks = chunkText(pageData, originalName, 'document_ai');

        if (chunks.length === 0) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: true, message: 'No text extracted from document' });
        }

        // 3. Generate Embeddings & Prepare Points
        const points = [];
        for (const chunk of chunks) {
            const vector = await getEmbedding(chunk.text);
            points.push({
                id: chunk.id,
                vector: vector,
                payload: {
                    text: chunk.text,
                    source: chunk.source,
                    page: chunk.page,
                    language: chunk.language,
                    type: chunk.type
                }
            });
        }

        // 4. Store in Qdrant
        await upsertPoints(points);

        // Cleanup uploaded file
        fs.unlinkSync(filePath);

        res.json({
            status: 'success',
            document: {
                fileName: originalName,
                chunksIndexed: points.length
            }
        });

    } catch (error) {
        // Clean up file if error occurs
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        handleError(res, error, 'Failed to index document');
    }
});

module.exports = router;
