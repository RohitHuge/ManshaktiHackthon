import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const VECTOR_STORE_ID = process.env.OPENAI_VECTOR_STORE_ID;

/**
 * Query the OpenAI Vector Store with file search
 * @param {string} query - User's wisdom query
 * @param {string} language - Language code (en/mr)
 * @returns {Promise<Object>} OpenAI response with sources
 */
export async function queryWisdomWithSources(query, language = 'en') {
    try {
        // System prompt based on language
        const systemPrompts = {
            en: `You are a compassionate wisdom guide based on Manashakti principles. 
Provide structured, actionable guidance with:
1. A brief summary paragraph
2. Clear numbered steps the person can take
3. Always cite your sources from the texts

Use a calm, supportive, non-preachy tone. Ground all advice in retrieved content - avoid generic suggestions.`,
            mr: `तुम्ही मानशक्ती तत्त्वांवर आधारित दयाळू ज्ञान मार्गदर्शक आहात.
रचनात्मक, कार्यान्वित करण्यायोग्य मार्गदर्शन द्या:
1. एक संक्षिप्त सारांश परिच्छेद
2. व्यक्ती उचलू शकेल अशा स्पष्ट क्रमांकित पायऱ्या
3. नेहमी मजकूरातून तुमचे स्रोत उद्धृत करा

शांत, सहाय्यक, उपदेशात्मक नसलेला स्वर वापरा. सर्व सल्ला पुनर्प्राप्त सामग्रीवर आधारित ठेवा - सामान्य सूचना टाळा.`
        };

        const systemPrompt = systemPrompts[language] || systemPrompts.en;

        // Create a thread
        const thread = await openai.beta.threads.create();

        // Add the user's message to the thread
        await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: query,
        });

        // Create and run with file search
        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: null, // We're not using a pre-created assistant
            model: 'gpt-4o',
            instructions: systemPrompt,
            tools: [
                {
                    type: 'file_search',
                },
            ],
            tool_resources: {
                file_search: {
                    vector_store_ids: [VECTOR_STORE_ID],
                },
            },
        });

        // Check if the run completed successfully
        if (run.status !== 'completed') {
            throw new Error(`Run failed with status: ${run.status}`);
        }

        // Retrieve the messages
        const messages = await openai.beta.threads.messages.list(thread.id);

        // Get the assistant's response (first message in the list is the latest)
        const assistantMessage = messages.data.find(
            (msg) => msg.role === 'assistant'
        );

        if (!assistantMessage) {
            throw new Error('No assistant response found');
        }

        // Extract text content
        const textContent = assistantMessage.content.find(
            (content) => content.type === 'text'
        );

        if (!textContent) {
            throw new Error('No text content in assistant response');
        }

        // Extract annotations (citations/sources)
        const annotations = textContent.text.annotations || [];
        const text = textContent.text.value;

        // Parse file citations from annotations
        const sources = [];
        for (const annotation of annotations) {
            if (annotation.type === 'file_citation') {
                const fileCitation = annotation.file_citation;

                // Retrieve file details
                try {
                    const citedFile = await openai.files.retrieve(fileCitation.file_id);
                    sources.push({
                        fileId: fileCitation.file_id,
                        fileName: citedFile.filename,
                        quote: fileCitation.quote || '',
                    });
                } catch (error) {
                    console.error('Error retrieving file:', error.message);
                }
            }
        }

        return {
            text,
            sources,
            threadId: thread.id,
            runId: run.id,
        };
    } catch (error) {
        console.error('OpenAI query error:', error);
        throw new Error(`Failed to query wisdom: ${error.message}`);
    }
}

/**
 * Upload a PDF file to the existing Vector Store
 * @param {Buffer} fileBuffer - PDF file buffer
 * @param {string} fileName - Original file name
 * @returns {Promise<Object>} Upload result with file ID
 */
export async function uploadPDFToVectorStore(fileBuffer, fileName) {
    try {
        // Upload the file to OpenAI
        const file = await openai.files.create({
            file: new Blob([fileBuffer], { type: 'application/pdf' }),
            purpose: 'assistants',
        });

        // Add file to the existing vector store
        await openai.beta.vectorStores.files.create(VECTOR_STORE_ID, {
            file_id: file.id,
        });

        // Poll until the file is processed
        let vectorStoreFile = await openai.beta.vectorStores.files.retrieve(
            VECTOR_STORE_ID,
            file.id
        );

        // Wait for processing (simple polling)
        while (vectorStoreFile.status === 'in_progress') {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            vectorStoreFile = await openai.beta.vectorStores.files.retrieve(
                VECTOR_STORE_ID,
                file.id
            );
        }

        if (vectorStoreFile.status === 'failed') {
            throw new Error('File processing failed');
        }

        return {
            fileId: file.id,
            fileName: fileName,
            status: vectorStoreFile.status,
        };
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload PDF: ${error.message}`);
    }
}

export default {
    queryWisdomWithSources,
    uploadPDFToVectorStore,
};
