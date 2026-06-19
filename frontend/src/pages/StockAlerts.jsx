import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';


const StockAlerts = () => {
    const [alerts, setAlerts] = useState({ lowStock: [], expiringSoon: [], outOfStock: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('lowStock'); // lowStock, expiringSoon, outOfStock
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/stock/alerts');
            if (data.success) {
                // Flatten expiring soon for table display
                const flatExpiring = data.data.expiringSoon.flatMap(p =>
                    p.entries.map((e, idx) => ({
                        ...e,
                        productName: p.productName,
                        sku: p.sku,
                        reorderLevel: p.reorderLevel, // If available
                        _id: (p.product || p._id) + '_' + idx
                    }))
                );

                setAlerts({
                    lowStock: data.data.lowStock,
                    outOfStock: data.data.outOfStock,
                    expiringSoon: flatExpiring
                });
            }
        } catch (error) {
            console.error('Error fetching alerts', error);
        } finally {
            setLoading(false);
        }
    };

    const getActiveList = () => {
        let list = alerts[activeTab] || [];
        if (search) {
            const term = search.toLowerCase();
            list = list.filter(item =>
                (item.productName?.toLowerCase().includes(term)) ||
                (item.sku?.toLowerCase().includes(term)) ||
                (item.product?.name?.toLowerCase().includes(term)) ||
                (item.product?.sku?.toLowerCase().includes(term))
            );
        }
        return list;
    };

    const displayList = getActiveList();

    return (
        <div className="flex-1 overflow-y-auto w-full">
            <div className="max-w-7xl mx-auto p-6 transition-colors duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <PageHeader title="Stock Alerts" subtitle="Monitor inventory status and take action" />
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-lg">search</span>
                        </span>
                        <input
                            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-700 rounded-md bg-white dark:bg-card-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary w-64 text-sm"
                            placeholder="Search alerts..."
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div
                        onClick={() => setActiveTab('lowStock')}
                        className={`bg-white dark:bg-card-dark border ${activeTab === 'lowStock' ? 'border-yellow-500 ring-1 ring-yellow-500' : 'border-gray-200 dark:border-slate-700'} rounded-lg p-5 shadow-sm hover:shadow-md transition-all cursor-pointer`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Low Stock Items</h3>
                                <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{alerts.lowStock.length}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Items below reorder level</p>
                            </div>
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                                <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">inventory_2</span>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => setActiveTab('expiringSoon')}
                        className={`bg-white dark:bg-card-dark border ${activeTab === 'expiringSoon' ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200 dark:border-slate-700'} rounded-lg p-5 shadow-sm hover:shadow-md transition-all cursor-pointer`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Expiring Soon</h3>
                                <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{alerts.expiringSoon.length}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Items expiring within 90 days</p>
                            </div>
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">schedule</span>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => setActiveTab('outOfStock')}
                        className={`bg-white dark:bg-card-dark border ${activeTab === 'outOfStock' ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-slate-700'} rounded-lg p-5 shadow-sm hover:shadow-md transition-all cursor-pointer`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Out of Stock</h3>
                                <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{alerts.outOfStock.length}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Items with zero quantity</p>
                            </div>
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                                <span className="material-symbols-outlined text-red-600 dark:text-red-400">remove_shopping_cart</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <Thead>
                                    <Th>Product</Th>
                                    <Th>SKU</Th>
                                    <Th>Qty</Th>
                                    <Th>Reorder Level</Th>
                                    <Th>Expiry</Th>
                                </Thead>
                                <Tbody>
                                    {displayList.length === 0 ? (
                                        <Tr>
                                            <Td colSpan="5" className="text-center py-8 text-gray-500">No alerts found for this category</Td>
                                        </Tr>
                                    ) : (
                                        displayList.map((item, idx) => (
                                            <Tr key={item._id || idx}>
                                                <Td>
                                                    <div className="font-medium text-gray-900 dark:text-white">{item.productName || item.product?.name}</div>
                                                </Td>
                                                <Td>{item.sku || item.product?.sku}</Td>
                                                <Td>
                                                    <span className={`font-bold ${item.quantity === 0 ? 'text-red-600' : 'text-yellow-600'}`}>
                                                        {item.quantity}
                                                    </span>
                                                </Td>
                                                <Td>{item.reorderLevel !== undefined ? item.reorderLevel : item.product?.reorderLevel}</Td>
                                                <Td>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : '-'}</Td>
                                            </Tr>
                                        ))
                                    )}
                                </Tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StockAlerts;
