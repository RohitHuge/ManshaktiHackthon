import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample wisdom responses
const wisdomResponses = [
    {
        summary: "Exam stress is natural, but preparation with the right mindset transforms anxiety into focused action.",
        steps: [
            "Create a realistic study schedule distributing topics across remaining days",
            "Practice deep breathing exercises for 5 minutes before each study session",
            "Focus on understanding core concepts rather than memorizing everything",
            "Maintain 7-8 hours of sleep and proper nutrition to support cognitive function",
            "Take short breaks every 45 minutes to refresh your mind"
        ],
        source: {
            book: "Prayatna Rahasya – Study Efforts",
            chapter: "Managing Pre-Examination Anxiety",
            page: 42,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
    },
    {
        summary: "Career decisions require clarity of purpose. True success comes from aligning your work with your inner values.",
        steps: [
            "Write down your core values and what truly matters to you in life",
            "Research both options thoroughly, including long-term growth potential",
            "Consult with mentors or experienced professionals in both fields",
            "Visualize yourself in each role 5 years from now",
            "Trust your intuition after gathering all rational information"
        ],
        source: {
            book: "Karma Yoga – Path of Action",
            chapter: "Choosing Your Life's Work",
            page: 78,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
    },
    {
        summary: "Inferiority complex stems from comparison. Your unique journey and progress are incomparable to others.",
        steps: [
            "Identify and write down your unique strengths and achievements",
            "Practice gratitude daily for what you have and who you are",
            "Set personal goals based on your own growth, not others' standards",
            "Engage in activities where you excel to build confidence",
            "Seek supportive friendships that celebrate your authentic self"
        ],
        source: {
            book: "Atmavishwas – Self Confidence",
            chapter: "Overcoming Comparison",
            page: 56,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
    }
];

// Mock /api/chat endpoint
app.post('/api/chat', (req, res) => {
    const { message, language, mode } = req.body;

    console.log(`📩 Received chat request: "${message}"`);

    // Simulate processing delay
    setTimeout(() => {
        // Select a random wisdom response
        const response = wisdomResponses[Math.floor(Math.random() * wisdomResponses.length)];

        const apiResponse = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            answer: {
                summary: response.summary,
                steps: response.steps
            },
            source: response.source,
            confidence: {
                matchedPrinciples: Math.floor(Math.random() * 3) + 5,
                totalPrinciples: 10
            }
        };

        console.log(`✅ Sending response from: ${response.source.book}`);
        res.json(apiResponse);
    }, 1500); // 1.5 second delay to simulate processing
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', message: 'Test backend is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 Manashakti Test Backend Running!');
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`🔗 API Endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    console.log('\n✨ Ready to receive wisdom requests!\n');
});
