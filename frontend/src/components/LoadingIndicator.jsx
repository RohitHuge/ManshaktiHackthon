import React from 'react';

const LoadingIndicator = () => {
    return (
        <div className="flex items-center gap-4 px-5 py-4 mb-6 animate-slide-right">
            <div className="flex gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
            <p className="text-lg text-gray-300 font-spiritual italic animate-pulse">
                Reflecting on wisdom…
            </p>
        </div>
    );
};

export default LoadingIndicator;
