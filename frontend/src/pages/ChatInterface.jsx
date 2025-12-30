import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import SourceCard from '../components/SourceCard';
import LoadingIndicator from '../components/LoadingIndicator';
import Toast from '../components/Toast';
import PresetQuestions from '../components/PresetQuestions';
import VoiceInput from '../components/VoiceInput';
import PDFViewer from '../components/PDFViewer';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
    const [currentPdf, setCurrentPdf] = useState({ url: '', pageNumber: 1 });
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

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
        <div className="w-full h-screen flex bg-app-bg overflow-hidden">
            {/* Left Sidebar (Desktop) */}
            <SidebarLeft />

            {/* Main Chat Container */}
            <div className="flex-1 flex flex-col h-full relative min-w-0">
                {/* Header */}
                <header className="px-6 py-4 glass backdrop-blur-md border-b border-white/10 shadow-sm z-10 flex items-center justify-between lg:justify-center">
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                    >
                        <Menu size={24} />
                    </button>

                    <div className="text-center">
                        <h1 className="text-xl md:text-2xl font-spiritual font-semibold">
                            <span className="gradient-text">🕉️ Manashakti Wisdom</span>
                        </h1>
                    </div>

                    <div className="w-8 md:hidden"></div> {/* Spacer for centering */}
                </header>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto w-full">
                    <div className="max-w-4xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col min-h-full">
                        {messages.length === 0 && !isLoading && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in my-auto pb-20">
                                <div className="text-6xl md:text-7xl mb-6 animate-float">🪷</div>
                                <h2 className="text-3xl md:text-4xl font-spiritual font-semibold mb-4 gradient-text">
                                    Welcome to Manashakti Wisdom
                                </h2>
                                <p className="max-w-lg text-gray-300 leading-relaxed text-lg mb-8">
                                    Ask your life questions and receive authentic guidance derived from Manashakti philosophy books.
                                </p>
                                <PresetQuestions onSelectQuestion={handlePresetQuestion} />
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div key={index} className="w-full">
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
                </div>

                {/* Input Area */}
                <div className="w-full glass-dark backdrop-blur-2xl border-t border-white/10 shadow-2xl p-4 md:p-6 z-10">
                    <div className="max-w-4xl mx-auto w-full">
                        <div className="flex gap-3 items-end mb-2">
                            <textarea
                                ref={inputRef}
                                className="flex-1 min-h-[56px] max-h-[150px] px-5 py-4 bg-gray-900/50 border-2 border-purple-500/30 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 rounded-2xl text-white placeholder-gray-400 resize-none transition-all outline-none text-base shadow-inner"
                                placeholder="Ask your question here... (Shift+Enter for new line)"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                rows={1}
                                disabled={isLoading}
                            />
                            <div className="flex gap-2 items-center pb-1">
                                <VoiceInput
                                    onTranscript={handleVoiceTranscript}
                                    disabled={isLoading}
                                />
                                <button
                                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl shadow-lg hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 group"
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isLoading}
                                    aria-label="Send message"
                                >
                                    <Send size={22} className="text-white group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-gray-500 text-center italic mt-2 opacity-70 hover:opacity-100 transition-opacity">
                            AI guidance based on Manashakti literature. For introspection purposes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Desktop) */}
            <SidebarRight />

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
