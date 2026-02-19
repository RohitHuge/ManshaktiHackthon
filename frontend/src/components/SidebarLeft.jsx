import React from 'react';
import { MessageSquare, Upload, Info, Heart, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarLeft = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: MessageSquare, label: 'Wisdom Chat', path: '/' },
        { icon: Upload, label: 'Upload Content', path: '/upload' },
        { icon: Info, label: 'About Project', path: '/about' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-64 h-full bg-brand-primary text-white flex flex-col z-20 hidden md:flex shadow-xl">
            {/* Branding */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-spiritual font-bold text-white flex items-center gap-2">
                    <img src="/WhatsApp Image 2025-12-31 at 5.03.47 PM.jpeg" alt="Manashakti Logo" className="h-10 w-auto rounded-full" />
                    Manashakti
                </h1>
                <p className="text-xs text-brand-secondary mt-1 pl-8 font-medium">Wisdom on Demand</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>

                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                            ? 'bg-brand-secondary text-white shadow-lg'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <item.icon
                            size={20}
                            className={`transition-colors ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                }`}
                        />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}

                <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">My Journey</p>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all">
                        <Heart size={20} className="text-gray-400" />
                        <span className="font-medium">Favorites</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all">
                        <Settings size={20} className="text-gray-400" />
                        <span className="font-medium">Settings</span>
                    </button>
                </div>
            </nav>

            {/* User / Footer */}
            <div className="p-4 border-t border-white/10 bg-black/10">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all">
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default SidebarLeft;
