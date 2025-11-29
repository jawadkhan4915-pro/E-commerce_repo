import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import api from '../../api/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products?limit=100');
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter((p) => p._id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            // Error handled by interceptor
        }
    };

    return (
        <div className="admin-dashboard py-8">
            <div className="container">
                <div className="dashboard-header">
                    <h1 className="page-title">Admin Dashboard</h1>
                    <Link to="/admin/products/new" className="btn btn-primary">
                        + Add New Product
                    </Link>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            📦
                        </div>
                        <div className="stat-info">
                            <p className="stat-label">Total Products</p>
                            <p className="stat-value">{products.length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            ✅
                        </div>
                        <div className="stat-info">
                            <p className="stat-label">In Stock</p>
                            <p className="stat-value">{products.filter(p => p.stock > 0).length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                            ⭐
                        </div>
                        <div className="stat-info">
                            <p className="stat-label">Avg Rating</p>
                            <p className="stat-value">
                                {products.length > 0 ? (products.reduce((acc, p) => acc + p.ratings, 0) / products.length).toFixed(1) : '0'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="products-table-container">
                    <h2 className="section-title">Manage Products</h2>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td>
                                                <img src={product.images[0] || 'https://via.placeholder.com/50'} alt={product.name} className="table-image" />
                                            </td>
                                            <td className="product-name-cell">{product.name}</td>
                                            <td>{product.category}</td>
                                            <td className="price-cell">{formatPrice(product.price)}</td>
                                            <td>
                                                <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td>{product.ratings.toFixed(1)} ⭐</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link to={`/admin/products/${product._id}/edit`} className="btn-action btn-edit">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDelete(product._id, product.name)} className="btn-action btn-delete">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
        }

        .stat-info {
          flex: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .products-table-container {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
        }

        .products-table thead {
          background: var(--bg-secondary);
        }

        .products-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .products-table td {
          padding: 1rem;
          border-top: 1px solid var(--border-color);
          color: var(--text-secondary);
        }

        .table-image {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        .product-name-cell {
          font-weight: 600;
          color: var(--text-primary);
          max-width: 300px;
        }

        .price-cell {
          font-weight: 700;
          color: var(--primary-600);
        }

        .stock-badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .stock-badge.in-stock {
          background: #d1fae5;
          color: #065f46;
        }

        .stock-badge.out-of-stock {
          background: #fee2e2;
          color: #991b1b;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-action {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-decoration: none;
          border: none;
        }

        .btn-edit {
          background: var(--primary-100);
          color: var(--primary-700);
        }

        .btn-edit:hover {
          background: var(--primary-200);
        }

        .btn-delete {
          background: #fee2e2;
          color: #991b1b;
        }

        .btn-delete:hover {
          background: #fecaca;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          padding: 3rem;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .table-wrapper {
            overflow-x: scroll;
          }

          .products-table {
            min-width: 800px;
          }
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
