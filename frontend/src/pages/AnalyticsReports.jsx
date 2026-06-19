import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AnalyticsReports = () => {
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    const [salesSummary, setSalesSummary] = useState({
        totalSales: 0,
        totalRevenue: 0,
        avgOrderValue: 0
    });

    const [topProducts, setTopProducts] = useState([]);

    const [inventorySummary, setInventorySummary] = useState({
        totalProducts: 0,
        stockValue: 0,
        lowStock: 0,
        expiringSoon: 0
    });

    useEffect(() => {
        fetchAllData();
    }, [dateRange]);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const params = {
                startDate: dateRange.startDate,
                endDate: `${dateRange.endDate}T23:59:59.999Z`
            };

            const [salesRes, productsRes, inventoryRes] = await Promise.all([
                api.get('/analytics/sales-summary', { params }),
                api.get('/analytics/top-products', { params: { ...params, limit: 5 } }),
                api.get('/analytics/inventory-summary') // Inventory is current state, usually doesn't take date range
            ]);

            if (salesRes.data.success) setSalesSummary(salesRes.data.data);
            if (productsRes.data.success) setTopProducts(productsRes.data.data);
            if (inventoryRes.data.success) setInventorySummary(inventoryRes.data.data);

        } catch (error) {
            console.error('Error fetching analytics', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (e) => {
        setDateRange({
            ...dateRange,
            [e.target.name]: e.target.value
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
    };

    return (
        <div className="flex-1 overflow-y-auto w-full" id="report-content">
            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #report-content, #report-content * {
                            visibility: visible;
                        }
                        #report-content {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            background: white;
                            color: black;
                        }
                        /* Hide buttons in print mode */
                        button, .no-print {
                            display: none !important;
                        }
                    }
                `}
            </style>
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics & Reports</h1>
                <button
                    onClick={() => window.print()}
                    className="flex items-center bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 cursor-pointer"
                >
                    <span className="material-symbols-outlined mr-2 text-lg">print</span>
                    Print Report
                </button>
            </header>

            <section className="bg-white dark:bg-card-dark rounded-xl shadow-sm p-6 mb-6 border border-gray-100 dark:border-slate-700">
                <h2 className="flex items-center text-md font-semibold text-blue-600 mb-4 dark:text-blue-400">
                    <span className="material-symbols-outlined mr-2 text-xl">trending_up</span>
                    Date Range Selection
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Start Date</label>
                        <div className="relative">
                            <input
                                name="startDate"
                                value={dateRange.startDate}
                                onChange={handleDateChange}
                                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 shadow-sm"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">End Date</label>
                        <div className="relative">
                            <input
                                name="endDate"
                                value={dateRange.endDate}
                                onChange={handleDateChange}
                                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 shadow-sm"
                                type="date"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700 flex flex-col h-full">
                        <h2 className="flex items-center text-md font-semibold text-gray-800 dark:text-white mb-5">
                            <span className="material-symbols-outlined mr-2 text-green-500">bar_chart</span>
                            Sales Summary
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Sales</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{salesSummary.totalSales}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(salesSummary.totalRevenue)}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Avg. Order Value</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(salesSummary.avgOrderValue)}</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Top Selling Products</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-b dark:border-gray-700">
                                        <tr>
                                            <th className="py-3 px-2 font-semibold" scope="col">Product</th>
                                            <th className="py-3 px-2 font-semibold text-right" scope="col">Qty Sold</th>
                                            <th className="py-3 px-2 font-semibold text-right" scope="col">Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {topProducts.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="py-4 text-center text-gray-500">No data available</td>
                                            </tr>
                                        ) : (
                                            topProducts.map((product, index) => (
                                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{product.product?.name}</td>
                                                    <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">{product.quantitySold}</td>
                                                    <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">{formatCurrency(product.revenue)}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700 h-full">
                        <h2 className="flex items-center text-md font-semibold text-gray-800 dark:text-white mb-5">
                            <span className="material-symbols-outlined mr-2 text-blue-600 dark:text-blue-400">pie_chart</span>
                            Inventory Summary
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{inventorySummary.totalProducts}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Stock Value</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(inventorySummary.stockValue)}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Low Stock</p>
                                <p className="text-2xl font-bold text-amber-500 dark:text-amber-400">{inventorySummary.lowStock}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Expiring Soon</p>
                                <p className="text-2xl font-bold text-red-500 dark:text-red-400">{inventorySummary.expiringSoon}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticsReports;
