import { randomUUID } from 'crypto';

/**
 * Parse AI response text into structured format
 * @param {string} text - Raw AI response text
 * @returns {Object} Structured answer with summary and steps
 */
export function parseAIResponse(text) {
    // Split into paragraphs
    const paragraphs = text
        .split('\n\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

    let summary = '';
    const steps = [];

    // Strategy: First paragraph is usually the summary
    // Numbered or bulleted items are steps
    for (let i = 0; i < paragraphs.length; i++) {
        const para = paragraphs[i];

        // Check if this is a numbered list or bullet point
        const isNumbered = /^\d+[\.\)]\s/.test(para);
        const isBulleted = /^[-*•]\s/.test(para);

        if (isNumbered || isBulleted) {
            // Split into individual steps if multiple are in one paragraph
            const lines = para.split('\n').filter((line) => line.trim());
            for (const line of lines) {
                const cleanStep = line.replace(/^\d+[\.\)]\s|^[-*•]\s/, '').trim();
                if (cleanStep) {
                    steps.push(cleanStep);
                }
            }
        } else if (!summary && i === 0) {
            // First non-list paragraph is likely the summary
            summary = para;
        } else if (!summary) {
            // If we haven't found a summary yet, use this paragraph
            summary = para;
        } else if (steps.length === 0) {
            // If we have a summary but no steps yet, this might be additional context
            // Try to extract steps from sentences
            const sentences = para.split(/(?<=[.!?])\s+/);
            sentences.forEach((sentence) => {
                if (sentence.trim().length > 20) {
                    // Only add substantial sentences as steps
                    steps.push(sentence.trim());
                }
            });
        }
    }

    // Fallback: if no clear structure, treat first paragraph as summary
    // and rest as steps
    if (!summary && paragraphs.length > 0) {
        summary = paragraphs[0];
    }

    if (steps.length === 0 && paragraphs.length > 1) {
        steps.push(...paragraphs.slice(1));
    }

    // If still no steps, create at least one from the summary
    if (steps.length === 0 && summary) {
        steps.push(summary);
    }

    return {
        summary: summary || 'Wisdom guidance based on Manashakti principles.',
        steps: steps.length > 0 ? steps : ['Reflect on the situation with calm awareness.'],
    };
}

/**
 * Format successful chat response according to API contract
 * @param {string} responseText - Raw AI response
 * @param {Object} source - Source metadata
 * @param {Object} confidence - Confidence metrics
 * @returns {Object} Formatted API response
 */
export function formatChatResponse(responseText, source, confidence) {
    const parsedAnswer = parseAIResponse(responseText);

    return {
        id: randomUUID(),
        answer: {
            summary: parsedAnswer.summary,
            steps: parsedAnswer.steps,
        },
        source: {
            book: source.book || 'Manashakti Wisdom',
            chapter: source.chapter || 'General Principles',
            page: source.page || null,
            pdfUrl: source.pdfUrl || null,
        },
        confidence: {
            matchedPrinciples: confidence.matchedPrinciples || 0,
            totalPrinciples: confidence.totalPrinciples || 5,
        },
    };
}

/**
 * Format error response according to API contract
 * @param {string} message - Error message
 * @returns {Object} Formatted error response
 */
export function formatErrorResponse(message) {
    return {
        error: true,
        message: message || 'An unexpected error occurred',
    };
}

export default {
    parseAIResponse,
    formatChatResponse,
    formatErrorResponse,
};
