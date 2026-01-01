import React from 'react';

const StockAlerts = () => {
    return (
        <div className="flex-1 overflow-y-auto w-full">
            <div className="max-w-7xl mx-auto bg-white dark:bg-card-dark rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 transition-colors duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stock Alerts</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor inventory status and take action</p>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-lg">search</span>
                        </span>
                        <input className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-700 rounded-md bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary w-64 text-sm" placeholder="Search alerts..." type="text" />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 bg-background-light dark:bg-gray-800/50 p-3 rounded-md mb-6 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Sort by:</label>
                        <select className="form-select text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-card-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary py-1 pr-8">
                            <option>Alert Type</option>
                            <option>Date</option>
                            <option>Priority</option>
                        </select>
                        <button className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-base">arrow_upward</span>
                        </button>
                    </div>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-2 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Filter:</label>
                        <select className="form-select text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-card-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary py-1 pr-8">
                            <option>All Alerts</option>
                            <option>Low Stock</option>
                            <option>Expiring</option>
                        </select>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Per page:</label>
                        <select className="form-select text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-card-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary py-1 pr-8">
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Showing 1 to 10 of 10 results</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Low Stock Items</h3>
                                <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">3</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Items below reorder level</p>
                            </div>
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                                <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">inventory_2</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Expiring Soon</h3>
                                <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">1</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Items expiring within 90 days</p>
                            </div>
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">schedule</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Out of Stock</h3>
                                <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">6</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Items with zero quantity</p>
                            </div>
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                                <span className="material-symbols-outlined text-red-600 dark:text-red-400">remove_shopping_cart</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-card-dark">
                    <div className="bg-background-light dark:bg-gray-800/50 p-1 flex gap-1 border-b border-gray-200 dark:border-slate-700">
                        <button className="flex-1 py-2 text-sm font-medium rounded-md bg-white dark:bg-card-dark text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-slate-700">
                            Low Stock
                        </button>
                        <button className="flex-1 py-2 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            Expiring Soon
                        </button>
                        <button className="flex-1 py-2 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            Out of Stock
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                            <thead className="bg-background-light dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">SKU</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reorder Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expiry Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-card-dark divide-y divide-gray-200 dark:divide-slate-700">
                                {/* Row 1 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">AMX-250-001</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Amoxicillin 250mg</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">3</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">23652346</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">20/08/2025</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">sdhdf</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                            Low Stock
                                        </span>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Bn1234</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Beterdine</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">50</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">668</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">13/08/2025</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Ggg</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                            Low Stock
                                        </span>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">53534534</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">ACE</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">410</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">4964</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">12/12/2055</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">5948</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                            Low Stock
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockAlerts;
