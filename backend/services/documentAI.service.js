const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

// Instantiate a client
// Ensure GOOGLE_APPLICATION_CREDENTIALS is set in environment
const client = new DocumentProcessorServiceClient();

const extractText = async (fileBuffer, mimeType) => {
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const location = 'us'; // Format is 'us' or 'eu'
    const processorId = process.env.GOOGLE_DOCUMENT_AI_PROCESSOR_ID;

    if (!projectId || !processorId) {
        throw new Error('Google Document AI configuration missing');
    }

    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    // Convert buffer to base64
    const content = fileBuffer.toString('base64');

    const request = {
        name,
        rawDocument: {
            content,
            mimeType,
        },
    };

    const [result] = await client.processDocument(request);
    const { document } = result;

    if (!document) {
        throw new Error('Document AI processing failed');
    }

    // Extract page-wise text
    const pagesText = [];
    const { text } = document;

    if (document.pages && document.pages.length > 0) {
        for (const page of document.pages) {
            const pageNumber = page.pageNumber;
            // Document AI text is one large string, segments/layout info map to it.
            // Getting exact page text can be tricky if using simple text field.
            // However, for standard OCR, the segments usually align. 
            // Simpler approach: Document AI often returns full text. 
            // For rigorous page mapping, we need to use page.layout.textAnchor to slice `document.text`.

            let pageContent = "";
            if (page.paragraphs) {
                for (const paragraph of page.paragraphs) {
                    const segments = paragraph.layout.textAnchor.textSegments;
                    for (const segment of segments) {
                        const startIndex = parseInt(segment.startIndex || 0);
                        const endIndex = parseInt(segment.endIndex);
                        pageContent += text.substring(startIndex, endIndex);
                    }
                }
            }
            // Fallback if paragraphs structure isn't populated (model dependent), try blocks?
            // Or if simpler, just assume sequential if not complex.
            // Let's stick to Layout extraction which works for Form/OCR processors.

            // If pageContent is empty, iterate tokens or blocks?
            if (!pageContent.trim() && page.blocks) {
                for (const block of page.blocks) {
                    const segments = block.layout.textAnchor.textSegments;
                    for (const segment of segments) {
                        const startIndex = parseInt(segment.startIndex || 0);
                        const endIndex = parseInt(segment.endIndex);
                        pageContent += text.substring(startIndex, endIndex);
                    }
                }
            }

            pagesText.push({
                page: pageNumber,
                text: pageContent
            });
        }
    } else {
        // Single page or no page structure returned
        pagesText.push({ page: 1, text: text });
    }

    return pagesText;
};

module.exports = { extractText };
