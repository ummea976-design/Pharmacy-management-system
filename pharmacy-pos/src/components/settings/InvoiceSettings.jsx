import React from 'react';

const InvoiceSettings = () => {
    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">receipt_long</span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice Configuration</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Customize the appearance and content of your sales receipts</p>
                </div>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white">Pharmacy Logo</label>
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg px-6 py-8 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">image</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload logo</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                             <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="headerText">Header Text</label>
                             <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="headerText" name="headerText" type="text" placeholder="e.g. Thank you for shopping with us!" />
                        </div>
                        <div className="space-y-1">
                             <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="footerText">Footer Text</label>
                             <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="footerText" name="footerText" type="text" placeholder="e.g. No returns on opened items." />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Tax Configuration</h4>
                         <div className="flex items-center gap-2">
                             <input type="checkbox" id="enableTax" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                             <label htmlFor="enableTax" className="text-sm text-gray-700 dark:text-gray-300">Enable Tax Calculation</label>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="taxName">Tax Name</label>
                                <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="taxName" name="taxName" type="text" defaultValue="VAT" />
                             </div>
                             <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="taxRate">Tax Rate (%)</label>
                                <input className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1" id="taxRate" name="taxRate" type="number" step="0.01" defaultValue="5.00" />
                             </div>
                         </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-slate-700 flex items-center justify-end gap-3">
                    <button className="px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors" type="button">
                        Reset to Default
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors" type="submit">
                        <span className="material-symbols-outlined text-sm">save</span>
                        Save Configuration
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceSettings;
