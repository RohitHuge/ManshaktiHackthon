const { cleanText } = require('../utils/textCleaner');
const { v4: uuidv4 } = require('uuid');

const MAX_WORDS = 500;
const MIN_WORDS = 300; // soft target

/**
 * Split text into chunks ~300-500 words
 * @param {Array<{page: number, text: string}>} pageData 
 * @param {string} sourceName 
 * @param {string} docType 
 */
const chunkText = (pageData, sourceName, docType = 'document_ai') => {
    const chunks = [];

    for (const item of pageData) {
        const text = cleanText(item.text);
        if (!text) continue;

        const words = text.split(' ');
        let currentChunk = [];

        for (const word of words) {
            currentChunk.push(word);
            if (currentChunk.length >= MAX_WORDS) {
                chunks.push({
                    id: uuidv4(),
                    text: currentChunk.join(' '),
                    source: sourceName,
                    page: item.page,
                    language: 'en', // default, to be refined later with detection if needed
                    type: docType
                });
                currentChunk = [];
            }
        }

        // Add remaining words
        if (currentChunk.length > 0) {
            chunks.push({
                id: uuidv4(),
                text: currentChunk.join(' '),
                source: sourceName,
                page: item.page,
                language: 'en',
                type: docType
            });
        }
    }
    return chunks;
};

module.exports = { chunkText };
