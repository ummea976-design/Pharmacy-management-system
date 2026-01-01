import React, { useState } from 'react';

const AddCustomerModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Register New Customer</h3>
                        <p className="text-xs text-gray-500">Create a profile for a customer</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-5">
                         <div className="space-y-1">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Name <span className="text-red-500">*</span></label>
                             <input required type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="Full name" />
                         </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number <span className="text-red-500">*</span></label>
                                <input required type="tel" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="+1..." />
                            </div>
                             <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <input type="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="Optional" />
                            </div>
                        </div>

                         <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                            <textarea rows="2" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="Full address..."></textarea>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Private Notes</label>
                            <textarea rows="2" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="Allergies, preferences, etc..."></textarea>
                        </div>
                        
                        <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-slate-700">
                             <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                             <button type="submit" className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors">Save Customer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCustomerModal;
