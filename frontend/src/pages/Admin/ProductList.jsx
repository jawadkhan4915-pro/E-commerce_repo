import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaSearch, FaBolt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [editingRowId, setEditingRowId] = useState(null);
    const [editPrice, setEditPrice] = useState('');
    const [editStock, setEditStock] = useState('');
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products?limit=100');
            setProducts(data.products || []);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching products');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                await axios.delete(`/api/products/${id}`, config);
                toast.success('Product deleted');
                fetchProducts();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error deleting product');
            }
        }
    };

    const startQuickEdit = (product) => {
        setEditingRowId(product._id);
        setEditPrice(product.price);
        setEditStock(product.stock !== undefined ? product.stock : 10);
    };

    const cancelQuickEdit = () => {
        setEditingRowId(null);
    };

    const saveQuickEdit = async (id) => {
        setSaving(true);
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.put(`/api/products/${id}`, {
                price: parseFloat(editPrice),
                stock: parseInt(editStock),
            }, config);
            toast.success('Product price & stock updated! ⚡');
            setEditingRowId(null);
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update item');
        } finally {
            setSaving(false);
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(filterText.toLowerCase()) ||
        p.category.toLowerCase().includes(filterText.toLowerCase())
    );

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="admin-table-container">
            <div className="flex flex-wrap justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 gap-4">
                <div>
                    <h2 className="text-xl font-bold">Catalog Inventory ({products.length})</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Quickly edit price & stock in real-time</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
                        <input
                            type="text"
                            placeholder="Filter catalog..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <button className="btn btn-primary btn-sm flex items-center gap-1.5" onClick={() => navigate('/admin/products/new')}>
                        <FaPlus size={12} /> Create Product
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th>CATEGORY</th>
                            <th>PRICE ($)</th>
                            <th>STOCK UNITS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => {
                            const isEditing = editingRowId === product._id;
                            return (
                                <tr key={product._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/40'}
                                                alt={product.name}
                                                className="w-10 h-10 object-cover rounded-lg border border-gray-200 dark:border-gray-800"
                                            />
                                            <div>
                                                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{product.name}</div>
                                                <div className="text-xs text-gray-500 font-mono">ID: {product._id.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={editPrice}
                                                onChange={(e) => setEditPrice(e.target.value)}
                                                className="quick-edit-input"
                                            />
                                        ) : (
                                            <span className="font-bold text-sm">${Number(product.price).toFixed(2)}</span>
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={editStock}
                                                onChange={(e) => setEditStock(e.target.value)}
                                                className="quick-edit-input"
                                            />
                                        ) : (
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                                product.stock <= 3
                                                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                            }`}>
                                                {product.stock !== undefined ? product.stock : 10} units
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <div className="quick-edit-actions">
                                                <button
                                                    type="button"
                                                    onClick={() => saveQuickEdit(product._id)}
                                                    disabled={saving}
                                                    className="quick-edit-save-btn"
                                                    title="Save Quick Edit"
                                                >
                                                    <FaCheck size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelQuickEdit}
                                                    className="quick-edit-cancel-btn"
                                                    title="Cancel"
                                                >
                                                    <FaTimes size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => startQuickEdit(product)}
                                                    className="btn btn-sm btn-outline text-indigo-500 border-indigo-500 hover:bg-indigo-500"
                                                    title="Quick Edit Price & Stock"
                                                >
                                                    <FaBolt size={12} /> Quick Edit
                                                </button>
                                                <Link to={`/admin/products/${product._id}/edit`} className="btn btn-sm btn-outline">
                                                    <FaEdit size={12} />
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline text-red-500 border-red-500 hover:bg-red-500"
                                                    onClick={() => deleteHandler(product._id)}
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
