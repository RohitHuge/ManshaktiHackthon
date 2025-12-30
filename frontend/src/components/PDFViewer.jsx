import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl, initialPage = 1, onClose }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(initialPage);
    const [scale, setScale] = useState(1.0);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(initialPage);
    };

    const goToPrevPage = () => {
        setPageNumber(prev => Math.max(1, prev - 1));
    };

    const goToNextPage = () => {
        setPageNumber(prev => Math.min(numPages, prev + 1));
    };

    const zoomIn = () => {
        setScale(prev => Math.min(2.0, prev + 0.2));
    };

    const zoomOut = () => {
        setScale(prev => Math.max(0.5, prev - 0.2));
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1050] flex items-center justify-center p-6 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="glass-dark rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-2xl border-b border-white/10">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-semibold text-white">📄 Original Document</h3>
                        {numPages && (
                            <span className="text-sm text-gray-200">
                                Page {pageNumber} of {numPages}
                            </span>
                        )}
                    </div>
                    <button
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        onClick={onClose}
                        aria-label="Close PDF viewer"
                    >
                        <X size={24} className="text-white" />
                    </button>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-900/50 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <button
                            className="px-3 py-2 glass border border-white/20 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            onClick={goToPrevPage}
                            disabled={pageNumber <= 1}
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={20} className="text-white" />
                        </button>
                        <span className="text-sm font-medium text-white min-w-[60px] text-center">
                            {pageNumber} / {numPages || '—'}
                        </span>
                        <button
                            className="px-3 py-2 glass border border-white/20 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            aria-label="Next page"
                        >
                            <ChevronRight size={20} className="text-white" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            className="px-3 py-2 glass border border-white/20 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            onClick={zoomOut}
                            disabled={scale <= 0.5}
                            aria-label="Zoom out"
                        >
                            <ZoomOut size={20} className="text-white" />
                        </button>
                        <span className="text-sm font-medium text-white min-w-[50px] text-center">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            className="px-3 py-2 glass border border-white/20 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            onClick={zoomIn}
                            disabled={scale >= 2.0}
                            aria-label="Zoom in"
                        >
                            <ZoomIn size={20} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* PDF Document */}
                <div className="flex-1 overflow-auto p-6 flex justify-center bg-gray-900/30">
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={console.error}
                        loading={
                            <div className="flex items-center justify-center min-h-[400px] text-gray-400 italic">
                                <p>Loading document...</p>
                            </div>
                        }
                        error={
                            <div className="flex items-center justify-center min-h-[400px] text-red-400">
                                <p>Failed to load PDF. Please try again.</p>
                            </div>
                        }
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-2xl"
                        />
                    </Document>
                </div>
            </div>
        </div>
    );
};

export default PDFViewer;
