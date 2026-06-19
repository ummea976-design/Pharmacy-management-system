import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const BusinessSettings = () => {
    const [formData, setFormData] = useState({
        pharmacyName: '',
        email: '',
        address: '',
        phone: '',
        registrationNumber: '',
        taxId: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await api.get('/settings/business');
            if (data.success && data.data) {
                setFormData({
                    pharmacyName: data.data.pharmacyName || '',
                    email: data.data.email || '',
                    address: data.data.address || '',
                    phone: data.data.phone || '',
                    registrationNumber: data.data.registrationNumber || '',
                    taxId: data.data.taxId || ''
                });
            }
        } catch (error) {
            console.error('Error fetching settings', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const { data } = await api.put('/settings/business', formData);
            if (data.success) {
                setMessage({ type: 'success', text: 'Settings saved successfully' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save settings' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading settings...</div>;

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

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {message.text}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="pharmacyName">Pharmacy Name</label>
                        <input
                            className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1"
                            id="pharmacyName"
                            name="pharmacyName"
                            type="text"
                            value={formData.pharmacyName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email Address</label>
                        <input
                            className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1"
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="address">Address</label>
                    <textarea
                        className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1 resize-y"
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="phone">Phone Number</label>
                        <input
                            className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1"
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="registrationNumber">Registration Number</label>
                        <input
                            className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1"
                            id="registrationNumber"
                            name="registrationNumber"
                            type="text"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="taxId">Tax ID</label>
                    <input
                        className="block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2.5 outline-none border transition-colors focus:ring-1 placeholder-gray-500 dark:placeholder-gray-400"
                        id="taxId"
                        name="taxId"
                        placeholder="Optional"
                        type="text"
                        value={formData.taxId}
                        onChange={handleChange}
                    />
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
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BusinessSettings;
