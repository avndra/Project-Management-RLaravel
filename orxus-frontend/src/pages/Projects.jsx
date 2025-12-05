import React, { useEffect, useState } from 'react';
import apiClient from '../api';
import CreateProjectModal from '../components/modals/CreateProjectModal';
import EditProjectModal from '../components/modals/EditProjectModal';
import { Edit2, Trash2, Plus, Calendar, User } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchProjects = () => {
        apiClient.get('/projects')
            .then(response => {
                setProjects(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching projects');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = (project) => {
        apiClient.post('/projects', project)
            .then(response => {
                fetchProjects();
            })
            .catch(error => {
                console.error('Error creating project', error);
            });
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
    };

    const handleUpdateProject = (project) => {
        apiClient.put(`/projects/${project.id}`, project)
            .then(response => {
                fetchProjects();
            })
            .catch(error => {
                console.error('Error updating project', error);
            });
    };

    const handleDeleteProject = (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            apiClient.delete(`/projects/${projectId}`)
                .then(response => {
                    fetchProjects();
                })
                .catch(error => {
                    console.error('Error deleting project', error);
                });
        }
    };

    if (loading) return <div className="text-center py-10 text-slate-500">Memuat divisi...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Divisi</h1>
                    <p className="text-slate-500 mt-1">Kelola divisi dan tim kerja.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all hover:shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Buat Divisi
                </button>
            </div>

            <CreateProjectModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateProject}
            />
            <EditProjectModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleUpdateProject}
                project={selectedProject}
            />

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Divisi</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Dibuat</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {Array.isArray(projects) && projects.map(project => (
                            <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-slate-800">{project.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-500 max-w-xs truncate">{project.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-slate-600">
                                        <User className="w-4 h-4 mr-2 text-slate-400" />
                                        {project.owner ? project.owner.name : 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-slate-600">
                                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                        {new Date(project.created_at).toLocaleDateString('id-ID')}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        project.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                                    }`}>
                                        {project.status === 'active' ? 'Aktif' : project.status || 'Aktif'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleEditProject(project)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteProject(project.id)} className="text-slate-400 hover:text-red-600 transition-colors">
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

export default Projects;
