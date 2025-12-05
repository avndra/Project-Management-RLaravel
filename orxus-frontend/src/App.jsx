import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './components/Dashboard';
import Tasks from './pages/Tasks';
import CreateTask from './pages/CreateTask';
import TaskDetail from './pages/TaskDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Projects from './pages/Projects';
import Calendar from './pages/Calendar';
import Team from './pages/Team';

import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="tasks/create" element={<AdminRoute><CreateTask /></AdminRoute>} />
                    <Route path="tasks/:id" element={<TaskDetail />} />
                    <Route path="projects" element={<AdminRoute><Projects /></AdminRoute>} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="team" element={<AdminRoute><Team /></AdminRoute>} />

                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
