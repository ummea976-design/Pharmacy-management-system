import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const CategoryManagerModal = ({ onClose, onCategoryChange }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCatName, setNewCatName] = useState('');
    const [newCatDesc, setNewCatDesc] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/categories');
            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Error fetching categories');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCatName.trim()) return;

        try {
            const { data } = await api.post('/categories', {
                name: newCatName,
                description: newCatDesc
            });

            if (data.success) {
                setNewCatName('');
                setNewCatDesc('');
                fetchCategories();
                if (onCategoryChange) onCategoryChange();
            }
        } catch (error) {
            setError(error.response?.data?.error?.message || 'Failed to add category');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await api.delete(`/categories/${id}`);
            fetchCategories();
            if (onCategoryChange) onCategoryChange();
        } catch (error) {
            setError(error.response?.data?.error?.message || 'Failed to delete category');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Manage Categories</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4 mb-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700">
                        <div className="flex-1 space-y-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase">New Category Name</label>
                            <input
                                value={newCatName}
                                onChange={(e) => setNewCatName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                                placeholder="E.g. Vitamins"
                            />
                        </div>
                        <div className="flex-2 space-y-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase">Description</label>
                            <div className="flex gap-2">
                                <input
                                    value={newCatDesc}
                                    onChange={(e) => setNewCatDesc(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                                    placeholder="Optional description"
                                />
                                <button
                                    onClick={handleAddCategory}
                                    disabled={!newCatName.trim()}
                                    className={`bg-primary text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${!newCatName.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Existing Categories</h4>
                        <div className="border rounded-lg overflow-hidden dark:border-slate-700">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Description</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                    {loading ? (
                                        <tr><td colSpan="3" className="px-4 py-3 text-center">Loading...</td></tr>
                                    ) : categories.length === 0 ? (
                                        <tr><td colSpan="3" className="px-4 py-3 text-center text-gray-500">No categories found</td></tr>
                                    ) : (
                                        categories.map((cat) => (
                                            <tr key={cat._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">{cat.description || '-'}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        onClick={() => handleDeleteCategory(cat._id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                                        title="Delete Category"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 font-medium transition-colors cursor-pointer">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryManagerModal;
