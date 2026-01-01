import React, { useState } from 'react';
import AddCustomerModal from '../components/modals/AddCustomerModal';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';
import Pagination from '../components/common/Pagination';

const Customer = () => {
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [toast, setToast] = useState(null);

    const showNotification = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {toast && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
                    {toast}
                </div>
            )}
            
            {showAddCustomer && <AddCustomerModal onClose={() => { setShowAddCustomer(false); showNotification('Customer Created Successfully'); }} />}

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <PageHeader title="Customer">
                        <button 
                            onClick={() => setShowAddCustomer(true)}
                            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            Add Customer
                        </button>
                    </PageHeader>

                    <div className="bg-white dark:bg-card-dark rounded-xl shadow border border-gray-200 dark:border-slate-700 flex flex-col h-[calc(100vh-140px)]">
                        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400">search</span>
                                </span>
                                <input className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white" placeholder="Search customers by name or phone..." type="text" />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sort by:</label>
                                        <select className="form-select text-sm py-1 pl-2 pr-8 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-primary focus:border-primary">
                                            <option>Date Added</option>
                                            <option>Name</option>
                                        </select>
                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                            <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Per page:</label>
                                        <select className="form-select text-sm py-1 pl-2 pr-8 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-primary focus:border-primary">
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Showing 1 to 20 of 27 results
                                </div>
                            </div>
                            
                            <Table>
                                <Thead>
                                    <Th>Customer</Th>
                                    <Th>Contact</Th>
                                    <Th>Address</Th>
                                    <Th>Added</Th>
                                    <Th className="text-right">Actions</Th>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Walssxc</Td>
                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-gray-400 text-sm">phone</span>
                                                055454584
                                            </div>
                                        </Td>
                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</Td>
                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">12/8/2025</Td>
                                        <Td className="whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-3">
                                                <button className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 transition-colors"><span className="material-symbols-outlined text-lg">history</span></button>
                                                <button className="text-primary hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"><span className="material-symbols-outlined text-lg">edit_note</span></button>
                                                <button className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                                            </div>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">cash sasa</Td>
                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-gray-400 text-sm">phone</span>
                                                1111111111
                                            </div>
                                        </Td>
                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</Td>
                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">12/7/2025</Td>
                                        <Td className="whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-3">
                                                <button className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 transition-colors"><span className="material-symbols-outlined text-lg">history</span></button>
                                                <button className="text-primary hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"><span className="material-symbols-outlined text-lg">edit_note</span></button>
                                                <button className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                                            </div>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                            
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
