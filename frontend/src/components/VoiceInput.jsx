import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceInput = ({ onTranscript, disabled = false }) => {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        // Check if browser supports Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            setIsSupported(true);
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.lang = 'en-US';
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;

            recognitionInstance.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                onTranscript(transcript);
                setIsListening(false);
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        }
    }, [onTranscript]);

    const toggleListening = () => {
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    if (!isSupported) {
        return (
            <button
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg opacity-40 cursor-not-allowed"
                disabled
                title="Voice input not supported in this browser. Please use Chrome or Edge."
            >
                <MicOff size={20} className="text-gray-400" />
            </button>
        );
    }

    return (
        <button
            className={`relative p-3 rounded-xl transition-all duration-300 ${isListening
                    ? 'bg-brand-secondary text-white animate-pulse shadow-lg shadow-brand-secondary/30'
                    : 'bg-white border-2 border-gray-200 hover:border-brand-secondary hover:text-brand-secondary text-gray-500'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
            onClick={toggleListening}
            disabled={disabled}
            title={isListening ? "Stop listening" : "Start voice input (English)"}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
        >
            <Mic size={20} />
            {isListening && (
                <span className="absolute inset-0 rounded-xl bg-brand-secondary opacity-30 animate-ping"></span>
            )}
        </button>
    );
};

export default VoiceInput;
