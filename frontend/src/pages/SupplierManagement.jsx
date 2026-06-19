import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import AddSupplierModal from '../components/modals/AddSupplierModal';
import api from '../api/axios';

const SupplierManagement = () => {
    const [showAddSupplier, setShowAddSupplier] = useState(false);
    const [toast, setToast] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [editingSupplier, setEditingSupplier] = useState(null);

    // Filters
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        fetchSuppliers();
    }, [page, search, itemsPerPage]);

    const showNotification = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchSuppliers = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: itemsPerPage,
                ...(search && { search }),
                sort: '-createdAt'
            };

            // Assuming /suppliers endpoint exists or using mock if not
            const { data } = await api.get('/suppliers', { params });
            if (data.success) {
                setSuppliers(data.data);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Error fetching suppliers', error);
            showNotification('Failed to fetch suppliers', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this supplier?')) return;

        try {
            const { data } = await api.delete(`/suppliers/${id}`);
            if (data.success) {
                showNotification('Supplier deleted successfully');
                fetchSuppliers();
            }
        } catch (error) {
            console.error('Error deleting supplier', error);
            showNotification('Failed to delete supplier', 'error');
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {toast && (
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up text-white ${toast.type === 'error' ? 'bg-red-500' : 'bg-gray-800'}`}>
                    {toast.message}
                </div>
            )}

            {showAddSupplier && (
                <AddSupplierModal
                    onClose={() => {
                        setShowAddSupplier(false);
                        setEditingSupplier(null);
                    }}
                    supplierToEdit={editingSupplier}
                    onSupplierAdded={() => {
                        setShowAddSupplier(false);
                        setEditingSupplier(null);
                        showNotification(editingSupplier ? 'Supplier Updated Successfully' : 'Supplier Added Successfully');
                        fetchSuppliers();
                    }}
                />
            )}

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
                            <input
                                className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Search suppliers..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
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
                        Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, pagination.total || 0)} of {pagination.total || 0} results
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center flex-1">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
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
                                {suppliers.length === 0 ? (
                                    <Tr>
                                        <Td colSpan="6" className="text-center text-gray-500 py-8">No suppliers found</Td>
                                    </Tr>
                                ) : (
                                    suppliers.map(supplier => (
                                        <Tr key={supplier._id}>
                                            <Td>
                                                <div className="font-medium text-gray-900 dark:text-white">{supplier.name}</div>
                                                <div className="text-xs text-gray-500">ID: {supplier.code || supplier._id.substring(supplier._id.length - 6)}</div>
                                            </Td>
                                            <Td className="text-sm text-gray-600 dark:text-gray-300">{supplier.contactPerson || '-'}</Td>
                                            <Td className="text-sm text-gray-600 dark:text-gray-300">{supplier.phone}</Td>
                                            <Td className="text-sm text-gray-600 dark:text-gray-300">{supplier.email}</Td>
                                            <Td>
                                                <StatusBadge type={supplier.status === 'active' ? 'success' : 'error'}>{supplier.status || 'Active'}</StatusBadge>
                                            </Td>
                                            <Td className="text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        onClick={() => {
                                                            setEditingSupplier(supplier);
                                                            setShowAddSupplier(true);
                                                        }}
                                                        className="text-blue-500 hover:text-blue-700 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(supplier._id)}
                                                        className="text-red-500 hover:text-red-700 transition-colors"
                                                        title="Delete"
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
    );
};

export default SupplierManagement;
