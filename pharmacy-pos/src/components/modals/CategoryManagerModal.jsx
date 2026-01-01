import React, { useState } from 'react';

const CategoryManagerModal = ({ onClose }) => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Medicine', description: 'General medicines and pills', count: 145 },
        { id: 2, name: 'Antibiotics', description: 'Bacterial infection treatments', count: 32 },
        { id: 3, name: 'First Aid', description: 'Bandages, antiseptics', count: 24 },
        { id: 4, name: 'Pain Relief', description: 'Analgesics and pain killers', count: 56 }
    ]);

    const [newCatName, setNewCatName] = useState('');
    const [newCatDesc, setNewCatDesc] = useState('');

    const handleAddCategory = () => {
        if (!newCatName) return;
        const newCat = {
            id: categories.length + 1,
            name: newCatName,
            description: newCatDesc,
            count: 0
        };
        setCategories([...categories, newCat]);
        setNewCatName('');
        setNewCatDesc('');
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
                        <div className="flex-[2] space-y-2">
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
                                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
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
                                        <th className="px-4 py-3 text-center">Products</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                    {categories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">{cat.description}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs font-medium">{cat.count}</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 font-medium transition-colors">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryManagerModal;
