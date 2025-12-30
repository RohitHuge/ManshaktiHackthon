# Manashakti Wisdom Backend API

Clean, stateless backend API for querying pre-indexed Manashakti PDFs from OpenAI Vector Store.

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- OpenAI API Key
- Pre-created OpenAI Vector Store ID with indexed PDFs

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Copy `.env.example` to `.env` (or create `.env`):
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your credentials:
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   OPENAI_VECTOR_STORE_ID=vs_your-vector-store-id
   PORT=5000
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

Server will be available at `http://localhost:5000`

## 📡 API Endpoints

### 1. POST `/api/chat`

Query wisdom based on user message.

**Request Body:**
```json
{
  "message": "I have exam stress and only 10 days left",
  "language": "en",
  "mode": "wisdom"
}
```

**Response:**
```json
{
  "id": "uuid",
  "answer": {
    "summary": "Brief paragraph summary...",
    "steps": [
      "Step 1: ...",
      "Step 2: ..."
    ]
  },
  "source": {
    "book": "Book Name",
    "chapter": "Chapter 3",
    "page": 42,
    "pdfUrl": "/documents/book.pdf"
  },
  "confidence": {
    "matchedPrinciples": 3,
    "totalPrinciples": 5
  }
}
```

### 2. POST `/api/documents/upload`

Upload PDF to OpenAI Vector Store (admin endpoint).

**Request:**
- Content-Type: `multipart/form-data`
- Field: `file` (PDF, max 10MB)

**Response:**
```json
{
  "status": "success",
  "documentId": "file-abc123",
  "fileName": "wisdom-book.pdf"
}
```

### 3. GET `/api/presets`

Get preset wisdom queries for quick access.

**Response:**
```json
[
  "I have exam stress and only 10 days left",
  "I feel anxious about a career decision",
  "I feel inferiority complex in college"
]
```

### 4. GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-30T15:10:24.000Z",
  "service": "Manashakti Wisdom Backend"
}
```

## 🏗️ Project Structure

```
backend-test/
├── server.js                 # Main server entry point
├── routes/
│   ├── chat.route.js        # Chat endpoint logic
│   ├── document.route.js    # Document upload logic
│   └── presets.route.js     # Presets endpoint
├── services/
│   ├── openai.service.js    # OpenAI API wrapper
│   └── vectorSearch.service.js  # Vector search logic
├── utils/
│   └── responseFormatter.js # Response formatting utilities
├── package.json
├── .env.example
└── .gitignore
```

## 🧪 Testing

### Using cURL

**Test health check:**
```bash
curl http://localhost:5000/health
```

**Test chat endpoint:**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I have exam stress and only 10 days left",
    "language": "en",
    "mode": "wisdom"
  }'
```

**Test presets:**
```bash
curl http://localhost:5000/api/presets
```

**Test document upload:**
```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -F "file=@path/to/your.pdf"
```

### Using Postman or Thunder Client

Import the following collection or create requests manually:
- POST `http://localhost:5000/api/chat`
- GET `http://localhost:5000/api/presets`
- POST `http://localhost:5000/api/documents/upload`

## 🔒 Security Notes

> **⚠️ IMPORTANT**: This is a hackathon MVP with NO authentication.
> 
> - All endpoints are publicly accessible
> - `/api/documents/upload` is unprotected
> - Do NOT use in production without adding auth

## 🛠️ Development

**Watch mode (auto-restart on changes):**
```bash
npm run dev
```

**Environment variables:**
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `OPENAI_VECTOR_STORE_ID` - Pre-created vector store ID (required)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (default: development)

## 📝 Error Handling

All errors follow this format:
```json
{
  "error": true,
  "message": "Human-readable error message"
}
```

Common errors:
- Missing/invalid request fields → `400 Bad Request`
- OpenAI API errors → `500 Internal Server Error`
- File upload errors → `500 Internal Server Error`

## 🌐 CORS

CORS is enabled for all origins. Adjust in `server.js` if needed for production.

## 📄 License

MIT
