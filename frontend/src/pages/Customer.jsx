import React, { useState, useEffect } from 'react';
import AddCustomerModal from '../components/modals/AddCustomerModal';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import api from '../api/axios';

const Customer = () => {
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [toast, setToast] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [editingCustomer, setEditingCustomer] = useState(null);

    // Filters
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        fetchCustomers();
    }, [page, search, itemsPerPage]);

    const showNotification = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: itemsPerPage,
                ...(search && { search }),
                sort: '-createdAt'
            };

            const { data } = await api.get('/customers', { params });
            if (data.success) {
                setCustomers(data.data);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Error fetching customers', error);
            showNotification('Failed to fetch customers', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;

        try {
            const { data } = await api.delete(`/customers/${id}`);
            if (data.success) {
                showNotification('Customer deleted successfully');
                fetchCustomers();
            }
        } catch (error) {
            console.error('Error deleting customer', error);
            showNotification('Failed to delete customer', 'error');
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {toast && (
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up text-white ${toast.type === 'error' ? 'bg-red-500' : 'bg-gray-800'}`}>
                    {toast.message}
                </div>
            )}

            {showAddCustomer && (
                <AddCustomerModal
                    onClose={() => {
                        setShowAddCustomer(false);
                        setEditingCustomer(null);
                    }}
                    customerToEdit={editingCustomer}
                    onCustomerAdded={() => {
                        setShowAddCustomer(false);
                        setEditingCustomer(null);
                        showNotification(editingCustomer ? 'Customer updated successfully' : 'Customer created successfully');
                        fetchCustomers();
                    }}
                />
            )}

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
                                <input
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white"
                                    placeholder="Search customers by name or phone..."
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
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
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Per page:</label>
                                        <select
                                            value={itemsPerPage}
                                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                            className="form-select text-sm py-1 pl-2 pr-8 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-primary focus:border-primary"
                                        >
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, pagination.total || 0)} of {pagination.total || 0} results
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center flex-1">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-auto">
                                    <Table>
                                        <Thead>
                                            <Th>Customer</Th>
                                            <Th>Contact</Th>
                                            <Th>Address</Th>
                                            <Th>Added</Th>
                                            <Th className="text-right">Actions</Th>
                                        </Thead>
                                        <Tbody>
                                            {customers.length === 0 ? (
                                                <Tr>
                                                    <Td colSpan="5" className="text-center text-gray-500 py-8">No customers found</Td>
                                                </Tr>
                                            ) : (
                                                customers.map(customer => (
                                                    <Tr key={customer._id}>
                                                        <Td className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.name}</Td>
                                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            <div className="flex items-center gap-2">
                                                                <span className="material-symbols-outlined text-gray-400 text-sm">phone</span>
                                                                {customer.phone}
                                                            </div>
                                                        </Td>
                                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{customer.address || '-'}</Td>
                                                        <Td className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(customer.createdAt).toLocaleDateString()}</Td>
                                                        <Td className="whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex items-center justify-end gap-3">
                                                                <button className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 transition-colors" title="Purchase History">
                                                                    <span className="material-symbols-outlined text-lg">history</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingCustomer(customer);
                                                                        setShowAddCustomer(true);
                                                                    }}
                                                                    className="text-primary hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                                                    title="Edit Customer"
                                                                >
                                                                    <span className="material-symbols-outlined text-lg">edit_note</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(customer._id)}
                                                                    className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                                                                    title="Delete Customer"
                                                                >
                                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                                </button>
                                                            </div>
                                                        </Td>
                                                    </Tr>
                                                ))
                                            )}
                                        </Tbody>
                                    </Table>
                                </div>
                            )}

                            <Pagination
                                currentPage={page}
                                totalPages={pagination.totalPages || 1}
                                onPageChange={setPage}
                                totalItems={pagination.total || 0}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
