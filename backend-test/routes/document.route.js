import express from 'express';
import multer from 'multer';
import { uploadPDFToVectorStore } from '../services/openai.service.js';
import { formatErrorResponse } from '../utils/responseFormatter.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'));
        }
    },
});

/**
 * POST /api/documents/upload
 * Upload PDF to OpenAI Vector Store
 */
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(formatErrorResponse('No file uploaded'));
        }

        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;

        // Upload to vector store
        const result = await uploadPDFToVectorStore(fileBuffer, fileName);

        res.json({
            status: 'success',
            documentId: result.fileId,
            fileName: result.fileName,
        });
    } catch (error) {
        console.error('Document upload error:', error);

        let errorMessage = 'Failed to upload document. Please try again.';

        if (error.message.includes('Only PDF files')) {
            errorMessage = 'Only PDF files are supported.';
        } else if (error.message.includes('File too large')) {
            errorMessage = 'File size must be under 10MB.';
        }

        res.status(500).json(formatErrorResponse(errorMessage));
    }
});

export default router;
