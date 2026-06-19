import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        try {
            const { data } = await api.put('/auth/updatedetails', formData);
            if (data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully' });
                // Update local storage
                const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
                const newUser = { ...currentUser, ...data.data };
                localStorage.setItem('user', JSON.stringify(newUser));
                // Note: AuthContext might need a refresh capability to reflect changes immediately without reload
            }
        } catch (error) {
            console.error('Update error', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.error?.message || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 relative w-full">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your personal information</p>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                        {message.text}
                    </div>
                )}

                <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 transition-colors duration-200">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">Name</label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                                New Password <span className="text-gray-500 font-normal dark:text-gray-400">(leave blank to keep current)</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                                    id="password"
                                    name="password"
                                    placeholder=""
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-primary dark:hover:bg-blue-700 dark:focus:ring-blue-500 transition-colors duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                type="submit"
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
