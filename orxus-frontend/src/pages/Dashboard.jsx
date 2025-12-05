import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = await dataService.getProjects();
                setProjects(projectsResponse.data.data);

                const tasksResponse = await dataService.getTasks();
                setTasks(tasksResponse.data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Dashboard</h1>
                {error && <p className="text-error-500 text-center mb-4">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-primary-200">
                        <h2 className="text-2xl font-bold text-primary-700 mb-4 flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            Projects
                        </h2>
                        {projects.length > 0 ? (
                            <ul className="space-y-3">
                                {projects.map(project => (
                                    <li key={project.id} className="p-3 bg-primary-50 rounded-lg border border-primary-100 hover:bg-primary-100 transition-colors">
                                        <div className="font-medium text-primary-800">{project.name}</div>
                                        <div className="text-sm text-primary-600 mt-1">{project.description || 'No description'}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <p>No projects found</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-200">
                        <h2 className="text-2xl font-bold text-secondary-700 mb-4 flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 13h.01M9 17h.01M12 9h.01M15 9h.01"></path>
                            </svg>
                            Tasks
                        </h2>
                        {tasks.length > 0 ? (
                            <ul className="space-y-3">
                                {tasks.map(task => (
                                    <li key={task.id} className={`p-3 rounded-lg border ${task.completed ? 'bg-success-50 border-success-200' : 'bg-warning-50 border-warning-200'} hover:opacity-90 transition-opacity`}>
                                        <div className={`font-medium ${task.completed ? 'text-success-800' : 'text-warning-800'}`}>
                                            {task.title} {task.completed && (
                                                <span className="ml-2 bg-success-500 text-white text-xs px-2 py-0.5 rounded-full">Completed</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-slate-600 mt-1">{task.description || 'No description'}</div>
                                        {!task.completed && task.due_date && (
                                            <div className="text-xs text-slate-500 mt-1">Due: {task.due_date}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <p>No tasks found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
