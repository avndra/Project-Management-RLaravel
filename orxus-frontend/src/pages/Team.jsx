import React, { useEffect, useState } from 'react';
import apiClient from '../api';
import { Trash2, Mail, Shield } from 'lucide-react';

const Team = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = () => {
        apiClient.get('/users')
            .then(response => {
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching users');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (userId) => {
        if (window.confirm('Apakah Anda yakin ingin mengeluarkan pengguna ini?')) {
            apiClient.delete(`/users/${userId}`)
                .then(response => {
                    fetchUsers();
                })
                .catch(error => {
                    console.error('Error deleting user', error);
                });
        }
    };

    if (loading) return <div className="text-center py-10 text-slate-500">Memuat tim...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Anggota Tim</h1>
                <p className="text-slate-500 mt-1">Kelola akses dan peran pengguna.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kontak</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Peran</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Proyek Ditugaskan</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {Array.isArray(users) && users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold mr-3">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="text-sm font-bold text-slate-800">{user.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-slate-600">
                                        <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                        {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${user.role === 'admin'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        <Shield className="w-3 h-3" />
                                        {user.role ? user.role.toUpperCase() : 'STAFF'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-600">
                                        {user.projects && user.projects.length > 0
                                            ? user.projects.map(p => p.name).join(', ')
                                            : <span className="text-slate-400 italic">Tidak ada proyek</span>
                                        }
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleDeleteUser(user.id)} className="text-slate-400 hover:text-red-600 transition-colors" title="Keluarkan">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Team;
