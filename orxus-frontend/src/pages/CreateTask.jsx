import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectId, setProjectId] = useState('');

    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState('');
    const [assigneeIds, setAssigneeIds] = useState([]);

    const [projects, setProjects] = useState([]);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get('/projects').then(response => setProjects(response.data.data));

        apiClient.get('/users').then(response => setUsers(response.data.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            project_id: projectId,

            priority,
            due_date: dueDate,
            assignee_ids: assigneeIds.map(assignee => assignee.value),
        };
        apiClient.post('/tasks', taskData)
            .then(() => {
                navigate('/tasks');
            })
            .catch(error => {
                console.error('Error creating task', error);
            });
    };

    const userOptions = Array.isArray(users) ? users.map(user => ({ value: user.id, label: user.name })) : [];

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Project</label>
                        <select
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a project</option>
                            {Array.isArray(projects) && projects.map(project => (
                                <option key={project.id} value={project.id}>{project.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Assignees</label>
                    <Select
                        isMulti
                        options={userOptions}
                        onChange={setAssigneeIds}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={{
                            menuList: (base) => ({
                                ...base,
                                maxHeight: 200, // adjust the height as needed
                                overflowY: 'auto',
                            }),
                        }}
                    />
                </div>
                <div className="flex justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/tasks')}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
