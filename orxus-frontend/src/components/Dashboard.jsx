import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsCard } from './StatsCard';
import { ListTodo, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StaffDashboard from './StaffDashboard';
import apiClient from '../api';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total_tasks: 0,
        in_progress_tasks: 0,
        overdue_tasks: 0,
        completed_tasks_this_month: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.role === 'admin') {
            apiClient.get('/dashboard/stats')
                .then(response => {
                    setStats(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching dashboard stats', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user?.role === 'staff') {
        return <StaffDashboard />;
    }

    const statsData = [
        {
            title: "Total Tugas",
            value: stats.total_tasks,
            icon: ListTodo,
        },
        {
            title: "Tugas Berjalan",
            value: stats.in_progress_tasks,
            icon: Clock,
        },
        {
            title: "Tugas Terlambat",
            value: stats.overdue_tasks,
            icon: AlertTriangle,
        },
        {
            title: "Selesai Bulan Ini",
            value: stats.completed_tasks_this_month,
            icon: CheckCircle2,
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Admin</h1>
                <p className="text-slate-600">Selamat datang kembali! Berikut ringkasan hari ini.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatsCard 
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;