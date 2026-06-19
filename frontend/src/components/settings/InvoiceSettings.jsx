import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const InvoiceSettings = () => {
    const [formData, setFormData] = useState({
        headerText: '',
        footerText: '',
        enableTax: false,
        taxName: 'VAT',
        taxRate: 5.0,
        logoUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await api.get('/settings/invoice');
            if (data.success && data.data) {
                setFormData({
                    headerText: data.data.headerText || '',
                    footerText: data.data.footerText || '',
                    enableTax: data.data.enableTax || false,
                    taxName: data.data.taxName || 'VAT',
                    taxRate: data.data.taxRate || 0,
                    logoUrl: data.data.logoUrl || ''
                });
            }
        } catch (error) {
            console.error('Error fetching settings', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const { data } = await api.put('/settings/invoice', formData);
            if (data.success) {
                setMessage({ type: 'success', text: 'Configuration saved successfully' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save configuration' });
        } finally {
            setSaving(false);
        }
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('logo', file);

        try {
            const { data } = await api.post('/settings/invoice/logo', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (data.success) {
                setFormData(prev => ({ ...prev, logoUrl: data.data.logoUrl }));
                setMessage({ type: 'success', text: 'Logo uploaded successfully' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to upload logo' });
        }
    };

    if (loading) return <div className="p-8 text-center">Loading settings...</div>;

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

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {message.text}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white">Pharmacy Logo</label>
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg px-6 py-8 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer relative">
                            <div className="text-center">
                                {formData.logoUrl ? (
                                    <div className="mb-2">
                                        <img src={`http://localhost:3000${formData.logoUrl}`} alt="Logo" className="h-16 mx-auto object-contain" />
                                        <p className="text-xs text-green-600 mt-1">Current Logo</p>
                                    </div>
                                ) : (
                                    <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">image</span>
                                )}
                                <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload logo</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                            </div>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleLogoUpload} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="headerText">Header Text</label>
                            <input
                                className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1"
                                id="headerText"
                                name="headerText"
                                type="text"
                                placeholder="e.g. Thank you for shopping with us!"
                                value={formData.headerText}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="footerText">Footer Text</label>
                            <input
                                className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1"
                                id="footerText"
                                name="footerText"
                                type="text"
                                placeholder="e.g. No returns on opened items."
                                value={formData.footerText}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Tax Configuration</h4>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="enableTax"
                                name="enableTax"
                                className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                checked={formData.enableTax}
                                onChange={handleChange}
                            />
                            <label htmlFor="enableTax" className="text-sm text-gray-700 dark:text-gray-300">Enable Tax Calculation</label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="taxName">Tax Name</label>
                                <input
                                    className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1"
                                    id="taxName"
                                    name="taxName"
                                    type="text"
                                    value={formData.taxName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="taxRate">Tax Rate (%)</label>
                                <input
                                    className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1"
                                    id="taxRate"
                                    name="taxRate"
                                    type="number"
                                    step="0.01"
                                    value={formData.taxRate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-slate-700 flex items-center justify-end gap-3">
                    <button
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70"
                        type="submit"
                    >
                        {saving ? (
                            <>Processing...</>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-sm">save</span>
                                Save Configuration
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceSettings;
