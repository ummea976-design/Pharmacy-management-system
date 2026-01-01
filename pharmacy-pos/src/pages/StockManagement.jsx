import React, { useState } from 'react';
import AddStockModal from '../components/modals/AddStockModal';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';

const StockManagement = () => {
    const [showAddStock, setShowAddStock] = useState(false);
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
            
            {showAddStock && <AddStockModal onClose={() => { setShowAddStock(false); showNotification('Inventory Added Successfully'); }} />}

            <PageHeader title="Stock Management">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-sm">file_upload</span>
                    Bulk Import
                </button>
                <button 
                    onClick={() => setShowAddStock(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Inventory
                </button>
            </PageHeader>

            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 flex-1 flex flex-col">
                <div className="p-5 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between border-b border-gray-200 dark:border-slate-700">
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-64">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <span className="material-symbols-outlined text-lg">search</span>
                            </span>
                            <input className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500" placeholder="Search inventory..." type="text" />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                                Low Stock
                            </button>
                            <button className="px-4 py-2 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-600 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                Expiring Soon
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900/50 px-5 py-3 flex flex-wrap gap-4 items-center justify-between text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span>Sort by:</span>
                            <select className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded px-2 py-1 text-xs focus:ring-blue-500 focus:border-blue-500">
                                <option>Product Name</option>
                                <option>Date Added</option>
                                <option>Expiry Date</option>
                            </select>
                            <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary">arrow_upward</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Per page:</span>
                            <select className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded px-2 py-1 text-xs focus:ring-blue-500 focus:border-blue-500">
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        Showing 1 to 20 of 24 results
                    </div>
                </div>

                <Table>
                    <Thead>
                        <Th className="min-w-[200px]">Product</Th>
                        <Th>Batch</Th>
                        <Th>Quantity</Th>
                        <Th>Location</Th>
                        <Th>Expiry Date</Th>
                        <Th>Status</Th>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Amoxicillin 250mg</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">SKU: AMO1757474379790</span>
                                </div>
                            </Td>
                            <Td className="text-sm text-gray-600 dark:text-gray-300">dfsdf</Td>
                            <Td>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">141</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Reorder at: 40</span>
                                </div>
                            </Td>
                            <Td className="text-sm text-gray-600 dark:text-gray-300">2</Td>
                            <Td className="text-sm text-gray-600 dark:text-gray-300">20/10/2026</Td>
                            <Td>
                                <StatusBadge type="success">Good</StatusBadge>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">zee-bd</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">SKU: 6291101134365</span>
                                </div>
                            </Td>
                            <Td className="text-sm text-gray-600 dark:text-gray-300">c32</Td>
                            <Td>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-semibold text-red-600 dark:text-red-400">0</span>
                                        <span className="material-symbols-outlined text-amber-500 text-sm" title="Low Stock">warning</span>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Reorder at: 2</span>
                                </div>
                            </Td>
                            <Td className="text-sm text-gray-600 dark:text-gray-300">f</Td>
                            <Td className="text-sm text-gray-600 dark:text-gray-300">01/09/2027</Td>
                            <Td>
                                <StatusBadge type="error">Low Stock</StatusBadge>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>

                <Pagination />
            </div>
        </div>
    );
};

export default StockManagement;
