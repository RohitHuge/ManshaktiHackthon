import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatInterface from './pages/ChatInterface';
import UploadPage from './pages/UploadPage';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChatInterface />} />
                <Route path="/upload" element={<UploadPage />} />
            </Routes>
        </Router>
    );
}

export default App;
