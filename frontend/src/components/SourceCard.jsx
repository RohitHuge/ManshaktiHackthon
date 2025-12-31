import React from 'react';
import { BookOpen, FileText } from 'lucide-react';

const SourceCard = ({ source, onViewDocument }) => {
    if (!source) return null;

    return (
        <div className="ml-0 mb-6 animate-slide-up">
            <div className="p-5 bg-gradient-to-r from-brand-accent/10 to-transparent border-l-4 border-l-brand-accent rounded-r-xl rounded-bl-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-accent text-opacity-90">
                        📚 Source Material
                    </span>
                </div>

                <div className="space-y-2">
                    {source.book && (
                        <div className="flex items-center gap-2">
                            <BookOpen size={18} className="text-brand-primary flex-shrink-0" />
                            <span className="font-spiritual text-brand-primary font-semibold text-base">{source.book}</span>
                        </div>
                    )}

                    {source.chapter && (
                        <div className="flex items-center gap-2 ml-6">
                            <span className="text-brand-text-secondary italic text-sm">{source.chapter}</span>
                        </div>
                    )}

                    {source.page && (
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-brand-secondary flex-shrink-0" />
                            <span className="text-brand-text-secondary font-medium">Page {source.page}</span>
                        </div>
                    )}
                </div>

                {source.pdfUrl && (
                    <button
                        className="mt-4 px-5 py-2.5 bg-brand-accent hover:bg-yellow-500 text-brand-primary font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                        onClick={() => onViewDocument(source.pdfUrl, source.page || 1)}
                    >
                        <FileText size={18} />
                        View Original Document
                    </button>
                )}

                {source.confidence && (
                    <div className="mt-4 pt-4 border-t border-brand-accent/20">
                        <span className="text-sm text-brand-text-secondary italic">
                            Confidence: {source.confidence.matchedPrinciples}/{source.confidence.totalPrinciples} principles matched
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SourceCard;
