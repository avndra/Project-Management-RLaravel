import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

    const openCreateTaskModal = () => setCreateTaskModalOpen(true);
    const closeCreateTaskModal = () => setCreateTaskModalOpen(false);

    apiClient.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                logout();
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        if (token) {
            apiClient.get('/user').then(response => {
                setUser(response.data);
            }).catch(() => {
                logout();
            });
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await apiClient.post('/login', { email, password });
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
    };

    const register = async (name, email, password, passwordConfirmation) => {
        await apiClient.post('/register', { name, email, password, password_confirmation: passwordConfirmation, role: 'staff' });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    const isAuthenticated = () => {
        return token !== null;
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, register, logout, isAuthenticated, isCreateTaskModalOpen, openCreateTaskModal, closeCreateTaskModal }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};