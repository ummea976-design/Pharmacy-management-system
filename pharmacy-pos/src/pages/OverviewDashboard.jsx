import React from 'react';

const OverviewDashboard = () => {
    return (
        <>
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Overview</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Welcome back, Admin User</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg flex items-center transition-all duration-200">
                    <span className="material-symbols-outlined text-xl mr-2">shopping_cart</span>
                    <span className="font-medium">POS</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-blue-500/20 flex justify-between items-center transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-blue-100 text-sm font-medium">Today's Sales</p>
                        <h3 className="text-3xl font-bold mt-2">$0.00</h3>
                        <p className="text-blue-100 text-xs mt-2 opacity-80">Total sales today</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-3xl text-white">shopping_cart</span>
                    </div>
                </div>
                <div className="bg-green-500 rounded-xl p-6 text-white shadow-lg shadow-green-500/20 flex justify-between items-center transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-green-100 text-sm font-medium">Monthly Revenue</p>
                        <h3 className="text-3xl font-bold mt-2">$3,909.55</h3>
                        <p className="text-green-100 text-xs mt-2 opacity-80">This month</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-3xl text-white">payments</span>
                    </div>
                </div>
                <div className="bg-yellow-500 rounded-xl p-6 text-white shadow-lg shadow-yellow-500/20 flex justify-between items-center transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-yellow-100 text-sm font-medium">Stock Alerts</p>
                        <h3 className="text-3xl font-bold mt-2">9</h3>
                        <p className="text-yellow-100 text-xs mt-2 opacity-80">Below reorder level</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-3xl text-white">inventory_2</span>
                    </div>
                </div>
                <div className="bg-red-500 rounded-xl p-6 text-white shadow-lg shadow-red-500/20 flex justify-between items-center transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-red-100 text-sm font-medium">Expiring Soon</p>
                        <h3 className="text-3xl font-bold mt-2">4</h3>
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
                <div className="w-full h-72 relative">
                    <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-xs font-medium text-gray-400 text-right pr-3">
                        <span>$1.4K</span>
                        <span>$1.2K</span>
                        <span>$1K</span>
                        <span>$800</span>
                        <span>$600</span>
                        <span>$400</span>
                        <span>$200</span>
                        <span>$0</span>
                    </div>
                    <div className="absolute left-12 right-0 top-2 bottom-8">
                        <div className="absolute w-full h-full flex flex-col justify-between pointer-events-none">
                            <div className="border-t border-gray-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-gray-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-gray-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-gray-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-gray-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-gray-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-gray-100 dark:border-gray-800 w-full h-0"></div>
                            <div className="border-t border-gray-200 dark:border-gray-700 w-full h-0"></div>
                        </div>
                        <svg className="w-full h-full absolute top-0 left-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15"></stop>
                                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,70 C20,75 40,80 50,60 C60,40 80,30 100,20" fill="none" stroke="#2563EB" strokeLinecap="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke"></path>
                            <path d="M0,70 C20,75 40,80 50,60 C60,40 80,30 100,20 V100 H0 Z" fill="url(#gradient)" stroke="none"></path>
                        </svg>
                        {/* Data Points (HTML implementation to avoid SVG stretching distortion) */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ left: '0%', top: '70%' }}></div>
                            <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ left: '25%', top: '77%' }}></div>
                            <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ left: '50%', top: '60%' }}></div>
                            <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ left: '75%', top: '35%' }}></div>
                            <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ left: '100%', top: '20%' }}></div>
                        </div>
                    </div>
                    <div className="absolute left-12 right-0 bottom-0 flex justify-between text-xs font-medium text-gray-400">
                        <span>Dec 07</span>
                        <span>Dec 08</span>
                        <span>Dec 09</span>
                        <span>Dec 11</span>
                        <span>Dec 12</span>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 px-1">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <button className="flex flex-col items-center justify-center p-8 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-primary">shopping_cart</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">New Sale</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-8 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-green-500">add_circle</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Add Product</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-8 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-purple-500">assessment</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Generate Report</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-8 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl text-yellow-500">notifications</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">View Alerts</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Recent Sales</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="w-full">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">$337.99</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">1x Amoxicillin 250mg, 1x Anas test, 10x ALGIN, 1x Amoxicillin 250mg</p>
                                    <div className="flex items-center mt-3 text-xs text-gray-400 font-medium">
                                        <span className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">person</span> Admin User</span>
                                        <span className="mx-2 text-gray-300">•</span>
                                        <span className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">schedule</span> 12/12/2025 17:16:58</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Repeated items omitted for brevity, but I will include them to match 'all' request */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="w-full">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">$257.99</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">1x Amoxicillin 250mg, 1x Anas test, 2x ALGIN, 1x Amoxicillin 250mg</p>
                                    <div className="flex items-center mt-3 text-xs text-gray-400 font-medium">
                                        <span className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">person</span> Admin User</span>
                                        <span className="mx-2 text-gray-300">•</span>
                                        <span className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">schedule</span> 12/12/2025 17:16:22</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="w-full">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">$237.99</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">1x Amoxicillin 250mg, 1x Amoxicillin 250mg, 1x Anas test</p>
                                    <div className="flex items-center mt-3 text-xs text-gray-400 font-medium">
                                        <span className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">person</span> Admin User</span>
                                        <span className="mx-2 text-gray-300">•</span>
                                        <span className="flex items-center"><span className="material-symbols-outlined text-sm mr-1">schedule</span> 12/12/2025 01:10:48</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Inventory Alerts</h3>
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/20">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-sm mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600">inventory</span>
                        </div>
                        <p className="text-sm font-medium mb-1">No new alerts available</p>
                        <p className="text-xs text-gray-400">Inventory levels are looking good.</p>
                    </div>
                </div>
            </div>
            <div className="h-8"></div>
        </>
    );
};

export default OverviewDashboard;
