import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;