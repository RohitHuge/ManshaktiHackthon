import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const Toast = ({ message, onClose, duration = 5000 }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!message) return null;

    return (
        <div className="fixed top-6 right-6 z-[1070] max-w-md w-full md:w-auto animate-slide-down">
            <div className="flex items-center justify-between gap-4 px-5 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-l-4 border-red-700 rounded-lg shadow-2xl shadow-red-500/50">
                <div className="flex items-start gap-3 flex-1">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm leading-normal">{message}</p>
                </div>
                <button
                    className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
                    onClick={onClose}
                    aria-label="Close notification"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default Toast;
