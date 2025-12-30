# Manashakti Test Backend

A simple Express server providing mock API responses for testing the Manashakti Wisdom frontend.

## Quick Start

### Install Dependencies

```bash
cd backend-test
npm install
```

### Run Server

```bash
npm start
```

Server will start at `http://localhost:3000`

## API Endpoints

### POST `/api/chat`

Mock wisdom chat endpoint.

**Request:**
```json
{
  "message": "I have exam stress",
  "language": "en",
  "mode": "wisdom"
}
```

**Response:**
```json
{
  "id": "msg_12345",
  "answer": {
    "summary": "Summary text...",
    "steps": ["step 1", "step 2", ...]
  },
  "source": {
    "book": "Book Name",
    "chapter": "Chapter Name",
    "page": 42,
    "pdfUrl": "https://..."
  },
  "confidence": {
    "matchedPrinciples": 5,
    "totalPrinciples": 10
  }
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "Test backend is running!"
}
```

## Features

- ✅ CORS enabled
- ✅ Mock wisdom responses with source citations
- ✅ Simulated 1.5s processing delay
- ✅ Random response selection from 3 sample wisdoms
- ✅ Proper error handling

## Sample Responses

The backend includes 3 pre-configured wisdom responses covering:
1. Exam stress management
2. Career decision making
3. Overcoming inferiority complex

Each response includes realistic source citations with book name, chapter, and page number.
