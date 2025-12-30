# Manashakti Wisdom-on-Demand Frontend

A modern, calming chat interface for AI-powered wisdom guidance derived from Manashakti philosophy books.

## 🚀 Quick Start

### Install Dependencies

Since PowerShell may block npm, use one of these methods:

**Command Prompt (Recommended):**
```cmd
cd E:\PROJECTS\ManShakti\frontend
npm install --legacy-peer-deps
```

**PowerShell (If Admin):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install --legacy-peer-deps
```

**Git Bash:**
```bash
npm install --legacy-peer-deps
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## ⚙️ Configuration

Update `.env` to configure backend URL:
```
VITE_BACKEND_URL=http://localhost:3000
```

## ✨ Features

- 💬 **Chat Interface** - User & AI messages with calm spiritual design
- 📚 **Source Citations** - Every answer cites book, chapter, and page
- 📄 **PDF Viewer** - View original documents with auto page jump
- 🎙️ **Voice Input** - Speech-to-text (Chrome/Edge only)
- ⚡ **Preset Questions** - Quick demo questions for hackathon
- 📱 **Responsive** - Works on desktop and mobile
- ♿ **Accessible** - Keyboard navigation, focus states

## 🎨 Design

- **Colors**: Off-white backgrounds, soft saffron accents, earthy tones
- **Fonts**: Inter (UI), Lora (spiritual content)
- **Animations**: Smooth transitions, micro-interactions

## 📋 API Contract

### POST `/api/chat`
```json
{
  "message": "user question",
  "language": "en",
  "mode": "wisdom"
}
```

Response includes `answer`, `source`, and `confidence` fields.

## 🧪 Testing

1. Send a message → Verify AI response with source
2. Click "View Original Document" → PDF opens
3. Click microphone → Speak question (Chrome/Edge)
4. Try preset questions → Input populated
5. Resize to mobile → Responsive layout

## 📦 Built With

- React 19
- Vite
- react-pdf (PDF viewer)
- lucide-react (Icons)
- Web Speech API (Voice input)

## 🎯 Hackathon Ready

No authentication required. Just start the dev server and demo!

For detailed documentation, see the walkthrough artifact.
