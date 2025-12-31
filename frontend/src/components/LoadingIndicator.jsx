import React from 'react';

const LoadingIndicator = () => {
    return (
        <div className="flex items-center gap-4 px-5 py-4 mb-6 animate-slide-right">
            <div className="flex gap-2">
                <span className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-bounce"></span>
                <span className="w-2.5 h-2.5 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
            <p className="text-lg text-brand-text-secondary font-spiritual italic animate-pulse">
                Reflecting on wisdom…
            </p>
        </div>
    );
};

export default LoadingIndicator;
