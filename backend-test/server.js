import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.route.js';
import documentRouter from './routes/document.route.js';
import presetsRouter from './routes/presets.route.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Manashakti Wisdom Backend',
    });
});

// API Routes
app.use('/api/chat', chatRouter);
app.use('/api/documents', documentRouter);
app.use('/api/presets', presetsRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: 'Endpoint not found',
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);

    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Internal server error',
    });
});

// Validate required environment variables
const requiredEnvVars = ['OPENAI_API_KEY', 'OPENAI_VECTOR_STORE_ID'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
    console.error('Please create a .env file based on .env.example');
    process.exit(1);
}

// Start server
app.listen(PORT, () => {
    console.log('🚀 Manashakti Wisdom Backend Server');
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`🔍 Vector Store ID: ${process.env.OPENAI_VECTOR_STORE_ID}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
    console.log('\n📚 Available endpoints:');
    console.log(`   POST http://localhost:${PORT}/api/chat`);
    console.log(`   POST http://localhost:${PORT}/api/documents/upload`);
    console.log(`   GET  http://localhost:${PORT}/api/presets`);
});
