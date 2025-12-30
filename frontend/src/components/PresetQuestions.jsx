import React from 'react';

const PRESET_QUESTIONS = [
    "I have exam stress and only 10 days left",
    "I feel anxious about a career decision",
    "I feel inferiority complex in college"
];

const PresetQuestions = ({ onSelectQuestion }) => {
    return (
        <div className="mb-6">
            <p className="text-sm text-gray-400 mb-3 font-medium">
                ✨ Quick questions to get started:
            </p>
            <div className="flex flex-wrap gap-3">
                {PRESET_QUESTIONS.map((question, index) => (
                    <button
                        key={index}
                        className="px-4 py-2.5 text-sm font-medium text-white glass border-2 border-purple-500/50 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-transparent hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 active:scale-95"
                        onClick={() => onSelectQuestion(question)}
                    >
                        {question}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PresetQuestions;
