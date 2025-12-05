import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Plus, Search, Menu } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuClick, onProfileClick }) => {
    const { isAuthenticated, user, logout, openCreateTaskModal } = useAuth();

    return (
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
            <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-slate-100 mr-4"
            >
                <Menu className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex-1">
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {user?.role === 'admin' && (
                    <Button variant="outline" size="sm" onClick={openCreateTaskModal}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Task
                    </Button>
                )}

                <button className="relative p-2 rounded-lg hover:bg-slate-100">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        3
                    </Badge>
                </button>

                {isAuthenticated() && user ? (
                    <>
                        <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
                        <button onClick={onProfileClick} className="flex items-center space-x-2">
                            <img 
                                src={user.profile_photo_url}
                                alt={user.name} 
                                className="w-8 h-8 rounded-full object-cover" 
                            />
                        </button>
                    </>
                ) : isAuthenticated() ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                ) : (
                    <>
                        <Link to="/login">
                            <Button variant="outline" size="sm">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="default" size="sm">Sign Up</Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;