import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiSearch, 
    FiShoppingBag, 
    FiUser, 
    FiSun, 
    FiMoon, 
    FiMenu, 
    FiX, 
    FiLogOut, 
    FiGrid, 
    FiHeart, 
    FiChevronRight,
    FiAward,
    FiCamera
} from 'react-icons/fi';
import { logout } from '../../store/slices/authSlice';
import api from '../../api/api';
import toast from 'react-hot-toast';

const Header = ({ darkMode, toggleDarkMode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const searchRef = useRef(null);
    const userMenuRef = useRef(null);

    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('recentSearches');
        return saved ? JSON.parse(saved) : ['Headphones', 'Smart TV', 'Shoes'];
    });

    // Save search to history
    const saveSearchTerm = (term) => {
        if (!term.trim()) return;
        const updated = [term.trim(), ...recentSearches.filter(s => s.toLowerCase() !== term.trim().toLowerCase())].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const clearRecentSearches = (e) => {
        e.stopPropagation();
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    // Scroll listener for glassmorphism elevation
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Live search query autocomplete preview
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                const { data } = await api.get(`/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
                setSearchResults(data.products || []);
                setShowSuggestions(true);
            } catch (err) {
                console.error(err);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            saveSearchTerm(searchQuery);
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setShowSuggestions(false);
        }
    };

    const handleSelectSearchTerm = (term) => {
        setSearchQuery(term);
        saveSearchTerm(term);
        navigate(`/products?search=${encodeURIComponent(term)}`);
        setShowSuggestions(false);
    };

    const handleSelectProduct = (productId) => {
        setShowSuggestions(false);
        setSearchQuery('');
        navigate(`/products/${productId}`);
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/');
        setShowUserMenu(false);
    };

    const openTryOn = () => {
        window.dispatchEvent(new CustomEvent('open-tryon', { detail: { product: null } }));
        setMobileMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    {/* Brand Logo */}
                    <Link to="/" className="logo">
                        <motion.div 
                            className="logo-icon"
                            whileHover={{ rotate: 12, scale: 1.05 }}
                        >
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
                                <path d="M16 7L21 12H11L16 7Z" fill="white" />
                                <rect x="9" y="14" width="14" height="11" rx="3" fill="white" />
                                <defs>
                                    <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                                        <stop stopColor="#6366f1" />
                                        <stop offset="1" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>
                        <span className="logo-text">ShopHub</span>
                    </Link>

                    {/* Live Search Form */}
                    <div className="search-wrapper" ref={searchRef}>
                        <form onSubmit={handleSearchSubmit} className="search-form">
                            <FiSearch className="search-input-icon" />
                            <input
                                type="text"
                                placeholder="Search products, brands, categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                                className="search-input"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="search-clear-btn"
                                >
                                    <FiX size={16} />
                                </button>
                            )}
                        </form>

                        {/* Instant Suggestions Dropdown */}
                        <AnimatePresence>
                            {showSuggestions && (
                                <motion.div
                                    className="search-suggestions-dropdown"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {!searchQuery.trim() ? (
                                        <div className="suggestions-history-panel p-2">
                                            {recentSearches.length > 0 && (
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center px-2 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                        <span>Recent Searches</span>
                                                        <button 
                                                            type="button" 
                                                            onClick={clearRecentSearches}
                                                            className="text-xs text-indigo-400 hover:underline capitalize font-normal"
                                                        >
                                                            Clear All
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                                        {recentSearches.map((term, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => handleSelectSearchTerm(term)}
                                                                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-1.5"
                                                            >
                                                                <FiSearch size={11} /> {term}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                <div className="px-2 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    Popular Categories
                                                </div>
                                                <div className="grid grid-cols-2 gap-1.5 mt-1">
                                                    {['Electronics', 'Clothing', 'Accessories', 'Shoes'].map((cat) => (
                                                        <button
                                                            key={cat}
                                                            type="button"
                                                            onClick={() => {
                                                                setShowSuggestions(false);
                                                                navigate(`/products?category=${cat}`);
                                                            }}
                                                            className="text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between"
                                                        >
                                                            <span>{cat}</span>
                                                            <FiChevronRight size={12} className="text-gray-400" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : isSearching ? (
                                        <div className="suggestions-loading p-4 text-center text-sm text-gray-500">
                                            <div className="btn-spinner inline-block mr-2"></div> Searching...
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="suggestions-list">
                                            <div className="suggestions-header">Products ({searchResults.length})</div>
                                            {searchResults.map((product) => (
                                                <div
                                                    key={product._id}
                                                    onClick={() => handleSelectProduct(product._id)}
                                                    className="suggestion-item"
                                                >
                                                    <img
                                                        src={product.images?.[0] || 'https://via.placeholder.com/40'}
                                                        alt={product.name}
                                                        className="suggestion-thumb"
                                                    />
                                                    <div className="suggestion-details">
                                                        <div className="suggestion-title">{product.name}</div>
                                                        <div className="suggestion-price">${product.price}</div>
                                                    </div>
                                                    <FiChevronRight className="suggestion-arrow" />
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={handleSearchSubmit}
                                                className="view-all-results-btn"
                                            >
                                                View all results for "{searchQuery}"
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="suggestions-empty p-4 text-center text-sm text-gray-500">
                                            No products found for "{searchQuery}"
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <Link
                            to="/products"
                            className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                        >
                            <FiGrid /> Catalog
                        </Link>

                        {/* Virtual Try-On Button */}
                        <motion.button
                            onClick={openTryOn}
                            className="tryon-nav-trigger"
                            title="Virtual Try-On"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiCamera size={15} />
                            <span>Try It On</span>
                        </motion.button>
                        {/* Dark Mode Switcher */}
                        <motion.button
                            onClick={toggleDarkMode}
                            className="theme-toggle-btn"
                            title="Toggle Light/Dark Theme"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {darkMode ? <FiSun color="#f59e0b" size={20} /> : <FiMoon color="#6366f1" size={20} />}
                        </motion.button>

                        {/* Cart Link with Animated Badge */}
                        <Link to="/cart" className="cart-link" title="Shopping Cart">
                            <motion.div 
                                className="cart-icon-wrapper"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiShoppingBag size={22} />
                                {totalItems > 0 && (
                                    <motion.span 
                                        className="cart-badge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        key={totalItems}
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </motion.div>
                        </Link>

                        {/* User Profile Menu */}
                        {isAuthenticated ? (
                            <div className="user-menu-wrapper" ref={userMenuRef}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="user-avatar-btn"
                                >
                                    <img
                                        src={userInfo?.avatar || 'https://via.placeholder.com/40'}
                                        alt={userInfo?.name}
                                        className="user-avatar-img"
                                    />
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            className="user-dropdown-card"
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <div className="user-dropdown-header">
                                                <p className="dropdown-user-name">{userInfo?.name}</p>
                                                <p className="dropdown-user-email">{userInfo?.email}</p>
                                                <span className="user-role-badge">{userInfo?.role || 'Customer'}</span>
                                            </div>
                                            <div className="dropdown-divider" />
                                            <Link
                                                to="/profile"
                                                className="dropdown-link-item"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <FiUser /> Profile & Account
                                            </Link>
                                            <Link
                                                to="/profile/wishlist"
                                                className="dropdown-link-item"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <FiHeart /> Wishlist
                                            </Link>
                                            {userInfo?.role === 'admin' && (
                                                <Link
                                                    to="/admin/dashboard"
                                                    className="dropdown-link-item admin-link"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <FiAward /> Admin Portal
                                                </Link>
                                            )}
                                            <div className="dropdown-divider" />
                                            <button onClick={handleLogout} className="dropdown-link-item logout-link">
                                                <FiLogOut /> Log Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary btn-sm flex items-center gap-1">
                                <FiUser /> Sign In
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className="mobile-toggle-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="mobile-menu-drawer"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="mobile-search-box">
                                <form onSubmit={handleSearchSubmit} className="search-form">
                                    <FiSearch className="search-input-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="search-input"
                                    />
                                </form>
                            </div>

                            <div className="mobile-links">
                                <Link to="/products" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                                    <FiGrid /> Catalog
                                </Link>
                                <button className="mobile-link tryon-mobile-link" onClick={openTryOn}>
                                    <FiCamera /> Try It On 👗
                                </button>
                                <Link to="/cart" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                                    <FiShoppingBag /> Cart ({totalItems})
                                </Link>
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/profile" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                                            <FiUser /> Profile & Account
                                        </Link>
                                        {userInfo?.role === 'admin' && (
                                            <Link to="/admin/dashboard" className="mobile-link admin-link" onClick={() => setMobileMenuOpen(false)}>
                                                <FiAward /> Admin Dashboard
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="mobile-link logout-link">
                                            <FiLogOut /> Log Out
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="mobile-link active" onClick={() => setMobileMenuOpen(false)}>
                                        <FiUser /> Sign In
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          transition: all var(--transition-base);
        }

        [data-theme='dark'] .header {
          background: rgba(15, 23, 42, 0.85);
        }

        .header-scrolled {
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          height: 72px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }

        .logo-text {
          font-size: 1.4rem;
          font-weight: 900;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }

        .search-wrapper {
          flex: 1;
          max-width: 480px;
          position: relative;
        }

        .search-form {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-tertiary);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.65rem 2.5rem 0.65rem 2.6rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-500);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
          background: var(--bg-primary);
        }

        .search-clear-btn {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-suggestions-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 0;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          overflow: hidden;
          z-index: 100;
          padding: 0.5rem;
        }

        .suggestions-header {
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .suggestion-item:hover {
          background: var(--bg-secondary);
        }

        .suggestion-thumb {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          object-fit: cover;
        }

        .suggestion-details {
          flex: 1;
        }

        .suggestion-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .suggestion-price {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-600);
        }

        .suggestion-arrow {
          color: var(--text-tertiary);
        }

        .view-all-results-btn {
          width: 100%;
          padding: 0.6rem;
          margin-top: 0.4rem;
          background: var(--bg-secondary);
          border: none;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary-600);
          cursor: pointer;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.925rem;
          text-decoration: none;
          transition: color var(--transition-fast);
          padding: 0.4rem 0.6rem;
          border-radius: var(--radius-md);
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--primary-600);
        }

        .theme-toggle-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .cart-link {
          text-decoration: none;
        }

        .cart-icon-wrapper {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--gradient-accent);
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.4);
        }

        .user-menu-wrapper {
          position: relative;
        }

        .user-avatar-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .user-avatar-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--primary-500);
          object-fit: cover;
        }

        .user-dropdown-card {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          width: 240px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          padding: 0.75rem;
          z-index: 100;
        }

        .user-dropdown-header {
          padding: 0.5rem;
        }

        .dropdown-user-name {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .dropdown-user-email {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-bottom: 0.4rem;
        }

        .user-role-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          background: var(--primary-100);
          color: var(--primary-700);
          border-radius: var(--radius-full);
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.5rem 0;
        }

        .dropdown-link-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .dropdown-link-item:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .admin-link {
          color: var(--accent-600);
        }

        .logout-link {
          color: var(--error);
        }

        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        .mobile-menu-drawer {
          display: none;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem;
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 600;
          background: var(--bg-secondary);
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        /* ── Virtual Try-On trigger button ── */
        .tryon-nav-trigger {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          color: white;
          border: none;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.2px;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
          transition: box-shadow 0.2s;
          white-space: nowrap;
        }
        .tryon-nav-trigger:hover {
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        .tryon-mobile-link {
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(236,72,153,0.12));
          color: #6366f1 !important;
          border: 1px solid rgba(99,102,241,0.25) !important;
          font-weight: 700 !important;
        }

        @media (max-width: 768px) {
          .search-wrapper,
          .nav-desktop {
            display: none;
          }
          .mobile-toggle-btn,
          .mobile-menu-drawer {
            display: block;
          }
        }
      `}</style>
        </header>
    );
};

export default Header;
