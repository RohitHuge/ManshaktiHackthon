import React from 'react';

const ChatBubble = ({ message, type = 'user' }) => {
    const isUser = type === 'user';
    const isAI = type === 'ai';

    return (
        <div className={`flex mb-6 ${isUser ? 'justify-end animate-slide-left' : 'justify-start animate-slide-right'}`}>
            <div className={`max-w-[75%] md:max-w-[70%] px-5 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl ${isUser
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white rounded-br-sm shadow-glow-purple'
                    : 'glass text-white border-l-4 border-cyan-400 rounded-bl-sm'
                }`}>
                {isUser ? (
                    <p className="leading-relaxed">{message.text}</p>
                ) : (
                    <div className="space-y-4">
                        {/* AI Summary */}
                        {message.answer?.summary && (
                            <div className="text-lg font-spiritual leading-relaxed text-gray-100">
                                <p>{message.answer.summary}</p>
                            </div>
                        )}

                        {/* AI Steps */}
                        {message.answer?.steps && message.answer.steps.length > 0 && (
                            <div className="mt-4">
                                <ol className="list-decimal list-inside space-y-3">
                                    {message.answer.steps.map((step, index) => (
                                        <li key={index} className="text-gray-200 leading-relaxed pl-2">
                                            <span className="ml-2">{step}</span>
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
