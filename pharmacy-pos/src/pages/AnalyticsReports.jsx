import React from 'react';

const AnalyticsReports = () => {
    return (
        <div className="flex-1 overflow-y-auto w-full">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics & Reports</h1>
                <button className="flex items-center bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900">
                    <span className="material-symbols-outlined mr-2 text-lg">file_download</span>
                    Export Report
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
                            <input className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 shadow-sm" readOnly type="text" defaultValue="11/13/2025" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 text-sm">calendar_today</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">End Date</label>
                        <div className="relative">
                            <input className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 shadow-sm" readOnly type="text" defaultValue="12/14/2025" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 text-sm">calendar_today</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700 flex flex-col h-full">
                    <h2 className="flex items-center text-md font-semibold text-gray-800 dark:text-white mb-5">
                        <span className="material-symbols-outlined mr-2 text-green-500">bar_chart</span>
                        Sales Summary
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Sales</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">100</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">$18492.80</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Avg. Order Value</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">$184.93</p>
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
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Anas test</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">37</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">$7400.00</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Paracetamol 500mg</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">959</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">$5744.41</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Amoxicillin 250mg</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">93</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">$2325.00</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">ALGIN</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">102</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">$1020.00</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Amoxicillin 250mg</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">94</td>
                                        <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-300">$940.00</td>
                                    </tr>
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
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">65</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Stock Value</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">$2976610.59</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Low Stock</p>
                            <p className="text-2xl font-bold text-amber-500 dark:text-amber-400">9</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Expiring Soon</p>
                            <p className="text-2xl font-bold text-red-500 dark:text-red-400">4</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsReports;
