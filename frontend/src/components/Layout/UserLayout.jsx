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
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            >
                My Account
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 sticky top-24 shadow-xl"
                    >
                        <nav className="flex flex-col space-y-2">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path || (item.path === '/profile' && location.pathname === '/profile/');
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${isActive
                                                ? 'text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                                        <span className="relative z-10 font-medium">{item.name}</span>
                                    </Link>
                                );
                            })}

                            <div className="my-4 border-t border-white/10"></div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 w-full text-left group"
                            >
                                <span className="text-lg group-hover:scale-110 transition-transform duration-300"><FaSignOutAlt /></span>
                                <span className="font-medium">Logout</span>
                            </button>
                        </nav>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 min-h-[600px] shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50"></div>
                        <Outlet />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
