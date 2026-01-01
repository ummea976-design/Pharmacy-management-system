import React from 'react';

const LocalizationSettings = () => {
    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-xl">language</span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Localization</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Set your language, currency, and time zone preferences</p>
                </div>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="language">System Language</label>
                        <select className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="language" name="language" defaultValue="en">
                            <option value="en">English (US)</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="ar">Arabic</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="currency">Currency</label>
                        <select className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="currency" name="currency" defaultValue="usd">
                            <option value="usd">USD ($)</option>
                            <option value="eur">EUR (€)</option>
                            <option value="gbp">GBP (£)</option>
                            <option value="inr">INR (₹)</option>
                            <option value="bdt">BDT (৳)</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="timezone">Time Zone</label>
                        <select className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="timezone" name="timezone" defaultValue="utc">
                            <option value="utc">UTC (Coordinated Universal Time)</option>
                            <option value="est">EST (Eastern Standard Time)</option>
                            <option value="pst">PST (Pacific Standard Time)</option>
                            <option value="ist">IST (Indian Standard Time)</option>
                            <option value="bst">BST (Bangladesh Standard Time)</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="dateFormat">Date Format</label>
                        <select className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="dateFormat" name="dateFormat" defaultValue="mdy">
                            <option value="mdy">MM/DD/YYYY</option>
                            <option value="dmy">DD/MM/YYYY</option>
                            <option value="ymd">YYYY-MM-DD</option>
                        </select>
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

export default LocalizationSettings;
