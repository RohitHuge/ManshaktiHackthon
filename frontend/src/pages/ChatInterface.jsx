import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import SourceCard from '../components/SourceCard';
import LoadingIndicator from '../components/LoadingIndicator';
import Toast from '../components/Toast';
import PresetQuestions from '../components/PresetQuestions';
import VoiceInput from '../components/VoiceInput';
import PDFViewer from '../components/PDFViewer';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
    const [currentPdf, setCurrentPdf] = useState({ url: '', pageNumber: 1 });
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            type: 'user',
            text: inputValue,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputValue,
                    language: 'en',
                    mode: 'wisdom'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message || 'An error occurred');
            }

            const aiMessage = {
                type: 'ai',
                id: data.id,
                answer: data.answer,
                source: data.source,
                confidence: data.confidence,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error('Chat error:', err);
            setError(err.message || 'We couldn\'t reflect on this right now. Please try again.');
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handlePresetQuestion = (question) => {
        setInputValue(question);
        inputRef.current?.focus();
    };

    const handleVoiceTranscript = (transcript) => {
        setInputValue(prev => prev ? `${prev} ${transcript}` : transcript);
        inputRef.current?.focus();
    };

    const handleViewDocument = (pdfUrl, pageNumber) => {
        setCurrentPdf({ url: pdfUrl, pageNumber });
        setPdfViewerOpen(true);
    };

    const handleClosePdf = () => {
        setPdfViewerOpen(false);
    };

    const handleCloseToast = () => {
        setError(null);
    };

    return (
        <div className="w-full min-h-screen flex bg-app-bg">
            {/* Main Chat Container */}
            <div className="flex-1 max-w-4xl mx-auto flex flex-col h-screen">
                {/* Header */}
                <header className="px-6 py-5 glass backdrop-blur-2xl border-b border-white/10 shadow-xl">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-spiritual font-semibold mb-2">
                            <span className="gradient-text">🕉️ Manashakti Wisdom</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-300">
                            Source-grounded guidance for life's questions
                        </p>
                    </div>
                </header>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
                    {messages.length === 0 && !isLoading && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 animate-fade-in">
                            <div className="text-6xl md:text-7xl mb-6 animate-float">🪷</div>
                            <h2 className="text-2xl md:text-3xl font-spiritual font-semibold mb-4 gradient-text">
                                Welcome to Manashakti Wisdom
                            </h2>
                            <p className="max-w-lg text-gray-300 leading-relaxed text-base md:text-lg">
                                Ask your life questions and receive authentic guidance derived from Manashakti philosophy books.
                            </p>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div key={index}>
                            <ChatBubble message={message} type={message.type} />
                            {message.type === 'ai' && message.source && (
                                <SourceCard
                                    source={message.source}
                                    onViewDocument={handleViewDocument}
                                />
                            )}
                        </div>
                    ))}

                    {isLoading && <LoadingIndicator />}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="px-4 md:px-6 py-5 glass-dark backdrop-blur-2xl border-t border-white/10 shadow-2xl">
                    {messages.length === 0 && (
                        <PresetQuestions onSelectQuestion={handlePresetQuestion} />
                    )}

                    <div className="flex gap-3 items-end mb-3">
                        <textarea
                            ref={inputRef}
                            className="flex-1 min-h-[52px] max-h-[150px] px-4 py-3 bg-gray-900/50 border-2 border-purple-500/50 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 resize-none transition-all outline-none"
                            placeholder="Ask your question... (Shift+Enter for new line)"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            disabled={isLoading}
                        />
                        <div className="flex gap-2 items-center">
                            <VoiceInput
                                onTranscript={handleVoiceTranscript}
                                disabled={isLoading}
                            />
                            <button
                                className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                aria-label="Send message"
                            >
                                <Send size={20} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-gray-500 text-center italic pt-3 border-t border-white/5">
                        This guidance is based on Manashakti literature for self-reflection and personal growth.
                    </p>
                </div>
            </div>

            {/* PDF Viewer Modal */}
            {pdfViewerOpen && (
                <PDFViewer
                    pdfUrl={currentPdf.url}
                    initialPage={currentPdf.pageNumber}
                    onClose={handleClosePdf}
                />
            )}

            {/* Toast Notification */}
            {error && (
                <Toast message={error} onClose={handleCloseToast} />
            )}
        </div>
    );
};

export default ChatInterface;
