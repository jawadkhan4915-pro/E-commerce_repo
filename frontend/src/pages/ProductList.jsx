import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../api/api';

const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sort: searchParams.get('sort') || '',
    });

    const categories = ['Electronics', 'Clothing', 'Shoes', 'Accessories', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Beauty', 'Other'];

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
            params.append('page', searchParams.get('page') || '1');

            const { data } = await api.get(`/products?${params.toString()}`);
            setProducts(data.products);
            setPagination({ page: data.page, pages: data.pages, total: data.total });
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([k, v]) => {
            if (v) params.set(k, v);
        });
        setSearchParams(params);
    };

    const clearFilters = () => {
        setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sort: '' });
        setSearchParams({});
    };

    return (
        <div className="product-list-page py-8">
            <div className="container">
                <h1 className="page-title">All Products</h1>

                <div className="product-list-layout">
                    {/* Filters Sidebar */}
                    <aside className="filters-sidebar">
                        <div className="filter-section">
                            <h3 className="filter-title">Filters</h3>
                            <button onClick={clearFilters} className="btn btn-sm btn-outline" style={{ width: '100%' }}>
                                Clear All
                            </button>
                        </div>

                        <div className="filter-section">
                            <h4 className="filter-heading">Category</h4>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="form-select"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-section">
                            <h4 className="filter-heading">Price Range</h4>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="form-input"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4 className="filter-heading">Sort By</h4>
                            <select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="form-select"
                            >
                                <option value="">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="products-content">
                        <div className="products-header">
                            <p className="products-count">
                                {pagination.total} products found
                            </p>
                        </div>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="products-grid">
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.pages > 1 && (
                                    <div className="pagination">
                                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => {
                                                    const params = new URLSearchParams(searchParams);
                                                    params.set('page', page.toString());
                                                    setSearchParams(params);
                                                }}
                                                className={`pagination-btn ${pagination.page === page ? 'active' : ''}`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="no-products">
                                <p>No products found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .product-list-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
        }

        .filters-sidebar {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: calc(var(--header-height) + 1rem);
        }

        .filter-section {
          margin-bottom: 2rem;
        }

        .filter-section:last-child {
          margin-bottom: 0;
        }

        .filter-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .filter-heading {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-inputs input {
          flex: 1;
        }

        .products-content {
          flex: 1;
        }

        .products-header {
          margin-bottom: 1.5rem;
        }

        .products-count {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .no-products {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-secondary);
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .pagination-btn {
          min-width: 40px;
          height: 40px;
          padding: 0.5rem 1rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .pagination-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--primary-500);
        }

        .pagination-btn.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
        }

        @media (max-width: 1024px) {
          .product-list-layout {
            grid-template-columns: 1fr;
          }

          .filters-sidebar {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default ProductList;
