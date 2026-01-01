import React from 'react';

const SalesHistory = () => {
    return (
        <div className="flex-1 overflow-y-auto w-full">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sales History</h1>
                <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Start Date</label>
                                <div className="relative">
                                    <input className="w-full pl-4 pr-10 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm transition-colors" type="date" defaultValue="2025-11-13" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">End Date</label>
                                <div className="relative">
                                    <input className="w-full pl-4 pr-10 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm transition-colors" type="date" defaultValue="2025-12-14" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">search</span>
                                </div>
                                <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm shadow-sm transition-colors" placeholder="Search by customer, ID, or product..." type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 dark:text-gray-400">Sort by:</label>
                                <select className="text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary py-1.5 pl-3 pr-8">
                                    <option>Date</option>
                                    <option>Total</option>
                                    <option>Status</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 dark:text-gray-400">Per page:</label>
                                <select className="text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary py-1.5 pl-3 pr-8">
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Showing 1 to 20 of 98 results
                        </div>
                    </div>
                    <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-700">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 text-xs uppercase font-semibold tracking-wider">
                                    <th className="p-4">Sale ID</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4 w-1/3">Items</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Payment</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">e5ad0a</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">12/12/2025 17:16:58</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">Walk-in Customer</td>
                                    <td className="p-4">
                                        <div className="space-y-2">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">Amoxicillin 250mg</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">SKU: AMX-250-001</div>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">Anas test</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">SKU: 6676467</div>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">ALGIN</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">SKU: 4353453</div>
                                            </div>
                                            <div className="text-xs text-gray-400 pt-1">4 Items</div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">$337.99</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">Cash</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                            completed
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button className="text-primary hover:text-blue-700 dark:hover:text-blue-400 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                                                <span className="material-symbols-outlined text-lg">print</span>
                                            </button>
                                            <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Item 2 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">b0b770</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">12/12/2025 17:16:22</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">Walk-in Customer</td>
                                    <td className="p-4">
                                        <div className="space-y-2">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">Amoxicillin 250mg</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">SKU: AMX-250-001</div>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">Anas test</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">SKU: 6676467</div>
                                            </div>
                                            <div className="text-xs text-gray-400 pt-1">4 Items</div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">$257.99</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">Cash</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                            completed
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button className="text-primary hover:text-blue-700 dark:hover:text-blue-400 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                                                <span className="material-symbols-outlined text-lg">print</span>
                                            </button>
                                            <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                            <a className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 transition-colors" href="#">
                                <span className="sr-only">Previous</span>
                                <span className="text-xs font-medium">Previous</span>
                            </a>
                            <a aria-current="page" className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-xs font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" href="#">1</a>
                            <a className="relative inline-flex items-center px-4 py-2 text-xs font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 transition-colors" href="#">2</a>
                            <a className="relative inline-flex items-center px-4 py-2 text-xs font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 transition-colors" href="#">3</a>
                            <a className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 transition-colors" href="#">
                                <span className="sr-only">Next</span>
                                <span className="text-xs font-medium">Next</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesHistory;
