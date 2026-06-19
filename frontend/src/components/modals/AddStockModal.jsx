import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';

const AddStockModal = ({ onClose, onStockAdded }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantityToAdd, setQuantityToAdd] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Additional fields even if not all used by backend immediately, good to have in UI state
    const [batchNumber, setBatchNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [notes, setNotes] = useState('');
    const [supplierInvoice, setSupplierInvoice] = useState('');

    const searchRef = useRef(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                searchProducts();
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const searchProducts = async () => {
        try {
            const { data } = await api.get('/products', {
                params: { search: searchTerm, limit: 5 }
            });
            if (data.success) {
                setSearchResults(data.data);
            }
        } catch (err) {
            console.error('Error searching products', err);
        }
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setSearchTerm(product.name);
        setSearchResults([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProduct) {
            setError('Please select a product');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Create Stock Entry
            const payload = {
                product: selectedProduct._id,
                quantity: parseInt(quantityToAdd, 10),
                batchNumber: batchNumber,
                expiryDate: expiryDate,
                supplierInvoice: supplierInvoice,
                notes: notes
                // supplier field could be added if we had a supplier selector
            };

            const { data } = await api.post('/stock', payload);

            if (data.success) {
                if (onStockAdded) onStockAdded(data.data);
                onClose();
            }
        } catch (err) {
            console.error('Error adding stock', err);
            setError(err.response?.data?.error?.message || 'Failed to add stock');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Add Inventory</h3>
                        <p className="text-xs text-gray-500">Update stock levels for existing products</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1 relative" ref={searchRef}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search Product <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400 font-bold">
                                    <span className="material-symbols-outlined text-lg">search</span>
                                </span>
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full pl-10 pr-3 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white shadow-sm"
                                    placeholder="Scan barcode or type name..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setSelectedProduct(null); // Clear selection on type
                                    }}
                                />
                            </div>
                            {/* Dropdown results */}
                            {searchResults.length > 0 && !selectedProduct && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {searchResults.map(product => (
                                        <div
                                            key={product._id}
                                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center bg-white dark:bg-gray-800"
                                            onClick={() => handleSelectProduct(product)}
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                                                <div className="text-xs text-gray-500">{product.sku}</div>
                                            </div>
                                            <div className="text-xs text-gray-400">Current: {product.quantity}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedProduct && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 text-sm mb-4">
                                <p><strong>Selected:</strong> {selectedProduct.name}</p>
                                <p><strong>Current Stock:</strong> {selectedProduct.quantity}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity to Add <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                                    placeholder="0"
                                    value={quantityToAdd}
                                    onChange={(e) => setQuantityToAdd(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Supplier Invoice #</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                                    value={supplierInvoice}
                                    onChange={(e) => setSupplierInvoice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Batch Number</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                                    value={batchNumber}
                                    onChange={(e) => setBatchNumber(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                            <textarea
                                rows="2"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                                placeholder="Optional notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-slate-700">
                            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Saving...' : 'Confirm & Add Stock'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStockModal;
