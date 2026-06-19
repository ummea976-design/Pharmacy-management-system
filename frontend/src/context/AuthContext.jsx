import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token && storedUser !== 'undefined') {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse stored user', e);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        } else {
            localStorage.removeItem('user'); // Cleanup if invalid
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            console.log('AuthContext: Attempting login for', email);
            const response = await api.post('/auth/login', { email, password });
            const responseData = response.data;
            console.log('AuthContext: Login successful', responseData);

            if (!responseData.success || !responseData.data || !responseData.data.token || !responseData.data.user) {
                console.error('AuthContext: Invalid response structure', responseData);
                return { success: false, message: 'Invalid server response' };
            }

            const { token, user } = responseData.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return { success: true };
        } catch (error) {
            console.error('AuthContext: Login error', error);
            const message = error.response?.data?.message || error.message || 'Login failed';
            return {
                success: false,
                message: message
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
