import React from 'react';
import { BookOpen, Sparkles, TrendingUp } from 'lucide-react';

const SidebarRight = () => {
    const trendingTopics = [
        "Exam Stress Management",
        "Overcoming Anxiety",
        "Finding Life Purpose",
        "Building Confidence",
        "Family Harmony"
    ];

    const featuredBooks = [
        { title: "Prayatna Rahasya", author: "Swami Vijnananand", color: "border-l-brand-accent" },
        { title: "Atmavishwas", author: "Swami Vijnananand", color: "border-l-brand-secondary" },
        { title: "Karma Yoga", author: "Swami Vijnananand", color: "border-l-brand-primary" }
    ];

    return (
        <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col p-6 overflow-y-auto hidden lg:flex z-20">

            {/* Daily Insight Card */}
            <div className="mb-8 p-0.5 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary shadow-soft">
                <div className="bg-white rounded-xl p-5 h-full">
                    <div className="flex items-center gap-2 mb-3 text-brand-secondary">
                        <Sparkles size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">Daily Insight</span>
                    </div>
                    <p className="text-brand-text-main italic font-spiritual leading-relaxed mb-4">
                        "Success is not just about the result, but the purity of effort you put into the process."
                    </p>
                    <div className="text-right">
                        <span className="text-xs text-brand-text-secondary font-medium">— Swami Vijnananand</span>
                    </div>
                </div>
            </div>

            {/* Featured Books */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-brand-text-secondary">
                    <BookOpen size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Source Material</span>
                </div>
                <div className="space-y-3">
                    {featuredBooks.map((book, idx) => (
                        <div key={idx} className={`group relative overflow-hidden rounded-xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-card transition-all cursor-pointer border-l-4 ${book.color}`}>
                            <div className="p-3 pl-4">
                                <h4 className="text-sm font-semibold text-brand-text-main group-hover:text-brand-primary transition-colors">
                                    {book.title}
                                </h4>
                                <p className="text-xs text-brand-text-secondary">{book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Topics */}
            <div>
                <div className="flex items-center gap-2 mb-4 text-brand-text-secondary">
                    <TrendingUp size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Trending Topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1.5 text-xs font-medium text-brand-text-secondary bg-gray-100 border border-gray-200 rounded-lg hover:text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary/20 transition-all cursor-pointer"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SidebarRight;
