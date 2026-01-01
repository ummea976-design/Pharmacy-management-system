import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import AddSupplierModal from '../components/modals/AddSupplierModal';

const SupplierManagement = () => {
    const [showAddSupplier, setShowAddSupplier] = useState(false);
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
            
            {showAddSupplier && <AddSupplierModal onClose={() => { setShowAddSupplier(false); showNotification('Supplier Added Successfully'); }} />}

            <PageHeader title="Supplier Management" subtitle="Manage your medicine suppliers and vendors">
                <button 
                    onClick={() => setShowAddSupplier(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Supplier
                </button>
            </PageHeader>

            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 flex-1 flex flex-col">
                <div className="p-5 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between border-b border-gray-200 dark:border-slate-700">
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-64">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <span className="material-symbols-outlined text-lg">search</span>
                            </span>
                            <input className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500" placeholder="Search suppliers..." type="text" />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900/50 px-5 py-3 flex flex-wrap gap-4 items-center justify-between text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span>Sort by:</span>
                            <select className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded px-2 py-1 text-xs focus:ring-blue-500 focus:border-blue-500">
                                <option>Name</option>
                                <option>Date Added</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        Showing 1 to 5 of 5 results
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar flex-1">
                    <Table>
                        <Thead>
                            <Th>Supplier Name</Th>
                            <Th>Contact Person</Th>
                            <Th>Phone</Th>
                            <Th>Email</Th>
                            <Th>Status</Th>
                            <Th className="text-right">Actions</Th>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <div className="font-medium text-gray-900 dark:text-white">Health Distributors Ltd.</div>
                                    <div className="text-xs text-gray-500">ID: SUP-001</div>
                                </Td>
                                <Td className="text-sm text-gray-600 dark:text-gray-300">John Doe</Td>
                                <Td className="text-sm text-gray-600 dark:text-gray-300">035175747</Td>
                                <Td className="text-sm text-gray-600 dark:text-gray-300">john@healthdist.com</Td>
                                <Td>
                                    <StatusBadge type="success">Active</StatusBadge>
                                </Td>
                                <Td className="text-right">
                                    <div className="flex justify-end gap-3">
                                        <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Edit">
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 transition-colors" title="Delete">
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                             <Tr>
                                <Td>
                                    <div className="font-medium text-gray-900 dark:text-white">PharmaCare Inc.</div>
                                    <div className="text-xs text-gray-500">ID: SUP-002</div>
                                </Td>
                                <Td className="text-sm text-gray-600 dark:text-gray-300">Jane Smith</Td>
                                <Td className="text-sm text-gray-600 dark:text-gray-300">0123456789</Td>
                                <Td className="text-sm text-gray-600 dark:text-gray-300">jane@pharmacare.com</Td>
                                <Td>
                                    <StatusBadge type="success">Active</StatusBadge>
                                </Td>
                                <Td className="text-right">
                                    <div className="flex justify-end gap-3">
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
                </div>

                <Pagination />
            </div>
        </div>
    );
};

export default SupplierManagement;
