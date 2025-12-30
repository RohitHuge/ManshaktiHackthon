import express from 'express';

const router = express.Router();

// Preset wisdom queries for quick access
const PRESETS = [
    'I have exam stress and only 10 days left',
    'I feel anxious about a career decision',
    'I feel inferiority complex in college',
];

/**
 * GET /api/presets
 * Return preset wisdom queries
 */
router.get('/', (req, res) => {
    res.json(PRESETS);
});

export default router;
