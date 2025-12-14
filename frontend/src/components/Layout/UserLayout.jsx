import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaHeart, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const UserLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/profile', name: 'Overview', icon: <FaUser /> },
        { path: '/profile/orders', name: 'Orders', icon: <FaShoppingBag /> },
        { path: '/profile/address', name: 'Addresses', icon: <FaMapMarkerAlt /> },
        { path: '/profile/wishlist', name: 'Wishlist', icon: <FaHeart /> },
    ];

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8 text-white">My Account</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 sticky top-24">
                        <nav className="flex flex-col space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname === item.path || (item.path === '/profile' && location.pathname === '/profile/')
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 px-4 py-3 rounded-md text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors w-full text-left mt-4 border-t border-gray-700 pt-4"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700 min-h-[500px]"
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
