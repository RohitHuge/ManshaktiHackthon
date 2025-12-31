import React from 'react';

const ChatBubble = ({ message, type = 'user' }) => {
    const isUser = type === 'user';

    return (
        <div className={`flex mb-6 ${isUser ? 'justify-end animate-slide-left' : 'justify-start animate-slide-right'}`}>
            <div className={`max-w-[85%] md:max-w-[75%] px-5 py-4 rounded-2xl shadow-sm transition-all duration-300 ${isUser
                    ? 'bg-brand-primary text-white rounded-br-sm shadow-soft'
                    : 'bg-white text-brand-text-main border border-gray-100 rounded-bl-sm shadow-card'
                }`}>
                {isUser ? (
                    <p className="leading-relaxed">{message.text}</p>
                ) : (
                    <div className="space-y-4">
                        {/* AI Summary */}
                        {message.answer?.summary && (
                            <div className="text-lg font-spiritual leading-relaxed text-brand-text-main">
                                <p>{message.answer.summary}</p>
                            </div>
                        )}

                        {/* AI Steps */}
                        {message.answer?.steps && message.answer.steps.length > 0 && (
                            <div className="mt-4">
                                <ol className="list-decimal list-inside space-y-3">
                                    {message.answer.steps.map((step, index) => (
                                        <li key={index} className="text-brand-text-secondary leading-relaxed pl-2">
                                            <span className="ml-2 text-brand-text-main">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBubble;
