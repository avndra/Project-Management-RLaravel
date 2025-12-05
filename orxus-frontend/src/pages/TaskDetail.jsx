import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { useAuth } from '../context/AuthContext';
import Select from 'react-select';

const TaskDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    const [newComment, setNewComment] = useState('');

    const [projects, setProjects] = useState([]);

    const [users, setUsers] = useState([]);

    const fetchTask = useCallback(() => {
        setLoading(true);
        apiClient.get(`/tasks/${id}`)
            .then(response => {
                setTask(response.data.data);
                setEditData({
                    title: response.data.data.title,
                    description: response.data.data.description,
                    project_id: response.data.data.project.id,

                    priority: response.data.data.priority,
                    due_date: response.data.data.due_date,
                    assignee_ids: response.data.data.assignees.map(u => ({ value: u.id, label: u.name })),
                });
            })
            .catch(err => {
                setError('Error fetching task details.');
                if (err.response && err.response.status === 403) {
                    setError('You do not have permission to view this task.');
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchTask();
        if (user?.role === 'admin') {
            apiClient.get('/projects').then(res => setProjects(res.data.data));

            apiClient.get('/users').then(res => setUsers(res.data.data));
        }
    }, [id, user, fetchTask]);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        apiClient.put(`/tasks/${id}`, { status: newStatus })
            .then(response => setTask(response.data.data))
            .catch(console.error);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name, selectedOptions) => {
        setEditData({ ...editData, [name]: selectedOptions });
    };

    const handleSaveChanges = () => {
        const payload = {
            ...editData,
            assignee_ids: editData.assignee_ids.map(o => o.value)
        };
        apiClient.put(`/tasks/${id}`, payload)
            .then(response => {
                setTask(response.data.data);
                setIsEditing(false);
            })
            .catch(console.error);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        apiClient.post(`/tasks/${id}/comments`, { body: newComment })
            .then(() => {
                setNewComment('');
                fetchTask();
            })
            .catch(console.error);
    };

    if (loading) return <div className="text-center mt-8">Memuat...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!task) return <div className="text-center mt-8">Tugas tidak ditemukan</div>;

    const userOptions = users.map(u => ({ value: u.id, label: u.name }));
    const isAdmin = user?.role === 'admin';

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
                {isEditing && isAdmin ? (
                    <input type="text" name="title" value={editData.title} onChange={handleEditChange} className="text-3xl font-bold text-gray-800 border-b-2" />
                ) : (
                    <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
                )}
                <div className="flex items-center space-x-4">
                    <select value={task.status} onChange={handleStatusChange} className="p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="todo">Akan Dikerjakan</option>
                        <option value="inprogress">Sedang Dikerjakan</option>
                        <option value="done">Selesai</option>
                    </select>
                    {isAdmin && !isEditing && <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>}
                    {isAdmin && isEditing && (
                        <>
                            <button onClick={handleSaveChanges} className="bg-green-500 text-white px-4 py-2 rounded-lg">Simpan</button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Batal</button>
                        </>
                    )}
                </div>
            </div>

            {isEditing && isAdmin ? (
                <textarea name="description" value={editData.description} onChange={handleEditChange} className="w-full p-2 border rounded-lg mb-8" rows="4" />
            ) : (
                <p className="text-gray-800 whitespace-pre-wrap mb-8">{task.description}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Penerima Tugas</h3>
                    {isEditing && isAdmin ? (
                        <Select isMulti options={userOptions} value={editData.assignee_ids} onChange={(val) => handleSelectChange('assignee_ids', val)} />
                    ) : (
                        (task.assignees || []).map(assignee => <div key={assignee.id} className="text-gray-600 text-sm">{assignee.name}</div>)
                    )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Prioritas</h3>
                    {isEditing && isAdmin ? (
                        <select name="priority" value={editData.priority} onChange={handleEditChange} className="w-full p-2 border rounded-lg">
                            <option value="low">Rendah</option>
                            <option value="medium">Sedang</option>
                            <option value="high">Tinggi</option>
                        </select>
                    ) : (
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${task.priority === 'high' ? 'bg-red-200 text-red-800' : task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{task.priority}</span>
                    )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Tenggat Waktu</h3>
                    {isEditing && isAdmin ? (
                        <input type="date" name="due_date" value={editData.due_date} onChange={handleEditChange} className="w-full p-2 border rounded-lg" />
                    ) : (
                        <p className="text-gray-600 text-sm">{new Date(task.due_date).toLocaleDateString('id-ID')}</p>
                    )}
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-gray-700 mb-4">Komentar</h3>
                <div className="space-y-4 mb-6">
                    {(task.comments || []).map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <p className="font-semibold text-gray-800 text-sm">{comment.user.name}</p>
                                <p className="text-xs text-gray-500 ml-2">{new Date(comment.created_at).toLocaleString('id-ID')}</p>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.body}</p>
                        </div>
                    ))}
                    {task.comments && task.comments.length === 0 && <p className="text-sm text-gray-500">Belum ada komentar.</p>}
                </div>

                <form onSubmit={handleCommentSubmit}>
                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Tulis komentar..." className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Kirim Komentar</button>
                </form>
            </div>
        </div>
    );
};

export default TaskDetail;


