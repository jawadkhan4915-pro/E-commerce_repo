import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { formatDate, formatPrice } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaClock, FaCheckCircle, FaTruck, FaRegCheckCircle, FaSyncAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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

    const handleReorder = (products) => {
        products.forEach(p => {
            dispatch(addToCart({
                _id: p.product || p._id,
                name: p.name,
                price: p.price,
                images: [p.image],
                stock: 10
            }));
        });
        toast.success('Items added to your cart for re-order!');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'Shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        }
    };

    const getStatusStepIndex = (status) => {
        switch (status) {
            case 'Processing': return 1;
            case 'Shipped': return 2;
            case 'Delivered': return 3;
            default: return 0; // Placed / Pending
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
                <h3 className="text-2xl font-bold text-white mb-2">No orders placed yet</h3>
                <p className="text-gray-400 mb-8">Discover our featured products and place your first order!</p>
                <Link
                    to="/products"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
                >
                    Start Shopping Now
                </Link>
            </motion.div>
        );
    }

    const steps = ['Placed', 'Processing', 'Shipped', 'Delivered'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white">Order History & Live Tracking</h2>
                    <p className="text-gray-400 text-sm mt-1">Track progress, view items, and easily reorder</p>
                </div>
            </div>

            <div className="space-y-6">
                {orders.map((order, index) => {
                    const currentStep = getStatusStepIndex(order.orderStatus);

                    return (
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
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Order Ref</p>
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

                                {/* Order Stepper Progress Line */}
                                <div className="mb-6 px-2 py-4 bg-black/30 rounded-xl border border-white/5">
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-2">Delivery Progress Stepper</p>
                                    <div className="flex items-center justify-between relative px-4">
                                        <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-gray-700 -translate-y-1/2 -z-0"></div>
                                        <div 
                                            className="absolute left-8 top-1/2 h-0.5 bg-purple-500 -translate-y-1/2 transition-all duration-500 -z-0"
                                            style={{ width: `${(currentStep / 3) * 85}%` }}
                                        ></div>

                                        {steps.map((st, sIdx) => {
                                            const isDone = sIdx <= currentStep;
                                            return (
                                                <div key={st} className="flex flex-col items-center relative z-10">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                                        isDone 
                                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50' 
                                                            : 'bg-gray-800 text-gray-500 border border-gray-700'
                                                    }`}>
                                                        {isDone ? '✓' : sIdx + 1}
                                                    </div>
                                                    <span className={`text-xs mt-2 font-medium ${isDone ? 'text-purple-300' : 'text-gray-500'}`}>
                                                        {st}
                                                    </span>
                                                </div>
                                            );
                                        })}
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
                                <span className="text-gray-400">
                                    {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                                </span>
                                <button
                                    onClick={() => handleReorder(order.products)}
                                    className="text-xs font-semibold px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1.5 transition-all"
                                >
                                    <FaSyncAlt size={12} /> Re-Order Items
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Orders;
