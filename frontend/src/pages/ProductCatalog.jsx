import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import AddProductModal from '../components/modals/AddProductModal';
import CategoryManagerModal from '../components/modals/CategoryManagerModal';
import PageHeader from '../components/common/PageHeader';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [toast, setToast] = useState(null);

    // Filters & Pagination
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sort, setSort] = useState('name');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [page, search, selectedCategory, sort]);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: 20,
                sort,
                ...(search && { search }),
                ...(selectedCategory && { category: selectedCategory })
            };

            const { data } = await api.get('/products', { params });
            if (data.success) {
                setProducts(data.data);
                setPagination(data.pagination);
            }
        } catch (error) {
            showNotification('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            showNotification('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            showNotification('Failed to delete product');
        }
    };

    const showNotification = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="flex flex-col h-full relative">
            {toast && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
                    {toast}
                </div>
            )}

            <PageHeader title="Product Catalog">
                <button
                    onClick={() => setShowCategories(true)}
                    className="bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">category</span>
                    Categories
                </button>
                <button className="bg-secondary hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-lg">upload_file</span>
                    Bulk Import
                </button>
                <button
                    onClick={() => setShowAddProduct(true)}
                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add Product
                </button>
            </PageHeader>

            {/* Modals */}
            {showAddProduct && (
                <AddProductModal
                    onClose={() => setShowAddProduct(false)}
                    onProductAdded={() => {
                        setShowAddProduct(false);
                        showNotification('Product Added Successfully');
                        fetchProducts();
                    }}
                />
            )}
            {showCategories && (
                <CategoryManagerModal
                    onClose={() => setShowCategories(false)}
                    onCategoryChange={fetchCategories}
                />
            )}

            <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-slate-700 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-slate-700 rounded-l-md rounded-r-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                                placeholder="Search by name, generic name, SKU, or manufacturer..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                className="block w-full py-2 pl-3 pr-10 text-sm border border-gray-200 dark:border-slate-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-auto">
                            <Table>
                                <Thead>
                                    <Th className="min-w-[250px]">Name</Th>
                                    <Th>Category</Th>
                                    <Th>SKU</Th>
                                    <Th>Price</Th>
                                    <Th>Stock</Th>
                                    <Th className="text-right">Actions</Th>
                                </Thead>
                                <Tbody>
                                    {products.length === 0 ? (
                                        <Tr>
                                            <Td colSpan="6" className="text-center py-8 text-gray-500">No products found</Td>
                                        </Tr>
                                    ) : (
                                        products.map(product => (
                                            <Tr key={product._id}>
                                                <Td>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                                                        {product.genericName && (
                                                            <span className="text-xs text-gray-500 italic">Generic: {product.genericName}</span>
                                                        )}
                                                        {product.manufacturer && (
                                                            <span className="text-xs text-gray-400">Mfr: {product.manufacturer}</span>
                                                        )}
                                                    </div>
                                                </Td>
                                                <Td>
                                                    <StatusBadge type="info">{product.category?.name || 'Uncategorized'}</StatusBadge>
                                                </Td>
                                                <Td className="text-sm text-gray-600 dark:text-gray-300">{product.sku}</Td>
                                                <Td className="text-sm font-medium text-gray-900 dark:text-white">${product.sellingPrice.toFixed(2)}</Td>
                                                <Td className="text-sm text-gray-600 dark:text-gray-300">
                                                    {product.trackStock ? (product.stock || 0) : 'N/A'}
                                                </Td>
                                                <Td className="text-right">
                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                                            title="Delete"
                                                            onClick={() => handleDelete(product._id)}
                                                        >
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </Td>
                                            </Tr>
                                        ))
                                    )}
                                </Tbody>
                            </Table>
                        </div>
                        <Pagination
                            currentPage={page}
                            totalPages={pagination.totalPages || 1}
                            onPageChange={setPage}
                            totalItems={pagination.total || 0}
                            itemsPerPage={20}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCatalog;
