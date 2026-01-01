import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
    { name: 'Overview', icon: 'dashboard', path: '/' },
    { name: 'Point of Sale', icon: 'shopping_cart', path: '/pos' },
    { name: 'Customer', icon: 'people', path: '/customers' },
    { name: 'Stock Management', icon: 'inventory', path: '/stock' },
    { name: 'Suppliers', icon: 'local_shipping', path: '/suppliers' },
    { name: 'Product Catalog', icon: 'category', path: '/products' },
    { name: 'Stock Alerts', icon: 'notifications_active', path: '/alerts' },

    { name: 'Analytics & Reports', icon: 'analytics', path: '/reports' },
    { name: 'Transaction History', icon: 'history', path: '/transactions' },

    { name: 'User Profile', icon: 'person', path: '/profile' },
    { name: 'System Settings', icon: 'settings', path: '/settings' },
];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-card-dark border-r border-gray-200 dark:border-slate-700 flex flex-col hidden md:flex h-full fixed top-0 left-0 z-20 overflow-y-auto scrollbar-hide transition-all duration-200`}>
            <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-6'} border-b border-gray-100 dark:border-slate-700/50`}>
                {!isCollapsed && <span className="text-blue-600 font-bold text-lg whitespace-nowrap">Pharmacy MS</span>}
                <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
                    <span className="material-symbols-outlined text-xl">{isCollapsed ? 'arrow_forward' : 'arrow_back'}</span>
                </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        title={isCollapsed ? item.name : ''}
                        className={({ isActive }) =>
                            `flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2.5 text-sm font-medium rounded-lg group transition-colors ${isActive
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                            }`
                        }
                    >
                        <span className={`material-symbols-outlined text-xl ${isCollapsed ? '' : 'mr-3'} ${
                            ({ isActive }) => isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary dark:text-gray-500 dark:group-hover:text-white'
                        }`}>{item.icon}</span>
                        {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-100 dark:border-slate-700/50">
                <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 group transition-colors`} title={isCollapsed ? "Sign Out" : ""}>
                    <span className={`material-symbols-outlined ${isCollapsed ? '' : 'mr-3'} text-gray-400 group-hover:text-red-500 dark:text-gray-500 dark:group-hover:text-red-400`}>logout</span>
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Sign Out</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
