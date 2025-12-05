import React, { useEffect, useState, useMemo } from 'react';
import apiClient from '../api';
import KanbanBoard from '../components/KanbanBoard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search } from 'lucide-react';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const [filters, setFilters] = useState({
        project: '',
        assignee: '',
        status: '',
        priority: '',
        search: '',
    });

    const fetchTasks = () => {
        if (user) {
            const url = user.role === 'admin' ? '/tasks' : `/users/${user.id}/tasks`;
            apiClient.get(url)
                .then(response => {
                    setTasks(response.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching tasks');
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        fetchTasks();
        if (user && user.role === 'admin') {
            apiClient.get('/projects').then(res => setProjects(res.data.data));
            apiClient.get('/users').then(res => setUsers(res.data.data));
        }
    }, [user]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredTasks = useMemo(() => {
        if (!Array.isArray(tasks)) {
            return [];
        }
        return tasks.filter(task => {
            const projectMatch = filters.project ? task.project.id === parseInt(filters.project) : true;
            const assigneeMatch = filters.assignee ? task.assignees.some(a => a.id === parseInt(filters.assignee)) : true;
            const statusMatch = filters.status ? task.status === filters.status : true;
            const priorityMatch = filters.priority ? task.priority === filters.priority : true;
            const searchMatch = filters.search ? task.title.toLowerCase().includes(filters.search.toLowerCase()) : true;
            return projectMatch && assigneeMatch && statusMatch && priorityMatch && searchMatch;
        });
    }, [tasks, filters]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                {error}
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Tasks Board</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and track your project tasks</p>
                </div>
                {user.role === 'admin' && (
                    <Link
                        to="/tasks/create"
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        <Plus size={20} />
                        <span className="font-medium">New Task</span>
                    </Link>
                )}
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            name="search"
                            placeholder="Search tasks..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>

                    {user.role === 'admin' && (
                        <div className="flex flex-wrap gap-3">
                            <div className="relative min-w-[140px]">
                                <select
                                    name="project"
                                    onChange={handleFilterChange}
                                    className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600 text-sm cursor-pointer"
                                >
                                    <option value="">All Projects</option>
                                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>

                            <div className="relative min-w-[140px]">
                                <select
                                    name="assignee"
                                    onChange={handleFilterChange}
                                    className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600 text-sm cursor-pointer"
                                >
                                    <option value="">All Assignees</option>
                                    {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                </select>
                                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>

                            <div className="relative min-w-[140px]">
                                <select
                                    name="priority"
                                    onChange={handleFilterChange}
                                    className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600 text-sm cursor-pointer"
                                >
                                    <option value="">All Priorities</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <KanbanBoard tasks={filteredTasks} setTasks={setTasks} />
            </div>
        </div>
    );
};

export default Tasks;
