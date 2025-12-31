import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Loader, ArrowLeft } from 'lucide-react';

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null
    const [uploadMessage, setUploadMessage] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        validateAndSetFile(file);
    };

    const validateAndSetFile = (file) => {
        if (!file) return;

        // Validate file type
        if (file.type !== 'application/pdf') {
            setUploadStatus('error');
            setUploadMessage('Only PDF files are allowed');
            setSelectedFile(null);
            return;
        }

        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            setUploadStatus('error');
            setUploadMessage('File size must be under 10MB');
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        setUploadStatus(null);
        setUploadMessage('');
    };

    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDragActive(true);
        } else if (event.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            validateAndSetFile(event.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('error');
            setUploadMessage('Please select a file first');
            return;
        }

        setUploading(true);
        setUploadStatus(null);
        setUploadMessage('');

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch(`${BACKEND_URL}/api/documents/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setUploadStatus('success');
                setUploadMessage(`Successfully uploaded: ${data.fileName}`);
                // Clear file after successful upload
                setTimeout(() => {
                    setSelectedFile(null);
                    setUploadStatus(null);
                    setUploadMessage('');
                }, 3000);
            } else {
                setUploadStatus('error');
                setUploadMessage(data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('error');
            setUploadMessage('Network error. Please check if backend is running.');
        } finally {
            setUploading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-brand-bg p-6 font-sans">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-brand-secondary hover:text-brand-primary mb-4 transition-colors font-medium"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Chat</span>
                    </a>
                    <h1 className="text-4xl font-bold text-brand-primary mb-2 font-spiritual">Admin: Upload PDF</h1>
                    <p className="text-brand-text-secondary">Add new wisdom documents to the vector store</p>
                </div>

                {/* Upload Card */}
                <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
                    {/* Drag & Drop Area */}
                    <div
                        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${dragActive
                            ? 'border-brand-secondary bg-brand-secondary/5'
                            : 'border-gray-300 hover:border-brand-secondary'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            accept="application/pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload
                                className={`mx-auto mb-4 ${dragActive ? 'text-brand-secondary' : 'text-gray-400'
                                    }`}
                                size={48}
                            />
                            <p className="text-lg font-medium text-brand-text-main mb-2">
                                {dragActive ? 'Drop your PDF here' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-sm text-gray-500">PDF files only (max 10MB)</p>
                        </label>
                    </div>

                    {/* Selected File Info */}
                    {selectedFile && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between border border-gray-200">
                            <div className="flex items-center gap-3">
                                <FileText className="text-brand-primary" size={24} />
                                <div>
                                    <p className="font-medium text-brand-text-main">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedFile(null);
                                    setUploadStatus(null);
                                    setUploadMessage('');
                                }}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>
                    )}

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        className={`w-full mt-6 py-3 px-6 rounded-lg font-medium text-white transition-all shadow-md hover:shadow-lg ${!selectedFile || uploading
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-brand-secondary hover:bg-brand-secondary/90 active:scale-95'
                            }`}
                    >
                        {uploading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader className="animate-spin" size={20} />
                                Uploading...
                            </span>
                        ) : (
                            'Upload to Vector Store'
                        )}
                    </button>

                    {/* Status Messages */}
                    {uploadStatus && (
                        <div
                            className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${uploadStatus === 'success'
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                                }`}
                        >
                            {uploadStatus === 'success' ? (
                                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                            ) : (
                                <XCircle className="text-red-600 flex-shrink-0" size={24} />
                            )}
                            <div>
                                <p
                                    className={`font-medium ${uploadStatus === 'success' ? 'text-green-800' : 'text-red-800'
                                        }`}
                                >
                                    {uploadStatus === 'success' ? 'Upload Successful!' : 'Upload Failed'}
                                </p>
                                <p
                                    className={`text-sm ${uploadStatus === 'success' ? 'text-green-700' : 'text-red-700'
                                        }`}
                                >
                                    {uploadMessage}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Info Section */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="font-semibold text-brand-text-main mb-3">Important Notes:</h3>
                        <ul className="space-y-2 text-sm text-brand-text-secondary">
                            <li className="flex items-start gap-2">
                                <span className="text-brand-accent mt-1">•</span>
                                <span>Only PDF files are accepted</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-brand-accent mt-1">•</span>
                                <span>Maximum file size is 10MB</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-brand-accent mt-1">•</span>
                                <span>Files are added to the existing vector store</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-brand-accent mt-1">•</span>
                                <span>Processing may take a few moments after upload</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
