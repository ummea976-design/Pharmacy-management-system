import React from 'react';

const UserProfile = () => {
    return (
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 relative w-full">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your personal information</p>
                </div>
                <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 transition-colors duration-200">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">Name</label>
                            <div className="mt-2">
                                <input className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors" id="name" name="name" type="text" defaultValue="Admin User" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
                            <div className="mt-2">
                                <input className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors" id="email" name="email" type="email" defaultValue="admin@pharmacy.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                                New Password <span className="text-gray-500 font-normal dark:text-gray-400">(leave blank to keep current)</span>
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors" id="password" name="password" placeholder="" type="password" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-primary dark:hover:bg-blue-700 dark:focus:ring-blue-500 transition-colors duration-200" type="submit">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
