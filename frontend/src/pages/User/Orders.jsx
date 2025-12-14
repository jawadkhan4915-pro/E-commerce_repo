import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { formatDate, formatPrice } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaClock, FaCheckCircle, FaTruck } from 'react-icons/fa';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'Shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <FaCheckCircle />;
            case 'Shipped': return <FaTruck />;
            default: return <FaClock />;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
            >
                <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-gray-500">
                    <FaBoxOpen size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No orders yet</h3>
                <p className="text-gray-400 mb-8">Looks like you haven't made any purchases yet.</p>
                <Link
                    to="/products"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
                >
                    Start Shopping
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <h2 className="text-3xl font-bold text-white mb-8">Order History</h2>
            <div className="space-y-6">
                {orders.map((order, index) => (
                    <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
                    >
                        <div className="p-6">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-white/5">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Order ID</p>
                                    <p className="font-mono text-white font-medium">#{order._id.slice(-8)}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Date</p>
                                    <p className="text-white font-medium">{formatDate(order.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Amount</p>
                                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-lg">
                                        {formatPrice(order.totalPrice)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Status</p>
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}>
                                        {getStatusIcon(order.orderStatus)}
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.products.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-800">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">{item.name}</p>
                                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-gray-300 font-medium">{formatPrice(item.price)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-black/20 flex justify-between items-center text-sm">
                            <span className="text-gray-500">
                                {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                            </span>
                            <Link
                                to={`/order/${order._id}`}
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                View Details →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Orders;
