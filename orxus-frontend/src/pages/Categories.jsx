import React, { useEffect, useState } from 'react';
import apiClient from '../api';
import CreateCategoryModal from '../components/modals/CreateCategoryModal';
import EditCategoryModal from '../components/modals/EditCategoryModal';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = () => {
        apiClient.get('/categories')
            .then(response => {
                setCategories(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching categories');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreateCategory = (category) => {
        apiClient.post('/categories', category)
            .then(response => {
                fetchCategories();
            })
            .catch(error => {
                console.error('Error creating category', error);
            });
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleUpdateCategory = (category) => {
        apiClient.put(`/categories/${category.id}`, category)
            .then(response => {
                fetchCategories();
            })
            .catch(error => {
                console.error('Error updating category', error);
            });
    };

    const handleDeleteCategory = (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            apiClient.delete(`/categories/${categoryId}`)
                .then(response => {
                    fetchCategories();
                })
                .catch(error => {
                    console.error('Error deleting category', error);
                });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Categories</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    + Add New Category
                </button>
            </div>
            <CreateCategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateCategory}
            />
            <EditCategoryModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleUpdateCategory}
                category={selectedCategory}
            />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Color</th>
                        <th className="py-2 px-4 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(categories) && categories.map(category => (
                        <tr key={category.id}>
                            <td className="py-2 px-4 border-b">{category.name}</td>
                            <td className="py-2 px-4 border-b">
                                <div style={{ backgroundColor: category.color, width: '20px', height: '20px', borderRadius: '50%' }}></div>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEditCategory(category)} className="text-blue-500">Edit</button>
                                <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;
