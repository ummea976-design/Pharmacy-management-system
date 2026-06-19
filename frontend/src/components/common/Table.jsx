import React from 'react';

export const Table = ({ children }) => (
    <div className="overflow-x-auto custom-scrollbar flex-1">
        <table className="w-full text-left border-collapse">
            {children}
        </table>
    </div>
);

export const Thead = ({ children }) => (
    <thead>
        <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {children}
        </tr>
    </thead>
);

export const Tbody = ({ children }) => (
    <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
        {children}
    </tbody>
);

export const Tr = ({ children, className = '' }) => (
    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${className}`}>
        {children}
    </tr>
);

export const Th = ({ children, className = '' }) => (
    <th className={`px-6 py-3 ${className}`}>
        {children}
    </th>
);

export const Td = ({ children, className = '' }) => (
    <td className={`px-6 py-4 ${className}`}>
        {children}
    </td>
);
