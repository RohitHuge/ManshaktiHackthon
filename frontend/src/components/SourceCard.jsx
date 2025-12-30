import React from 'react';
import { BookOpen, FileText } from 'lucide-react';

const SourceCard = ({ source, onViewDocument }) => {
    if (!source) return null;

    return (
        <div className="ml-0 mb-6 animate-slide-up">
            <div className="p-5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-lg border-2 border-amber-500/50 border-l-4 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                        📚 Source
                    </span>
                </div>

                <div className="space-y-2">
                    {source.book && (
                        <div className="flex items-center gap-2">
                            <BookOpen size={18} className="text-amber-400 flex-shrink-0" />
                            <span className="font-spiritual text-white text-base">{source.book}</span>
                        </div>
                    )}

                    {source.chapter && (
                        <div className="flex items-center gap-2 ml-6">
                            <span className="text-gray-300 italic text-sm">{source.chapter}</span>
                        </div>
                    )}

                    {source.page && (
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-amber-400 flex-shrink-0" />
                            <span className="text-gray-200">Page {source.page}</span>
                        </div>
                    )}
                </div>

                {source.pdfUrl && (
                    <button
                        className="mt-4 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                        onClick={() => onViewDocument(source.pdfUrl, source.page || 1)}
                    >
                        <FileText size={18} />
                        View Original Document
                    </button>
                )}

                {source.confidence && (
                    <div className="mt-4 pt-4 border-t border-amber-500/30">
                        <span className="text-sm text-gray-400 italic">
                            Confidence: {source.confidence.matchedPrinciples}/{source.confidence.totalPrinciples} principles matched
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SourceCard;
