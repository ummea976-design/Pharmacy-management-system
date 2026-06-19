import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const OverviewDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        todaysSales: 0,
        monthlyRevenue: 0,
        stockAlerts: 0,
        expiringSoon: 0
    });
    const [recentSales, setRecentSales] = useState([]);
    const [salesTrend, setSalesTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch Overview Stats
            const dashboardRes = await api.get('/analytics/dashboard');
            if (dashboardRes.data.success) {
                setStats(dashboardRes.data.data);
            }

            // Fetch Sales Trend (Last 7 days)
            const trendRes = await api.get('/analytics/sales-trend?days=7');
            if (trendRes.data.success) {
                // Fill in missing days with 0
                const trendData = fillMissingDays(trendRes.data.data, 7);
                setSalesTrend(trendData);
            }

            // Fetch Recent Sales
            const salesRes = await api.get('/sales', { params: { limit: 5, sort: '-createdAt' } });
            if (salesRes.data.success) {
                setRecentSales(salesRes.data.data);
            }

        } catch (error) {
            console.error('Error fetching dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to ensure we have 7 days of data even if some days have 0 sales
    const fillMissingDays = (data, days) => {
        const result = [];
        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const found = data.find(item => item._id === dateStr);
            result.push({
                date: dateStr,
                label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                total: found ? found.total : 0
            });
        }
        return result;
    };

    // Chart Calculations
    const getChartPath = () => {
        if (!salesTrend.length) return '';
        const maxVal = Math.max(...salesTrend.map(d => d.total), 100); // Min 100 to avoid div/0
        const points = salesTrend.map((d, i) => {
            const x = (i / (salesTrend.length - 1)) * 100;
            const y = 100 - ((d.total / maxVal) * 80); // Leave 20% breathing room at top, inverted Y
            return `${x},${y}`;
        });

        // Toggle: Smooth curve (bezier) or straight lines
        // Simple straight lines for robustness first: 'M x,y L x,y ...'
        // Or Catmull-Rom spline logic for smooth curves if needed, but linear is safer for quick impl.
        // Let's do a simple path consisting of lines.
        let path = `M ${points[0]}`;
        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i]}`;
        }
        return path;
    };

    const getAreaPath = () => {
        const linePath = getChartPath();
        if (!linePath) return '';
        return `${linePath} V 100 H 0 Z`;
    };

    // Calculate Y-axis labels dynamically
    const maxChartValue = Math.max(...salesTrend.map(d => d.total), 100);
    const yAxisLabels = [1, 0.8, 0.6, 0.4, 0.2, 0].map(ratio => Math.round(maxChartValue * ratio));

    return (
        <>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Overview</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Welcome back, {user?.name || 'Admin'}</p>
                </div>
                <Link to="/pos" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg flex items-center transition-all duration-200">
                    <span className="material-symbols-outlined text-xl mr-2">shopping_cart</span>
                    <span className="font-medium">POS</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-blue-500/20 flex justify-between items-center transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-blue-100 text-sm font-medium">Today's Sales</p>
                        <h3 className="text-3xl font-bold mt-2">${stats.todaysSales?.toFixed(2) || '0.00'}</h3>
                        <p className="text-blue-100 text-xs mt-2 opacity-80">Total sales today</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-3xl text-white">shopping_cart</span>
                    </div>
                </div>
                <div className="bg-green-500 rounded-xl p-6 text-white shadow-lg shadow-green-500/20 flex justify-between items-center transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-green-100 text-sm font-medium">Monthly Revenue</p>
                        <h3 className="text-3xl font-bold mt-2">${stats.monthlyRevenue?.toFixed(2) || '0.00'}</h3>
                        <p className="text-green-100 text-xs mt-2 opacity-80">This month</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-3xl text-white">payments</span>
                    </div>
                </div>
                <div className="bg-yellow-500 rounded-xl p-6 text-white shadow-lg shadow-yellow-500/20 flex justify-between items-center transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-yellow-100 text-sm font-medium">Stock Alerts</p>
                        <h3 className="text-3xl font-bold mt-2">{stats.stockAlerts || 0}</h3>
                        <p className="text-yellow-100 text-xs mt-2 opacity-80">Below reorder level</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-3xl text-white">inventory_2</span>
                    </div>
                </div>
                <div className="bg-red-500 rounded-xl p-6 text-white shadow-lg shadow-red-500/20 flex justify-between items-center transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-red-100 text-sm font-medium">Expiring Soon</p>
                        <h3 className="text-3xl font-bold mt-2">{stats.expiringSoon || 0}</h3>
                        <p className="text-red-100 text-xs mt-2 opacity-80">Within 3 months</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-3xl text-white">warning</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Sales Trend</h3>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">Last 7 days</span>
                </div>

                {/* Dynamic JS Chart */}
                <div className="w-full h-72 relative">
                    {/* Y Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs font-medium text-gray-400 text-right pr-3">
                        {yAxisLabels.map((val, i) => (
                            <span key={i}>${val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val}</span>
                        ))}
                    </div>

                    {/* Chart Area */}
                    <div className="absolute left-14 right-0 top-2 bottom-8">
                        {/* Grid Lines */}
                        <div className="absolute w-full h-full flex flex-col justify-between pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="border-t border-gray-100 dark:border-gray-800 w-full h-0"></div>
                            ))}
                        </div>

                        {/* SVG Graph */}
                        <svg className="w-full h-full absolute top-0 left-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15"></stop>
                                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            {salesTrend.length > 0 && (
                                <>
                                    <path d={getChartPath()} fill="none" stroke="#2563EB" strokeLinecap="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke"></path>
                                    <path d={getAreaPath()} fill="url(#gradient)" stroke="none"></path>
                                </>
                            )}
                        </svg>

                        {/* Data Points (Tooltips could be added here) */}
                        <div className="absolute inset-0 pointer-events-none">
                            {salesTrend.map((d, i) => {
                                const x = (i / (salesTrend.length - 1)) * 100;
                                const y = 100 - ((d.total / maxChartValue) * 80);
                                return (
                                    <div
                                        key={i}
                                        className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm transition-all hover:scale-125"
                                        style={{ left: `${x}%`, top: `${y}%` }}
                                        title={`${d.label}: $${d.total}`}
                                    ></div>
                                )
                            })}
                        </div>
                    </div>

                    {/* X Axis Labels */}
                    <div className="absolute left-14 right-0 bottom-0 flex justify-between text-xs font-medium text-gray-400">
                        {salesTrend.map((d, i) => (
                            <span key={i}>{d.label}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 px-1">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <Link to="/pos" className="flex flex-col items-center justify-center p-8 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-primary">shopping_cart</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">New Sale</span>
                    </Link>
                    {/* To be implemented properly later, keep links */}
                    <Link to="/stock" className="flex flex-col items-center justify-center p-8 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-green-500">add_circle</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Add Product</span>
                    </Link>
                    <Link to="/reports" className="flex flex-col items-center justify-center p-8 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-purple-500">assessment</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Generate Report</span>
                    </Link>
                    <Link to="/alerts" className="flex flex-col items-center justify-center p-8 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-yellow-500">notifications</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">View Alerts</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Recent Sales</h3>
                    <div className="space-y-4">
                        {loading && recentSales.length === 0 ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : recentSales.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">No recent sales</div>
                        ) : (
                            recentSales.map(sale => (
                                <div key={sale._id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="w-full">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">${(sale.totalAmount || sale.total || 0).toFixed(2)}</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                                                {sale.items?.map(i => `${i.quantity}x ${i.product?.name || 'Item'}`).join(', ') || 'No items'}
                                            </p>
                                            <div className="flex items-center mt-3 text-xs text-gray-400 font-medium">
                                                <span className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">person</span> {sale.cashier || 'Admin'}</span>
                                                <span className="mx-2 text-gray-300">•</span>
                                                <span className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">schedule</span> {new Date(sale.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {recentSales.length > 0 && (
                            <div className="pt-2 text-center">
                                <Link to="/sales-history" className="text-sm font-medium text-primary hover:text-primary-dark">View All History</Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Inventory Alerts</h3>
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/20">
                        <div className={`bg-white dark:bg-gray-800 p-4 rounded-full shadow-sm mb-4 ${stats.stockAlerts > 0 ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}>
                            <span className="material-symbols-outlined text-4xl">inventory</span>
                        </div>
                        {stats.stockAlerts > 0 ? (
                            <>
                                <p className="text-sm font-medium mb-1 text-gray-800 dark:text-white">{stats.stockAlerts} Low Stock Items</p>
                                {/* Note: /stock route needs to handle filters later */}
                                <Link to="/stock" className="text-xs text-primary hover:underline">View Details</Link>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-medium mb-1">No new alerts available</p>
                                <p className="text-xs text-gray-400">Inventory levels are looking good.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="h-8"></div>
        </>
    );
};

export default OverviewDashboard;
