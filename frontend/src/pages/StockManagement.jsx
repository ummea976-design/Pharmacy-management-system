import React, { useState, useEffect } from 'react';
import AddStockModal from '../components/modals/AddStockModal';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import api from '../api/axios';

const StockManagement = () => {
    const [showAddStock, setShowAddStock] = useState(false);
    const [toast, setToast] = useState(null);
    const [stockItems, setStockItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});

    // Filters
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, low_stock, expired
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [sort, setSort] = useState('productName');

    useEffect(() => {
        fetchStock();
    }, [page, search, filterStatus, itemsPerPage, sort]);

    const showNotification = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchStock = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: itemsPerPage,
                ...(search && { search }),
                ...(filterStatus !== 'all' && { status: filterStatus }),
                sort
            };

            // Fetch from /stock to get batch details
            const { data } = await api.get('/stock', { params });
            if (data.success) {
                setStockItems(data.data);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Error fetching stock', error);
            showNotification('Failed to fetch stock', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getStockStatus = (item) => {
        const minStock = item.product?.reorderLevel || 10;
        if (item.quantity === 0) return { label: 'Out of Stock', type: 'error' };
        if (item.quantity <= minStock) return { label: 'Low Stock', type: 'warning' };
        // Check expiry if applicable
        if (item.expiryDate && new Date(item.expiryDate) < new Date()) return { label: 'Expired', type: 'error' };
        return { label: 'Good', type: 'success' };
    };

    return (
        <div className="flex flex-col h-full relative">
            {toast && (
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up text-white ${toast.type === 'error' ? 'bg-red-500' : 'bg-gray-800'}`}>
                    {toast.message}
                </div>
            )}

            {showAddStock && (
                <AddStockModal
                    onClose={() => setShowAddStock(false)}
                    onStockAdded={() => {
                        setShowAddStock(false);
                        showNotification('Inventory Updated Successfully');
                        fetchStock();
                    }}
                />
            )}

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
                    Adjust Stock
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
                                placeholder="Search inventory..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setFilterStatus(filterStatus === 'low_stock' ? 'all' : 'low_stock')}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filterStatus === 'low_stock' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600'}`}
                            >
                                Low Stock
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900/50 px-5 py-3 flex flex-wrap gap-4 items-center justify-between text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span>Sort by:</span>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded px-2 py-1 text-xs focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="-createdAt">Date Added</option>
                                <option value="quantity">Quantity (Low to High)</option>
                                <option value="-quantity">Quantity (High to Low)</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Per page:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded px-2 py-1 text-xs focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
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
                    <div className="flex-1 overflow-auto">
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
                                {stockItems.length === 0 ? (
                                    <Tr>
                                        <Td colSpan="6" className="text-center text-gray-500 py-8">No inventory items found</Td>
                                    </Tr>
                                ) : (
                                    stockItems.map(item => {
                                        const status = getStockStatus(item);
                                        return (
                                            <Tr key={item._id}>
                                                <Td>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.product?.name || 'Unknown Product'}</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">SKU: {item.product?.sku}</span>
                                                    </div>
                                                </Td>
                                                <Td className="text-sm text-gray-600 dark:text-gray-300">{item.batchNumber || '-'}</Td>
                                                <Td>
                                                    <div className="flex flex-col">
                                                        <span className={`text-sm font-semibold ${item.quantity <= (item.product?.reorderLevel || 10) ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                                            {item.quantity}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">Reorder: {item.product?.reorderLevel || 10}</span>
                                                    </div>
                                                </Td>
                                                <Td className="text-sm text-gray-600 dark:text-gray-300">{item.location || '-'}</Td>
                                                <Td className="text-sm text-gray-600 dark:text-gray-300">
                                                    {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : '-'}
                                                </Td>
                                                <Td>
                                                    <StatusBadge type={status.type}>{status.label}</StatusBadge>
                                                </Td>
                                            </Tr>
                                        );
                                    })
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

export default StockManagement;
