const express = require('express');
const router = express.Router();
const { getEmbedding } = require('../services/sbert.service');
const { search } = require('../services/qdrant.service');
const { generateAnswer } = require('../services/llm.service');
const { handleError } = require('../utils/errorHandler');

// POST /api/chat
router.post('/', async (req, res) => {
    const { message, language, mode } = req.body;

    if (!message) {
        return res.status(400).json({ error: true, message: 'Message is required' });
    }

    const currentLang = language || 'en';

    try {
        // 1. Embed user query
        const vector = await getEmbedding(message);

        // 2. Search Qdrant
        const results = await search(vector, 5); // Get top 5 chunks

        // 3. Generate Answer
        const answer = await generateAnswer(message, results, currentLang);

        // 4. Construct Response Source (Take the top result for citation)
        let sourceInfo = {
            book: 'Unknown',
            chapter: 'Unknown',
            page: 0,
            pdfUrl: ''
        };

        if (results.length > 0) {
            const top = results[0].payload;
            sourceInfo = {
                book: top.source, // Using filename as book for now
                chapter: '', // PDF extraction doesn't give chapters easily yet
                page: top.page,
                pdfUrl: '' // We don't have a public URL for local uploads yet
            };
        }

        // Calculate confidence (Mock calculation based on score)
        // results have .score. Assume > 0.7 is good match.
        // Let's just sum up "matchedPrinciples" as count of results above threshold.
        const matched = results.filter(r => r.score > 0.5).length;

        res.json({
            id: require('uuid').v4(), // Generate a unique ID for the turn
            answer: {
                summary: answer.summary,
                steps: answer.steps || []
            },
            source: sourceInfo,
            confidence: {
                matchedPrinciples: matched,
                totalPrinciples: results.length
            }
        });

    } catch (error) {
        handleError(res, error, 'Failed to process chat query');
    }
});

module.exports = router;
