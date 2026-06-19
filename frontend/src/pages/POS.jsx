import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { playSuccessSound, playErrorSound } from '../utils/sound';

const POS = () => {
    const { user } = useAuth();
    // State Management
    const [shiftActive, setShiftActive] = useState(() => {
        return localStorage.getItem('pos_shift_active') === 'true';
    });
    const [activeModal, setActiveModal] = useState(null); // 'shortcuts', 'prescription', 'shift'
    const [toast, setToast] = useState(null);

    // ... (rest of code) ...

    const [selectedCartItem, setSelectedCartItem] = useState(null);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Cash');

    // Customer State
    const [customerSearch, setCustomerSearch] = useState('');
    const [customers, setCustomers] = useState([]);
    const [showCustomerList, setShowCustomerList] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const searchInputRef = useRef(null);

    useEffect(() => {
        // Focus search on mount
        if (searchInputRef.current) searchInputRef.current.focus();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Debounce Customer Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (customerSearch && !selectedCustomer) {
                fetchCustomers(customerSearch);
            } else if (!customerSearch) {
                setCustomers([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [customerSearch, selectedCustomer]);

    const fetchCustomers = async (term) => {
        try {
            const { data } = await api.get('/customers', { params: { search: term, limit: 5 } });
            if (data.success) {
                setCustomers(data.data);
                setShowCustomerList(true);
            }
        } catch (error) {
            console.error('Error fetching customers', error);
        }
    };

    const selectCustomer = (customer) => {
        setSelectedCustomer(customer);
        setCustomerSearch(customer.name);
        setShowCustomerList(false);
        showToast(`Customer linked: ${customer.name}`);
    };

    const clearCustomer = () => {
        setSelectedCustomer(null);
        setCustomerSearch('');
        setCustomers([]);
    };

    const fetchProducts = async (term) => {
        try {
            setLoadingProducts(true);
            const params = { limit: 10 };
            if (term) params.search = term;

            const { data } = await api.get('/products', { params });
            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error('Error fetching products', error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, discount: 0 }];
        });
        playSuccessSound();
        showToast(`Added ${product.name} to cart`);
        setSearchTerm(''); // Clear search after adding
        if (searchInputRef.current) searchInputRef.current.focus();
    };

    const updateCartItem = (id, change) => {
        setCart(prev => prev.map(item => {
            if (item._id === id) {
                const newQty = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item._id !== id));
    };

    const clearCart = () => {
        if (window.confirm('Clear current cart?')) {
            setCart([]);
        }
    };

    const calculateTotals = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0);
        const tax = cart.reduce((sum, item) => sum + ((item.sellingPrice * item.quantity) * (item.taxRate || 0) / 100), 0);
        return {
            subtotal,
            tax,
            total: subtotal + tax
        };
    };

    const { subtotal, tax, total } = calculateTotals();

    const handlePrint = (saleId) => {
        window.open(`/print/receipt/${saleId}`, '_blank', 'width=350,height=600');
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        try {
            const saleData = {
                items: cart.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                    unitPrice: item.sellingPrice,
                    totalPrice: item.sellingPrice * item.quantity
                })),
                totalAmount: total,
                total: total,
                paymentMethod: paymentMethod,
                status: 'completed',
                discount: 0,
                tax: tax,
                customer: selectedCustomer?._id || null
            };

            const { data } = await api.post('/sales', saleData);

            if (data.success) {
                playSuccessSound();
                showToast('Sale completed successfully!');
                handlePrint(data.data._id);
                setCart([]);
            }
        } catch (error) {
            console.error('Checkout error', error);
            playErrorSound();
            showToast(error.response?.data?.error?.message || 'Failed to process sale', 'error');
        }
    };

    // Quick Actions - Categories (Mock)
    const quickActions = ['Medicine', 'Antibiotics', 'Vitamins', 'Pain Relief'];
    const filterByCategory = (cat) => {
        // Implement category filter
    };

    // Helper Functions
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleShiftToggle = () => {
        if (!shiftActive) {
            setActiveModal('shift');
        } else {
            if (window.confirm('Close current shift?')) { // Simple confirmation for now
                setShiftActive(false);
                localStorage.setItem('pos_shift_active', 'false');
                showToast('Shift closed successfully');
            }
        }
    };

    // Components
    const Toast = () => (
        toast ? (
            <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium z-50 animate-fade-in-up ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>
                {toast.message}
            </div>
        ) : null
    );

    const ModalOverlay = ({ children, title, onClose }) => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <Toast />

            <div className="p-6 h-full flex flex-col">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Point of Sale</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Register #1 • {shiftActive ? <span className="text-green-600 font-medium">Shift Open</span> : <span className="text-red-500 font-medium">Shift Closed</span>}</p>
                    </div>
                    <button
                        onClick={handleShiftToggle}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2 ${shiftActive ? 'bg-white border-red-200 text-red-600 hover:bg-red-50' : 'bg-green-600 text-white hover:bg-green-700 border-transparent'}`}
                    >
                        <span className="material-symbols-outlined text-lg">{shiftActive ? 'lock' : 'lock_open'}</span>
                        {shiftActive ? 'Close Shift' : 'Open Shift'}
                    </button>
                </div>

                <div className="flex-1 flex gap-6 min-h-0 bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                    {/* Left: Cart Section */}
                    <div className="w-7/12 flex flex-col border-r border-gray-200 dark:border-slate-700">
                        {/* Customer Search */}
                        {/* Customer Search */}
                        <div className="p-4 border-b border-gray-200 dark:border-slate-700 z-20 relative">
                            <div className="relative">
                                <span className={`material-symbols-outlined absolute left-3 top-2.5 ${selectedCustomer ? 'text-green-600' : 'text-gray-400'}`}>
                                    {selectedCustomer ? 'how_to_reg' : 'person_search'}
                                </span>
                                <input
                                    className={`w-full pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-800 border rounded-lg text-sm focus:ring-2 focus:ring-primary dark:text-white transition-colors ${selectedCustomer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-transparent'}`}
                                    placeholder={selectedCustomer ? "Customer Linked" : "Search customer (Name/Phone)..."}
                                    type="text"
                                    value={customerSearch}
                                    onChange={(e) => {
                                        setCustomerSearch(e.target.value);
                                        if (selectedCustomer) setSelectedCustomer(null); // Reset on edit
                                    }}
                                    onFocus={() => {
                                        if (customers.length > 0) setShowCustomerList(true);
                                    }}
                                />
                                {selectedCustomer ? (
                                    <button onClick={clearCustomer} className="absolute right-2 top-1.5 p-1 text-gray-400 hover:text-red-500">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                ) : (
                                    <button className="absolute right-2 top-1.5 p-1 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-slate-600 shadow-sm text-gray-500 hover:text-primary">
                                        <span className="material-symbols-outlined text-lg">add</span>
                                    </button>
                                )}

                                {/* Customer Dropdown */}
                                {showCustomerList && customers.length > 0 && !selectedCustomer && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-30 max-h-60 overflow-y-auto">
                                        {customers.map(c => (
                                            <div
                                                key={c._id}
                                                onClick={() => selectCustomer(c)}
                                                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-slate-700 last:border-0"
                                            >
                                                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">{c.name}</div>
                                                <div className="text-xs text-gray-500 flex gap-2">
                                                    <span>{c.phone}</span>
                                                    {c.email && <span>• {c.email}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart Header */}
                        <div className="px-5 py-3 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-slate-700">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Cart Items <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs ml-2">{cart.length}</span></h3>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 text-gray-500 hover:text-amber-600 rounded hover:bg-amber-50" title="Hold Cart">
                                    <span className="material-symbols-outlined text-lg">pause_circle</span>
                                </button>
                                <button onClick={clearCart} className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-red-50" title="Clear Cart">
                                    <span className="material-symbols-outlined text-lg">delete_sweep</span>
                                </button>
                            </div>
                        </div>

                        {/* Cart List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-900">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">shopping_cart_off</span>
                                    <p>Cart is empty</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item._id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-slate-800 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all group bg-white dark:bg-card-dark">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{item.name}</span>
                                                {item.requiresPrescription && (
                                                    <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Rx</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                                                <span>{item.sku}</span>
                                                {item.requiresPrescription && (
                                                    <button
                                                        onClick={() => { setSelectedCartItem(item); setActiveModal('prescription'); }}
                                                        className="text-blue-500 hover:text-blue-700 underline decoration-dotted"
                                                    >
                                                        Add Rx Details
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="font-medium text-gray-800 dark:text-gray-200 text-sm w-16 text-right">${item.sellingPrice.toFixed(2)}</div>
                                            <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-gray-800 h-8">
                                                <button onClick={() => updateCartItem(item._id, -1)} className="px-2 h-full text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors"><span className="material-symbols-outlined text-sm">remove</span></button>
                                                <span className="px-2 text-sm font-semibold w-8 text-center text-gray-800 dark:text-gray-200">{item.quantity}</span>
                                                <button onClick={() => updateCartItem(item._id, 1)} className="px-2 h-full text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"><span className="material-symbols-outlined text-sm">add</span></button>
                                            </div>
                                            <div className="font-bold text-gray-900 dark:text-white w-16 text-right">${(item.sellingPrice * item.quantity).toFixed(2)}</div>
                                            <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"><span className="material-symbols-outlined text-lg">close</span></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Payment Footer */}
                        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-card-dark shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                                {['Cash', 'Card', 'Mobile', 'Insurance'].map(method => (
                                    <button
                                        key={method}
                                        onClick={() => setPaymentMethod(method)}
                                        className={`shrink-0 px-4 py-2 border rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${paymentMethod === method ? 'border-primary text-primary bg-primary/5' : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:border-primary hover:text-primary'}`}
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {method === 'Cash' ? 'payments' : method === 'Card' ? 'credit_card' : method === 'Mobile' ? 'smartphone' : 'health_and_safety'}
                                        </span>
                                        {method}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between items-end mb-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Subtotal: <span className="font-medium text-gray-800 dark:text-gray-200">${subtotal.toFixed(2)}</span><br />
                                    Tax: <span className="font-medium text-gray-800 dark:text-gray-200">${tax.toFixed(2)}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Total Amount</span>
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className={`w-full py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${cart.length === 0 ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-white shadow-blue-500/20 active:scale-[0.99]'}`}
                            >
                                Pay & Print <span className="material-symbols-outlined">print</span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Products Section */}
                    <div className="w-5/12 flex flex-col bg-gray-50 dark:bg-gray-900/50">
                        {/* Search & Quick Actions Header */}
                        <div className="p-4 bg-white dark:bg-card-dark border-b border-gray-200 dark:border-slate-700 shadow-sm z-10">
                            <div className="relative mb-3">
                                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
                                <input
                                    ref={searchInputRef}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 border focus:border-primary rounded-lg text-sm transition-all outline-none dark:text-white"
                                    placeholder="Scan barcode or search products..."
                                />
                                <span className="absolute right-3 top-2.5 text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">F2</span>
                            </div>

                            {/* Quick Actions Panel */}
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick Categories</h4>
                                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                    {quickActions.map(action => (
                                        <button key={action} className="shrink-0 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-100 dark:border-blue-900/50">
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {loadingProducts ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {products.map(product => (
                                        <div
                                            key={product._id}
                                            onClick={() => addToCart(product)}
                                            className={`
                                                relative bg-white dark:bg-card-dark p-3 rounded-xl border shadow-sm cursor-pointer transition-all hover:shadow-md group overflow-hidden
                                                ${product.trackStock && product.stock < product.reorderLevel ? 'border-red-200 dark:border-red-900/50' : 'border-gray-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary'}
                                            `}
                                        >
                                            {/* Hover Overlay for Composition */}
                                            <div className="absolute inset-0 bg-primary/95 text-white p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center z-10 pointer-events-none">
                                                <p className="text-xs uppercase font-medium opacity-70 mb-1">Generic Name</p>
                                                <p className="font-bold text-sm">{product.genericName || '-'}</p>
                                            </div>

                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm leading-tight pr-2 line-clamp-2">{product.name}</h4>
                                                {product.requiresPrescription && (
                                                    <span className="shrink-0 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] px-1.5 py-0.5 rounded font-bold">RX</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1 mb-3">
                                                <span className="text-xs text-gray-400">{product.sku}</span>
                                                {product.trackStock && (
                                                    // Placeholder for real stock, defaulting to high number for dev
                                                    product.stock < product.reorderLevel ? (
                                                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded w-fit">
                                                            <span className="material-symbols-outlined text-[10px]">warning</span> Low Stock
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded w-fit">In Stock</span>
                                                    )
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center mt-auto">
                                                <span className="font-bold text-primary text-lg">${product.sellingPrice.toFixed(2)}</span>
                                                <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined text-lg">add</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Shortcut Button */}
            <button
                onClick={() => setActiveModal('shortcuts')}
                className="absolute bottom-6 right-6 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-transform active:scale-95 flex items-center justify-center z-20 group"
                title="Keyboard Shortcuts"
            >
                <span className="material-symbols-outlined group-hover:animate-pulse">keyboard</span>
            </button>

            {/* --- Modals --- */}

            {/* Keyboard Shortcuts Modal */}
            {activeModal === 'shortcuts' && (
                <ModalOverlay title="Keyboard Shortcuts" onClose={() => setActiveModal(null)}>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { key: 'F2', action: 'Search Prodcut' },
                            { key: 'F4', action: 'Pay / Checkout' },
                            { key: 'F9', action: 'Toggle Shift' },
                            { key: 'Esc', action: 'Clear Cart / Close' },
                            { key: 'Alt+C', action: 'Search Customer' },
                            { key: 'Alt+N', action: 'New Sale' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                <span className="font-mono text-xs font-bold bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2 py-1 rounded text-gray-700 dark:text-gray-300 shadow-sm">{item.key}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{item.action}</span>
                            </div>
                        ))}
                    </div>
                </ModalOverlay>
            )}

            {/* Prescription Details Modal */}
            {activeModal === 'prescription' && (
                <ModalOverlay title="Prescription Details" onClose={() => setActiveModal(null)}>
                    <div className="space-y-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm flex gap-2">
                            <span className="material-symbols-outlined text-lg">info</span>
                            <span>Adding details for: <strong>{selectedCartItem?.name}</strong></span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prescribing Doctor</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="Dr. Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Patient Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="Patient Name" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dosage</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="e.g. 1-0-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white" placeholder="e.g. 5 Days" />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-end gap-3">
                            <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium">Cancel</button>
                            <button onClick={() => { setActiveModal(null); showToast('Prescription Linked'); }} className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-700">Save Details</button>
                        </div>
                    </div>
                </ModalOverlay>
            )}

            {/* Shift Modal */}
            {activeModal === 'shift' && (
                <ModalOverlay title="Open Register Shift" onClose={() => setActiveModal(null)}>
                    <div className="space-y-4">
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="material-symbols-outlined text-3xl">point_of_sale</span>
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white">Register #1</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Enter opening float details</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Opening Cash Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">$</span>
                                <input type="number" className="w-full pl-6 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white font-bold text-lg" defaultValue="0.00" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes (Optional)</label>
                            <textarea className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white text-sm" rows="2" placeholder="Any initial notes..."></textarea>
                        </div>
                        <div className="pt-4">
                            <button
                                onClick={() => {
                                    setActiveModal(null);
                                    setShiftActive(true);
                                    localStorage.setItem('pos_shift_active', 'true');
                                    showToast('Shift Opened Successfully');
                                }}
                                className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-md"
                            >
                                Open Shift
                            </button>
                        </div>
                    </div>
                </ModalOverlay>
            )}
        </div>
    );
};

export default POS;
