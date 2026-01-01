import React from 'react';

const Login = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display h-screen flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative bg-background-light dark:bg-background-dark transition-colors duration-300">
                <button // Note: Dark mode toggle logic would be handled by a context/state in a real app, keeping it simple here or handled by Layout if wrapped
                    className="absolute top-6 right-6 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => document.documentElement.classList.toggle('dark')}
                >
                    <span className="material-symbols-outlined dark:hidden">dark_mode</span>
                    <span className="material-symbols-outlined hidden dark:block">light_mode</span>
                </button>
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900 text-primary mb-6 relative">
                            <span className="material-symbols-outlined text-4xl">medical_services</span>
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500"></span>
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">PharmacyMS</h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Sign in to your pharmacy management system</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1" htmlFor="email-address">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400 text-sm">email</span>
                                    </div>
                                    <input autoComplete="email" className="appearance-none relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white dark:bg-gray-800" id="email-address" name="email" placeholder="admin@pharmacy.com" required type="email" defaultValue="admin@pharmacy.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1" htmlFor="password">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400 text-sm">lock</span>
                                    </div>
                                    <input autoComplete="current-password" className="appearance-none relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-white dark:bg-gray-800" id="password" name="password" placeholder="••••••••" required type="password" defaultValue="password123" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-lg shadow-blue-500/30" type="submit">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <a className="font-medium text-primary hover:text-blue-700 flex items-center justify-center gap-2 text-sm" href="#">
                            <span className="material-symbols-outlined text-base">description</span>
                            View Documentation
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 opacity-100"></div>
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="relative z-10 max-w-lg w-full">
                    <h2 className="text-4xl font-bold text-white mb-10 leading-tight">Modern Pharmacy <br />Management</h2>
                    <div className="space-y-4">

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 border border-white/10 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 cursor-default">
                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-500/30 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">inventory_2</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Inventory Management</h3>
                                <p className="text-blue-100 text-sm leading-relaxed">Track and manage your pharmacy inventory efficiently</p>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 border border-white/10 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 cursor-default">
                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-500/30 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">point_of_sale</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Sales & Billing</h3>
                                <p className="text-blue-100 text-sm leading-relaxed">Process sales and generate professional invoices</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
