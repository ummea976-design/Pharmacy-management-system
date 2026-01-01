import React, { useState } from 'react';
import BusinessSettings from '../components/settings/BusinessSettings';
import LocalizationSettings from '../components/settings/LocalizationSettings';
import InvoiceSettings from '../components/settings/InvoiceSettings';
import PageHeader from '../components/common/PageHeader';

const SystemSettings = () => {
    const [activeTab, setActiveTab] = useState('business');

    return (
        <div className="flex-1 p-8 h-full overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <PageHeader 
                    title="System Settings" 
                    subtitle="Manage your pharmacy system settings and preferences" 
                />
                <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-slate-700 px-6 pt-4">
                        <div className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab('business')}
                                className={`group inline-flex items-center py-4 px-1 border-b-2 text-sm font-medium transition-all ${activeTab === 'business' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'}`}
                            >
                                <span className="material-symbols-outlined mr-2 text-lg">storefront</span>
                                Business
                            </button>
                            <button
                                onClick={() => setActiveTab('localization')}
                                className={`group inline-flex items-center py-4 px-1 border-b-2 text-sm font-medium transition-all ${activeTab === 'localization' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'}`}
                            >
                                <span className="material-symbols-outlined mr-2 text-lg">language</span>
                                Localization
                            </button>
                            <button
                                onClick={() => setActiveTab('invoice')}
                                className={`group inline-flex items-center py-4 px-1 border-b-2 text-sm font-medium transition-all ${activeTab === 'invoice' ? 'border-primary text-primary' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'}`}
                            >
                                <span className="material-symbols-outlined mr-2 text-lg">receipt_long</span>
                                Invoice
                            </button>
                        </div>
                    </div>
                    <div className="p-6 md:p-8">
                        {activeTab === 'business' && <BusinessSettings />}
                        {activeTab === 'localization' && <LocalizationSettings />}
                        {activeTab === 'invoice' && <InvoiceSettings />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
