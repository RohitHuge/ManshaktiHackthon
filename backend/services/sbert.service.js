const axios = require('axios');

const getEmbedding = async (text) => {
    const sbertUrl = process.env.SBERT_EMBEDDING_URL;
    if (!sbertUrl) {
        throw new Error('SBERT_EMBEDDING_URL is not defined');
    }

    try {
        const response = await axios.post(sbertUrl, { text });
        if (response.data && response.data.embedding) {
            return response.data.embedding;
        } else {
            throw new Error('Invalid response from SBERT service');
        }
    } catch (error) {
        console.error('SBERT Service Error:', error.message);
        throw new Error('Failed to generate embeddings');
    }
};

module.exports = { getEmbedding };
