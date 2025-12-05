import React, { useState, useEffect } from 'react';
import apiClient from '../../api';
import Select from 'react-select';

const EditUserModal = ({ isOpen, onClose, onSubmit, user }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('staff');
    const [projectIds, setProjectIds] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (isOpen) {
            apiClient.get('/projects').then(response => setProjects(response.data.data));
        }
    }, [isOpen]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setProjectIds(user.projects.map(p => ({ value: p.id, label: p.name })));
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...user, name, email, password, role, projects: projectIds.map(p => p.value) });
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    const projectOptions = projects.map(project => ({ value: project.id, label: project.name }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md overflow-visible">
                <h2 className="text-2xl font-bold mb-4">Edit Pengguna</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nama</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Kata Sandi</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Kosongkan jika tidak ingin mengubah"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Peran</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Divisi</label>
                        <Select
                            isMulti
                            options={projectOptions}
                            value={projectIds}
                            onChange={setProjectIds}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuShouldBlockScroll={true}
                            placeholder="Pilih Divisi..."
                            noOptionsMessage={() => "Tidak ada divisi"}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Perbarui
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
