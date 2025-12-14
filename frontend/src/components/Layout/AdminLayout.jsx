import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaHome,
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaBars,
import {
        FaHome,
        FaBox,
        FaShoppingBag,
        FaUsers,
        FaChartBar,
        FaCog,
        FaSignOutAlt,
        FaBars,
        FaTimes,
        FaUser,
    } from 'react-icons/fa';
import '../../styles/admin.css';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: <FaChartBar /> },
        { path: '/admin/products', name: 'Products', icon: <FaBox /> },
        { path: '/admin/orders', name: 'Orders', icon: <FaShoppingBag /> },
        { path: '/admin/users', name: 'Users', icon: <FaUsers /> },
        // { path: '/admin/settings', name: 'Settings', icon: <FaCog /> },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: isSidebarOpen ? 260 : 80 }}
                animate={{ width: isSidebarOpen ? 260 : 80 }}
                transition={{ duration: 0.3 }}
                className="admin-sidebar"
            >
                <div className="sidebar-header">
                    <motion.h2
                        initial={{ opacity: isSidebarOpen ? 1 : 0 }}
                        animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        AdminPanel
                    </motion.h2>
                    <button onClick={toggleSidebar} className="toggle-btn">
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`nav-link ${location.pathname === item.path ? 'active' : ''
                                        }`}
                                >
                                    <span className="icon">{item.icon}</span>
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="nav-link logout">
                        <span className="icon"><FaHome /></span>
                        {isSidebarOpen && <span>Back to Site</span>}
                    </Link>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h3>{menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}</h3>
                    <div className="header-actions">
                        {/* Add profile dropdown or notifications here if needed */}
                        <div className="admin-profile">
                            <img src="https://via.placeholder.com/40" alt="Admin" className="avatar" />
                        </div>
                    </div>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
