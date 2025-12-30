import express from 'express';
import { searchWisdom } from '../services/vectorSearch.service.js';
import { formatChatResponse, formatErrorResponse } from '../utils/responseFormatter.js';

const router = express.Router();

/**
 * POST /api/chat
 * Query wisdom based on user message
 */
router.post('/', async (req, res) => {
    try {
        const { message, language, mode } = req.body;

        // Validate required fields
        if (!message || typeof message !== 'string') {
            return res.status(400).json(formatErrorResponse('Message is required and must be a string'));
        }

        if (language && !['en', 'mr'].includes(language)) {
            return res.status(400).json(formatErrorResponse('Language must be "en" or "mr"'));
        }

        if (mode && mode !== 'wisdom') {
            return res.status(400).json(formatErrorResponse('Mode must be "wisdom"'));
        }

        // Default to English if not specified
        const queryLanguage = language || 'en';

        // Search for wisdom
        const result = await searchWisdom(message, queryLanguage);

        // Format response according to API contract
        const response = formatChatResponse(
            result.responseText,
            result.source,
            result.confidence
        );

        res.json(response);
    } catch (error) {
        console.error('Chat endpoint error:', error);

        // Friendly error messages
        let errorMessage = 'Unable to retrieve wisdom at this time. Please try again.';

        if (error.message.includes('timeout')) {
            errorMessage = 'The request took too long. Please try again with a simpler question.';
        } else if (error.message.includes('not found')) {
            errorMessage = 'No relevant wisdom found for your query. Try rephrasing your question.';
        } else if (error.message.includes('OPENAI_API_KEY')) {
            errorMessage = 'Server configuration error. Please contact support.';
        }

        res.status(500).json(formatErrorResponse(errorMessage));
    }
});

export default router;
