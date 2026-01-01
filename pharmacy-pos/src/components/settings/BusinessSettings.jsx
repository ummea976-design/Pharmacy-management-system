import React from 'react';

const BusinessSettings = () => {
    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-xl">store</span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Business Settings</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Configure your pharmacy business details and contact information</p>
                </div>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="pharmacyName">Pharmacy Name</label>
                        <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="pharmacyName" name="pharmacyName" type="text" defaultValue="Pharmacy MS" />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email Address</label>
                        <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="email" name="email" type="email" defaultValue="skpharma57@gmail.com" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="address">Address</label>
                    <textarea className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1 resize-y" id="address" name="address" rows="3" defaultValue="pk kochukhet bazar"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="phone">Phone Number</label>
                        <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="phone" name="phone" type="tel" defaultValue="01676985386" />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="regNum">Registration Number</label>
                        <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="regNum" name="regNum" type="text" defaultValue="01264598753" />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="taxId">Tax ID</label>
                        <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1 placeholder-gray-500 dark:placeholder-gray-400" id="taxId" name="taxId" placeholder="Optional" type="text" />
                    </div>
                </div>
                <div className="pt-6 border-t border-gray-200 dark:border-slate-700 flex items-center justify-end gap-3">
                    <button className="px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors" type="button">
                        Reset to Default
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors" type="submit">
                        <span className="material-symbols-outlined text-sm">save</span>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BusinessSettings;
