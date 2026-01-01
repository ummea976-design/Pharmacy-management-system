import React, { useState } from 'react';
import AddProductModal from '../components/modals/AddProductModal';
import CategoryManagerModal from '../components/modals/CategoryManagerModal';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';

const ProductCatalog = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [toast, setToast] = useState(null);

    const showNotification = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="flex flex-col h-full relative">
            {toast && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
                    {toast}
                </div>
            )}

            <PageHeader title="Product Catalog">
                <button 
                    onClick={() => setShowCategories(true)}
                    className="bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">category</span>
                    Categories
                </button>
                <button className="bg-secondary hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-lg">upload_file</span>
                    Bulk Import
                </button>
                <button 
                    onClick={() => setShowAddProduct(true)}
                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add Product
                </button>
            </PageHeader>

            {/* Modals */}
            {showAddProduct && <AddProductModal onClose={() => { setShowAddProduct(false); showNotification('Product Added Successfully'); }} />}
            {showCategories && <CategoryManagerModal onClose={() => setShowCategories(false)} />}

            <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-slate-700 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                            </div>
                            <input className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-slate-700 rounded-l-md rounded-r-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" placeholder="Search by name, generic name, SKU, or manufacturer..." type="text" />
                        </div>
                        <div className="w-full md:w-48">
                            <select className="block w-full py-2 pl-3 pr-10 text-sm border border-gray-200 dark:border-slate-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary">
                                <option>All Categories</option>
                                <option>Medicine</option>
                                <option>Antibiotics</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span>Sort by:</span>
                                <div className="relative">
                                    <select className="py-1 pl-2 pr-8 border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary">
                                        <option>Name</option>
                                        <option>Price</option>
                                        <option>SKU</option>
                                    </select>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 text-sm cursor-pointer hover:text-primary">arrow_upward</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Per page:</span>
                                <select className="py-1 pl-2 pr-8 border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary">
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            Showing 1 to 20 of 65 results
                        </div>
                    </div>
                </div>
                
                <Table>
                    <Thead>
                        <Th className="min-w-[250px]">Name</Th>
                        <Th>Category</Th>
                        <Th>SKU</Th>
                        <Th>Price</Th>
                        <Th>Requires RX</Th>
                        <Th className="text-right">Actions</Th>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 dark:text-white">ACE</span>
                                    <span className="text-xs text-gray-500 italic">Generic: paracetamol</span>
                                    <span className="text-xs text-gray-400">Mfr: sdfds</span>
                                </div>
                            </Td>
                            <Td>
                                <StatusBadge type="info">sdfdsf</StatusBadge>
                            </Td>
                            <Td className="text-sm text-gray-600 dark:text-gray-300">53534534</Td>
                            <Td className="text-sm font-medium text-gray-900 dark:text-white">$20.00</Td>
                            <Td className="text-sm text-gray-600 dark:text-gray-300">Yes</Td>
                            <Td className="text-right">
                                <div className="flex justify-end gap-3">
                                    <button className="text-purple-500 hover:text-purple-700 transition-colors" title="Barcode">
                                        <span className="material-symbols-outlined text-lg">qr_code_2</span>
                                    </button>
                                    <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Edit">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 transition-colors" title="Delete">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
                
                <Pagination />
            </div>
        </div>
    );
};

export default ProductCatalog;
