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
        { title: "Prayatna Rahasya", author: "Swami Vijnananand", color: "from-amber-500 to-orange-600" },
        { title: "Atmavishwas", author: "Swami Vijnananand", color: "from-blue-500 to-cyan-600" },
        { title: "Karma Yoga", author: "Swami Vijnananand", color: "from-purple-500 to-pink-600" }
    ];

    return (
        <div className="w-80 h-full glass-dark border-l border-white/10 flex flex-col p-6 overflow-y-auto hidden lg:flex z-20">

            {/* Daily Insight Card */}
            <div className="mb-8 p-1 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
                <div className="bg-gray-900/90 rounded-xl p-5 backdrop-blur-sm h-full">
                    <div className="flex items-center gap-2 mb-3 text-purple-400">
                        <Sparkles size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">Daily Insight</span>
                    </div>
                    <p className="text-gray-200 italic font-spiritual leading-relaxed mb-4">
                        "Success is not just about the result, but the purity of effort you put into the process."
                    </p>
                    <div className="text-right">
                        <span className="text-xs text-gray-500 font-medium">— Swami Vijnananand</span>
                    </div>
                </div>
            </div>

            {/* Featured Books */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <BookOpen size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Source Material</span>
                </div>
                <div className="space-y-3">
                    {featuredBooks.map((book, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${book.color}`}></div>
                            <div className="p-3 pl-5">
                                <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                                    {book.title}
                                </h4>
                                <p className="text-xs text-gray-500">{book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Topics */}
            <div>
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <TrendingUp size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Trending Topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1.5 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-lg hover:text-white hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
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
