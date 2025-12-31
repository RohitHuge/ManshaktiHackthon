const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Routes
const indexRoutes = require('./routes/index.route');
app.use('/api', indexRoutes);

// Basic health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'ManShakti Backend' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: true,
        message: err.message || 'Internal Server Error'
    });
});

const { ensureCollection } = require('./services/qdrant.service');

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await ensureCollection();
});
