import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiFilter, 
    FiGrid, 
    FiList, 
    FiRotateCcw, 
    FiSearch, 
    FiSliders, 
    FiChevronDown,
    FiInbox
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import api from '../api/api';

const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
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
        setFilters({
            search: searchParams.get('search') || '',
            category: searchParams.get('category') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            sort: searchParams.get('sort') || '',
        });
        fetchProducts();
    }, [searchParams]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            const currentSearch = searchParams.get('search') || '';
            const currentCat = searchParams.get('category') || '';
            const currentMin = searchParams.get('minPrice') || '';
            const currentMax = searchParams.get('maxPrice') || '';
            const currentSort = searchParams.get('sort') || '';
            const currentPage = searchParams.get('page') || '1';

            if (currentSearch) params.append('search', currentSearch);
            if (currentCat) params.append('category', currentCat);
            if (currentMin) params.append('minPrice', currentMin);
            if (currentMax) params.append('maxPrice', currentMax);
            if (currentSort) params.append('sort', currentSort);
            params.append('page', currentPage);

            const { data } = await api.get(`/products?${params.toString()}`);
            setProducts(data.products || []);
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
                {/* Page Header Banner */}
                <div className="catalog-header-banner">
                    <div>
                        <h1 className="page-title">Explore Catalog</h1>
                        <p className="page-subtitle">
                            {filters.search
                                ? `Showing results for "${filters.search}"`
                                : filters.category
                                ? `Filtered by ${filters.category}`
                                : 'Browse top-quality items with fast shipping and warranty'}
                        </p>
                    </div>
                </div>

                {/* Quick Category Pills Bar */}
                <div className="category-pills-bar">
                    <button
                        onClick={() => handleFilterChange('category', '')}
                        className={`cat-pill ${!filters.category ? 'active' : ''}`}
                    >
                        All Products
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleFilterChange('category', cat)}
                            className={`cat-pill ${filters.category === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="product-list-layout mt-6">
                    {/* Filters Sidebar */}
                    <aside className="filters-sidebar">
                        <div className="filter-header">
                            <h3 className="filter-title"><FiSliders /> Filters</h3>
                            {(filters.category || filters.search || filters.minPrice || filters.maxPrice || filters.sort) && (
                                <button onClick={clearFilters} className="clear-filters-btn">
                                    <FiRotateCcw size={14} /> Clear
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
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

                        {/* Price Range Filter */}
                        <div className="filter-section">
                            <h4 className="filter-heading">Price Range ($)</h4>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="form-input"
                                />
                                <span className="price-dash">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {/* Sort Filter */}
                        <div className="filter-section">
                            <h4 className="filter-heading">Sort Order</h4>
                            <select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="form-select"
                            >
                                <option value="">Newest Arrivals</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </aside>

                    {/* Products Grid Area */}
                    <div className="products-content">
                        <div className="products-toolbar flex justify-between items-center mb-6">
                            <span className="products-count-badge">
                                <strong>{pagination.total}</strong> Products Available
                            </span>

                            <div className="toolbar-controls flex items-center gap-3">
                                <div className="view-mode-toggle">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        title="Grid View"
                                    >
                                        <FiGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        title="List View"
                                    >
                                        <FiList size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <motion.div 
                                    className={`products-container-view ${viewMode === 'list' ? 'list-mode' : 'grid-mode'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </motion.div>

                                {/* Pagination */}
                                {pagination.pages > 1 && (
                                    <div className="pagination mt-8">
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
                            <div className="no-products-card text-center">
                                <FiInbox size={48} className="no-products-icon" />
                                <h3>No matching products found</h3>
                                <p>Try adjusting your search criteria or clear filters to see all available products.</p>
                                <button onClick={clearFilters} className="btn btn-primary mt-4">
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .catalog-header-banner {
          margin-bottom: 1.5rem;
        }

        .page-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .page-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .category-pills-bar {
          display: flex;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: none;
        }

        .category-pills-bar::-webkit-scrollbar {
          display: none;
        }

        .cat-pill {
          padding: 0.5rem 1.1rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .cat-pill:hover,
        .cat-pill.active {
          background: var(--primary-600);
          color: white;
          border-color: var(--primary-600);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
        }

        .product-list-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
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
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-title {
          font-size: 1.15rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          color: var(--text-primary);
        }

        .clear-filters-btn {
          background: none;
          border: none;
          color: var(--primary-600);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .filter-section {
          margin-bottom: 1.5rem;
        }

        .filter-heading {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-tertiary);
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-dash {
          color: var(--text-tertiary);
          font-weight: 700;
        }

        .products-toolbar {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 0.75rem 1.25rem;
        }

        .products-count-badge {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .view-mode-toggle {
          display: flex;
          gap: 0.25rem;
          background: var(--bg-secondary);
          padding: 0.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .view-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          border: none;
          background: none;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .view-btn.active {
          background: var(--bg-primary);
          color: var(--primary-600);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .grid-mode {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.75rem;
        }

        .list-mode {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .no-products-card {
          background: var(--bg-primary);
          border: 1px dashed var(--border-color);
          border-radius: var(--radius-xl);
          padding: 4rem 2rem;
          margin-top: 1rem;
        }

        .no-products-icon {
          color: var(--text-tertiary);
          margin-bottom: 1rem;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .pagination-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-weight: 700;
          cursor: pointer;
        }

        .pagination-btn.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
        }

        @media (max-width: 992px) {
          .product-list-layout {
            grid-template-columns: 1fr;
          }
          .filters-sidebar {
            position: static;
          }
        }
      `}</style>
        </div>
    );
};

export default ProductList;
