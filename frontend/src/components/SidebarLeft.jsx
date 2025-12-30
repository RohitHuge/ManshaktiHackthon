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
        <div className="w-64 h-full glass-dark border-r border-white/10 flex flex-col z-20 hidden md:flex">
            {/* Branding */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-spiritual font-bold gradient-text flex items-center gap-2">
                    <span>🕉️</span> Manashakti
                </h1>
                <p className="text-xs text-gray-400 mt-1 pl-8">Wisdom on Demand</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</p>

                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white shadow-lg shadow-purple-500/10'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <item.icon
                            size={20}
                            className={`transition-colors ${isActive(item.path) ? 'text-purple-400' : 'text-gray-500 group-hover:text-purple-400'
                                }`}
                        />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}

                <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">My Journey</p>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                        <Heart size={20} className="text-gray-500" />
                        <span className="font-medium">Favorites</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                        <Settings size={20} className="text-gray-500" />
                        <span className="font-medium">Settings</span>
                    </button>
                </div>
            </nav>

            {/* User / Footer */}
            <div className="p-4 border-t border-white/10">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all">
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default SidebarLeft;
