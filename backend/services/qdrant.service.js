const { QdrantClient } = require('@qdrant/js-client-rest');

const getClient = () => {
    const url = process.env.QDRANT_URL;
    if (!url) throw new Error('QDRANT_URL not defined');
    return new QdrantClient({ url });
};

const COLLECTION_NAME = process.env.QDRANT_COLLECTION || 'manashakti';

const { getEmbedding } = require('./sbert.service');

const ensureCollection = async () => {
    const client = getClient();
    try {
        const result = await client.getCollections();
        const exists = result.collections.some(c => c.name === COLLECTION_NAME);

        if (!exists) {
            console.log(`Collection ${COLLECTION_NAME} missing. Attempting to create...`);

            // 1. Determine dimension from SBERT
            let dimension = 384; // Default fallback
            try {
                const dummyVector = await getEmbedding('test');
                if (dummyVector && dummyVector.length > 0) {
                    dimension = dummyVector.length;
                    console.log(`Detected SBERT dimension: ${dimension}`);
                }
            } catch (err) {
                console.error('Failed to fetch SBERT dimension, using fallback 384', err.message);
            }

            // 2. Create Collection
            await client.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: dimension,
                    distance: 'Cosine'
                }
            });
            console.log(`Created collection: ${COLLECTION_NAME}`);
        }
    } catch (e) {
        console.error('Error checking/creating Qdrant collection', e);
    }
};

const upsertPoints = async (points) => {
    const client = getClient();
    // points: Array of { id, vector, payload }
    await client.upsert(COLLECTION_NAME, {
        wait: true,
        points: points
    });
};

const search = async (vector, limit = 5, filter = null) => {
    const client = getClient();
    const results = await client.search(COLLECTION_NAME, {
        vector: vector,
        limit: limit,
        filter: filter,
        with_payload: true
    });
    return results;
};

module.exports = { upsertPoints, search, ensureCollection };
