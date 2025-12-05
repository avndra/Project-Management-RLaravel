import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api';

const Settings = () => {
    const { user, setUser } = useAuth();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await apiClient.post('/user/profile', { name });
            setUser(response.data.data);
            setMessage('Profile name updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                let errorMessages = [];
                for (const key in validationErrors) {
                    errorMessages.push(validationErrors[key].join(' '));
                }
                setMessage(`Update failed: ${errorMessages.join(' ')}`);
            } else {
                setMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                {message && <div className={`mb-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message}</div>}

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={user.email}
                        disabled
                    />
                     <p className="text-xs text-gray-500 mt-1">Email address cannot be changed.</p>
                </div>
                
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Name
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;

