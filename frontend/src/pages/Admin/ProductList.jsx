import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products?limit=100'); // Get all products (limit 100 for now)
            setProducts(data.products);
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
        if (window.confirm('Are you sure?')) {
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

    const createProductHandler = () => {
        navigate('/admin/products/new');
    };

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="admin-table-container">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2>Products ({products.length})</h2>
                <button className="btn btn-primary" onClick={createProductHandler}>
                    <FaPlus /> Create Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id.substring(0, 10)}...</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/40'}
                                            alt={product.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        {product.name}
                                    </div>
                                </td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand || 'N/A'}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <Link to={`/admin/products/${product._id}/edit`} className="btn btn-sm btn-outline">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline text-red-500 border-red-500 hover:bg-red-500"
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
