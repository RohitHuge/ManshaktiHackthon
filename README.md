**🧠 Manashakti Wisdom-On-Demand**
Manashakti Search is an advanced AI-powered knowledge retrieval system designed to make a vast library of philosophical and psychological wisdom easily discoverable. Built for the "AI for Good" Hackathon, it transforms static documents into a conversational "Knowledge Tank."

**🌊 Key Features**
Ocean to Glass Precision: Unlike standard AI, this system uses a custom RAG (Retrieval-Augmented Generation) pipeline to filter an "ocean" of raw data into a precise "glass" of fact-based answers, eliminating hallucinations.

Multilingual Semantic Intelligence: Native support for Marathi, Hindi, and English.

Contextual & Emotional Search: Understands user "moods" and life situations beyond basic keywords.

Strictly Grounded Guardrails: If information is missing, the system safely responds with "Content not found" rather than guessing.

**🏗️ The Architecture**
The system follows a structured flow from raw data to referenced output.

Knowledge Ingestion: Raw books and scanned images are processed via Google Document AI.

Semantic Indexing: Text is chunked by logic and converted into numerical vectors using SBERT.

The Knowledge Tank: Vectors are stored in ChromaDB with metadata for precise retrieval.

Semantic Retrieval: A filter detects the language and performs a high-speed similarity search.

Grounded Generation: The LLM (GPT-4) formats the answer only from the provided data.

**🛠️ Technical Tech Stack**
Frontend & Backend
React & Tailwind CSS: Modern, responsive user interface.

Node.js: Core runtime for application logic.

AI/ML Pipeline
Google Document AI: High-accuracy OCR for complex PDFs.

SBERT (Sentence-BERT): Multilingual vector representations.

ChromaDB: Open-source vector database for embeddings and metadata.

GPT-4: High-reasoning model with strict prompt engineering.

**🧩 Problem Solved**
Traditional search methods failed to navigate the rich but scattered content of Manashakti literature. By implementing this RAG pipeline, we:

Solved the "upload limit" error of standard LLMs.

Preserved philosophical nuances through Logic-based Chunking.

Ensured that impact-heavy knowledge reaches the right audience at the right time.

**👥 Developed by Team Transformix**
Sharvari Anil Kinge

Rohit Ravishankar Huge

Mayur Rayphale
