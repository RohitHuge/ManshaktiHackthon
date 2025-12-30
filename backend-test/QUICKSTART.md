# 🚀 Quick Start Guide - Manashakti Wisdom Backend

## Prerequisites Checklist

Before running the server, ensure you have:

- ✅ Node.js 20+ installed
- ⚠️ OpenAI API Key (get from: https://platform.openai.com/api-keys)
- ⚠️ OpenAI Vector Store ID (must be pre-created with indexed PDFs)

---

## Setup Steps

### 1. Configure Environment Variables

Create a `.env` file in the `backend-test` directory:

**Option A - Copy from template:**
```bash
cp .env.example .env
```

**Option B - Create manually:**
```bash
# On Windows
notepad .env
```

**Add these values to `.env`:**
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_VECTOR_STORE_ID=vs_your-actual-vector-store-id
PORT=5000
NODE_ENV=development
```

> **⚠️ IMPORTANT**: Replace the placeholder values with your actual credentials!

---

### 2. Start the Server

**Development mode (recommended):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Expected output:**
```
🚀 Manashakti Wisdom Backend Server
📡 Server running on port 5000
🔍 Vector Store ID: vs_abc123...
🌐 Health check: http://localhost:5000/health
```

If you see an error about missing environment variables, review Step 1.

---

### 3. Test the API

**Test 1 - Health Check** (no credentials needed):
```bash
curl http://localhost:5000/health
```

**Test 2 - Presets** (no credentials needed):
```bash
curl http://localhost:5000/api/presets
```

**Test 3 - Chat Endpoint** (requires valid credentials):
```bash
curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"I have exam stress and only 10 days left\",\"language\":\"en\",\"mode\":\"wisdom\"}"
```

---

## Troubleshooting

### Error: "Missing required environment variables"
- ❌ `.env` file not created or incomplete
- ✅ **Fix**: Create `.env` file and add all required variables

### Error: "Cannot load scripts" (PowerShell)
- ❌ PowerShell execution policy blocking npm
- ✅ **Fix**: Already handled - commands use bypass flag

### Error: OpenAI API errors
- ❌ Invalid API key or Vector Store ID
- ✅ **Fix**: Double-check your OpenAI credentials

### Server starts but chat returns errors
- ❌ Vector Store not properly configured or empty
- ✅ **Fix**: Verify Vector Store has indexed PDFs

---

## What's Next?

Once the server is running successfully:

1. **Integrate with Frontend**: Point frontend to `http://localhost:5000`
2. **Upload More PDFs**: Use `POST /api/documents/upload`
3. **Test Bilingual**: Try Marathi queries with `"language": "mr"`

---

## 📚 Documentation

- Full API documentation: [README.md](file:///e:/PROJECTS/ManShakti/backend-test/README.md)
- Implementation walkthrough: See artifacts
