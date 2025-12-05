import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";

const TaskDetailModal = ({ task, isOpen, onClose }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useAuth();

    const fetchComments = () => {
        if (task) {
            axios.get(`/api/tasks/${task.id}/comments`)
                .then(response => {
                    setComments(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching comments', error);
                });
        }
    };

    useEffect(() => {
        fetchComments();
    }, [task]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/tasks/${task.id}/comments`, { body: newComment })
            .then(response => {
                fetchComments();
                setNewComment('');
            })
            .catch(error => {
                console.error('Error creating comment', error);
            });
    };

    const handleMarkAsComplete = () => {
        axios.put(`/api/tasks/${task.id}`, { status: 'done' })
            .then(response => {
                onClose();
            })
            .catch(error => {
                console.error('Error updating task status', error);
            });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{task.title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <p className="text-gray-700 mb-4">{task.description}</p>
                <div className="mb-4">
                    <h3 className="font-bold mb-2">Comments</h3>
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src={`https://i.pravatar.cc/150?u=${comment.user.email}`} alt={comment.user.name} />
                                </div>
                                <div>
                                    <div className="font-bold">{comment.user.name}</div>
                                    <p>{comment.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleCommentSubmit}>
                    <div className="mb-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Add a comment..."
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Comment
                    </button>
                </form>
                {task.status !== 'done' && (
                    <div className="mt-4">
                        <button
                            onClick={handleMarkAsComplete}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Mark as Complete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetailModal;
