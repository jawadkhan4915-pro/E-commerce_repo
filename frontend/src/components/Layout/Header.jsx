import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const Header = ({ darkMode, toggleDarkMode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/');
        setShowUserMenu(false);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="32" height="32" rx="8" fill="url(#gradient)" />
                            <path
                                d="M16 8L20 12H12L16 8Z"
                                fill="white"
                            />
                            <rect x="10" y="14" width="12" height="10" rx="2" fill="white" />
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                                    <stop stopColor="#667eea" />
                                    <stop offset="1" stopColor="#764ba2" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="logo-text">ShopHub</span>
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                width="20"
                                height="20"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </button>
                    </form>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <Link to="/products" className="nav-link">Products</Link>

                        {/* Dark Mode Toggle */}
                        <button onClick={toggleDarkMode} className="icon-btn" title="Toggle Dark Mode">
                            {darkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="22" height="22">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="22" height="22">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>
                            )}
                        </button>

                        {/* Cart */}
                        <Link to="/cart" className="cart-btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                width="24"
                                height="24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="user-menu">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="user-btn"
                                >
                                    <img
                                        src={userInfo?.avatar || 'https://via.placeholder.com/40'}
                                        alt={userInfo?.name}
                                        className="user-avatar"
                                    />
                                </button>

                                {showUserMenu && (
                                    <div className="user-dropdown">
                                        <div className="user-info">
                                            <p className="user-name">{userInfo?.name}</p>
                                            <p className="user-email">{userInfo?.email}</p>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                            Profile
                                        </Link>
                                        {userInfo?.role === 'admin' && (
                                            <Link to="/admin/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <div className="dropdown-divider"></div>
                                        <button onClick={handleLogout} className="dropdown-item logout-btn">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary btn-sm">
                                Login
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            width="24"
                            height="24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        <Link to="/products" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                            Products
                        </Link>
                        <Link to="/cart" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                            Cart {totalItems > 0 && `(${totalItems})`}
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                                    Profile
                                </Link>
                                {userInfo?.role === 'admin' && (
                                    <Link to="/admin/dashboard" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="mobile-menu-item logout-btn">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          backdrop-filter: blur(10px);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1rem 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          text-decoration: none;
        }

        .logo-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-form {
          flex: 1;
          max-width: 500px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 3rem 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-size: var(--font-size-sm);
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .search-btn {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          color: var(--text-secondary);
          font-weight: 500;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--primary-600);
        }

        .icon-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .icon-btn:hover {
          background: var(--bg-secondary);
          color: var(--primary-600);
        }

        .cart-btn {
          position: relative;
          color: var(--text-secondary);
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .cart-btn:hover {
          background: var(--bg-secondary);
          color: var(--primary-600);
        }

        .cart-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--gradient-accent);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-full);
          min-width: 18px;
          text-align: center;
        }

        .user-menu {
          position: relative;
        }

        .user-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          border: 2px solid var(--primary-500);
          object-fit: cover;
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          min-width: 220px;
          padding: 0.5rem;
          animation: fadeIn 0.2s ease-out;
        }

        .user-info {
          padding: 0.75rem;
        }

        .user-name {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .user-email {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.5rem 0;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 0.75rem;
          text-align: left;
          background: none;
          border: none;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .dropdown-item:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .logout-btn {
          color: var(--error);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          margin-top: 1rem;
        }

        .mobile-menu-item {
          padding: 0.75rem;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          background: none;
          border: none;
          text-align: left;
          font-size: var(--font-size-base);
          cursor: pointer;
          width: 100%;
        }

        .mobile-menu-item:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .search-form {
            display: none;
          }

          .nav-desktop {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
            margin-left: auto;
          }

          .mobile-menu {
            display: flex;
          }
        }
      `}</style>
        </header>
    );
};

export default Header;
