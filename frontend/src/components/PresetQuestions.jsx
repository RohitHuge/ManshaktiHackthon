import React from 'react';

const PRESET_QUESTIONS = [
    "I have exam stress and only 10 days left",
    "I feel anxious about a career decision",
    "I feel inferiority complex in college"
];

const PresetQuestions = ({ onSelectQuestion }) => {
    return (
        <div className="mb-6">
            <p className="text-sm text-brand-text-secondary mb-3 font-medium">
                ✨ Quick questions to get started:
            </p>
            <div className="flex flex-wrap gap-3">
                {PRESET_QUESTIONS.map((question, index) => (
                    <button
                        key={index}
                        className="px-4 py-2.5 text-sm font-medium text-brand-text-main bg-white border border-gray-200 rounded-full hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-lg transition-all duration-300 active:scale-95"
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
