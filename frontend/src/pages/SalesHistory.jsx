import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Pagination from '../components/common/Pagination';

const SalesHistory = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});

    // Filters
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sort, setSort] = useState('-createdAt');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchSales();
    }, [page, search, startDate, endDate, sort, status]);

    const fetchSales = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: 20,
                sort,
                ...(search && { search }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate: `${endDate}T23:59:59.999Z` }),
                ...(status && { status })
            };

            const { data } = await api.get('/sales', { params });
            if (data.success) {
                setSales(data.data);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Error fetching sales history', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = (saleId) => {
        // Implement print functionality (e.g., open a new window with receipt layout)
        window.open(`/print/receipt/${saleId}`, '_blank');
    };

    return (
        <div className="flex-1 overflow-y-auto w-full">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sales History</h1>
                <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                    {/* Filters Section */}
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm transition-colors"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">search</span>
                                </div>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm transition-colors"
                                    placeholder="Search by ID..."
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-700">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 text-xs uppercase font-semibold tracking-wider">
                                            <th className="p-4">Sale ID</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Items</th>
                                            <th className="p-4">Total</th>
                                            <th className="p-4">Payment</th>
                                            <th className="p-4 text-center">Status</th>
                                            <th className="p-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 text-sm">
                                        {sales.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="p-4 text-center text-gray-500">No sales found</td>
                                            </tr>
                                        ) : (
                                            sales.map(sale => (
                                                <tr key={sale._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="p-4 font-medium text-gray-900 dark:text-white text-xs font-mono">{sale.saleId || sale._id.slice(-6).toUpperCase()}</td>
                                                    <td className="p-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                                        {new Date(sale.createdAt).toLocaleString()}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="font-medium text-gray-900 dark:text-white">{sale.items.length} Items</span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                                                                {sale.items.map(i => i.productName || i.product?.name).join(', ')}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-bold text-gray-900 dark:text-white">${sale.total.toFixed(2)}</td>
                                                    <td className="p-4 text-gray-600 dark:text-gray-300 capitalize">{sale.paymentMethod}</td>
                                                    <td className="p-4 text-center">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                            ${sale.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                                sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                                            {sale.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex justify-center gap-3">
                                                            <button
                                                                onClick={() => handlePrint(sale._id)}
                                                                className="text-primary hover:text-blue-700 dark:hover:text-blue-400 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition cursor-pointer"
                                                                title="Print Receipt"
                                                            >
                                                                <span className="material-symbols-outlined text-lg">print</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={page}
                                totalPages={pagination.totalPages || 1}
                                onPageChange={setPage}
                                totalItems={pagination.total || 0}
                                itemsPerPage={20}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesHistory;
