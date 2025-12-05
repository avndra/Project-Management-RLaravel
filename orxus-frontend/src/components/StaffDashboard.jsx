import React, { useEffect, useState } from 'react';
import { StatsCard } from './StatsCard';
import { TaskCard } from './TaskCard';
import { CalendarWidget } from './CalendarWidget';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import apiClient from '../api';
import { useAuth } from '../context/AuthContext';

const StaffDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total_tasks: 0,
        in_progress_tasks: 0,
        overdue_tasks: 0,
        completed_tasks_this_month: 0
    });
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await apiClient.get('/dashboard/stats');
                setStats(statsRes.data);

                if (user) {
                    const tasksRes = await apiClient.get(`/users/${user.id}/tasks`);
                    setTasks(tasksRes.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const statsData = [
        {
            title: "Tugas Saya",
            value: stats.total_tasks,
            icon: CheckCircle2,
        },
        {
            title: "Selesai Bulan Ini",
            value: stats.completed_tasks_this_month,
            icon: CheckCircle2,
        },
        {
            title: "Sedang Berjalan",
            value: stats.in_progress_tasks,
            icon: Clock,
        },
        {
            title: "Terlambat",
            value: stats.overdue_tasks,
            icon: AlertCircle,
        }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Saya</h1>
                <p className="text-slate-600">Selamat datang kembali! Berikut ruang kerja pribadi Anda.</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Tabs defaultValue="tasks" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="tasks">Tugas Saya</TabsTrigger>
                            <TabsTrigger value="schedule">Jadwal</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tasks" className="mt-4">
                            <div className="space-y-4">
                                {Array.isArray(tasks) && tasks.map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                                {Array.isArray(tasks) && tasks.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">Belum ada tugas yang diberikan.</div>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="schedule" className="mt-4">
                            <CalendarWidget />
                        </TabsContent>
                    </Tabs>
                </div>
                <div>
                    <CalendarWidget />
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;