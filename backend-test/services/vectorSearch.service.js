import { queryWisdomWithSources } from './openai.service.js';

/**
 * Extract metadata from file name and source text
 * @param {string} fileName - Name of the source file
 * @param {string} quote - Quote/excerpt from the source
 * @returns {Object} Parsed metadata
 */
function parseSourceMetadata(fileName, quote) {
    // Default metadata
    const metadata = {
        book: fileName || 'Unknown Source',
        chapter: 'General Wisdom',
        page: null,
        pdfUrl: null,
    };

    // Try to extract book name from filename
    if (fileName) {
        // Remove .pdf extension and clean up
        const bookName = fileName.replace(/\.pdf$/i, '').replace(/_/g, ' ');
        metadata.book = bookName;
    }

    // Try to extract page number from quote or context
    if (quote) {
        const pageMatch = quote.match(/page\s+(\d+)/i) || quote.match(/पृष्ठ\s+(\d+)/i);
        if (pageMatch) {
            metadata.page = parseInt(pageMatch[1], 10);
        }

        // Try to extract chapter info
        const chapterMatch = quote.match(/chapter\s+(\d+)/i) || quote.match(/प्रकरण\s+(\d+)/i);
        if (chapterMatch) {
            metadata.chapter = `Chapter ${chapterMatch[1]}`;
        }
    }

    // For hackathon: use a placeholder or local path
    // In production, this would map to actual hosted PDF URLs
    if (fileName) {
        metadata.pdfUrl = `/documents/${encodeURIComponent(fileName)}`;
    }

    return metadata;
}

/**
 * Calculate confidence score based on sources
 * @param {Array} sources - Array of source citations
 * @returns {Object} Confidence metrics
 */
function calculateConfidence(sources) {
    // Simple heuristic: more sources = higher confidence
    const matchedPrinciples = Math.min(sources.length, 5);
    const totalPrinciples = 5;

    return {
        matchedPrinciples,
        totalPrinciples,
    };
}

/**
 * Search for wisdom based on user query
 * @param {string} message - User's question/situation
 * @param {string} language - Language code (en/mr)
 * @returns {Promise<Object>} Structured wisdom response
 */
export async function searchWisdom(message, language = 'en') {
    try {
        // Query OpenAI with vector search
        const result = await queryWisdomWithSources(message, language);

        // Extract source metadata from the first available source
        let sourceMetadata = {
            book: 'Manashakti Wisdom',
            chapter: 'General Principles',
            page: null,
            pdfUrl: null,
        };

        if (result.sources && result.sources.length > 0) {
            const primarySource = result.sources[0];
            sourceMetadata = parseSourceMetadata(
                primarySource.fileName,
                primarySource.quote
            );
        }

        // Calculate confidence
        const confidence = calculateConfidence(result.sources || []);

        return {
            responseText: result.text,
            source: sourceMetadata,
            confidence,
            threadId: result.threadId,
            runId: result.runId,
        };
    } catch (error) {
        console.error('Vector search error:', error);
        throw error;
    }
}

export default {
    searchWisdom,
};
