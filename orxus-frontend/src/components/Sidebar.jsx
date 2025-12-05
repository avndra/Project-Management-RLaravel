import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, List, Folder, Calendar, Users, Tag, Settings, LogOut, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api';

const adminNavLinks = [
    { to: '/', icon: Home, text: 'Dashboard' },
    { to: '/tasks', icon: List, text: 'Tugas' },
    { to: '/projects', icon: Folder, text: 'Proyek' },
    { to: '/calendar', icon: Calendar, text: 'Kalender' },
    { to: '/team', icon: Users, text: 'Anggota Tim' },

    { to: '/settings', icon: Settings, text: 'Pengaturan' },
];

const staffNavLinks = [
    { to: '/', icon: Home, text: 'Dashboard' },
    { to: '/tasks', icon: List, text: 'Tugas Saya' },
    { to: '/calendar', icon: Calendar, text: 'Kalender' },
    { to: '/settings', icon: Settings, text: 'Pengaturan' },
];

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const navLinks = user?.role === 'admin' ? adminNavLinks : staffNavLinks;

    const handleLogout = async () => {
        try {
            await apiClient.post('/logout');
            logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
            logout(); // Force logout on client side even if API fails
            navigate('/login');
        }
    };

    return (
        <div className="w-72 bg-slate-900 text-slate-300 flex flex-col h-screen shadow-xl z-20 transition-all duration-300">
            {/* Brand Header */}
            <div className="h-16 flex items-center px-8 border-b border-slate-800 bg-slate-950">
                <Layers className="w-8 h-8 text-blue-500 mr-3" />
                <h1 className="text-xl font-bold text-white tracking-wide">Orxus<span className="text-blue-500">PM</span></h1>
            </div>

            {/* User Profile Snippet */}
            <div className="px-6 py-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2">
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-lg transition-all duration-200 group font-medium ${isActive
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                                : 'hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <link.icon className={`w-5 h-5 mr-3 transition-colors ${({ isActive }) => isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                            }`} />
                        {link.text}
                    </NavLink>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-800 bg-slate-950">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Keluar
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
