import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

import {
    FaHome,
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaChartBar,
    FaCog,
    FaBars,
    FaTimes,
    FaBell,
    FaExclamationTriangle,
    FaCheckCircle,
    FaUserCheck,
} from 'react-icons/fa';
import '../../styles/admin.css';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Low Stock: Wireless Noise Canceling Headphones (2 left)', time: '10m ago', unread: true, type: 'warning' },
        { id: 2, title: 'New order #ORD-8942 received ($249.99)', time: '25m ago', unread: true, type: 'order' },
        { id: 3, title: 'User john_doe registered a new account', time: '1h ago', unread: false, type: 'user' }
    ]);

    const notifRef = useRef(null);
    const location = useLocation();
    const { userInfo } = useSelector((state) => state.auth);

    const menuItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: <FaChartBar /> },
        { path: '/admin/products', name: 'Products', icon: <FaBox /> },
        { path: '/admin/orders', name: 'Orders', icon: <FaShoppingBag /> },
        { path: '/admin/users', name: 'Users', icon: <FaUsers /> },
        { path: '/admin/settings', name: 'Settings', icon: <FaCog /> },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const hasUnread = notifications.some(n => n.unread);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
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
                        {isSidebarOpen && <span>Back to Customer Site</span>}
                    </Link>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header flex justify-between items-center px-6">
                    <h3 className="font-bold text-lg">{menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}</h3>
                    
                    <div className="header-actions flex items-center gap-4">
                        {/* Operational Notification Hub */}
                        <div className="admin-notifications-wrapper" ref={notifRef}>
                            <button
                                type="button"
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="admin-notifications-btn"
                                title="System Notifications"
                            >
                                <FaBell size={18} />
                                {hasUnread && <span className="notification-badge-dot"></span>}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="notifications-dropdown"
                                    >
                                        <div className="notifications-dropdown-header">
                                            <h4>Notifications</h4>
                                            {hasUnread && (
                                                <button onClick={markAllRead} className="clear-notifications-btn">
                                                    Mark all read
                                                </button>
                                            )}
                                        </div>

                                        <div className="notifications-list">
                                            {notifications.length > 0 ? (
                                                notifications.map((n) => (
                                                    <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                                                        <div className={`notification-item-icon ${
                                                            n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-500'
                                                        }`}>
                                                            {n.type === 'warning' ? <FaExclamationTriangle size={13} /> : <FaShoppingBag size={13} />}
                                                        </div>
                                                        <div className="notification-item-content">
                                                            <div className="notification-item-title">{n.title}</div>
                                                            <div className="notification-item-time">{n.time}</div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="notifications-empty-state">No new notifications</div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Admin Profile Pill */}
                        <div className="flex items-center gap-2.5 bg-gray-100 dark:bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                            <img 
                                src={userInfo?.avatar || 'https://via.placeholder.com/40'} 
                                alt={userInfo?.name || 'Admin'} 
                                className="w-7 h-7 rounded-full object-cover border border-indigo-500" 
                            />
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{userInfo?.name || 'Administrator'}</span>
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
