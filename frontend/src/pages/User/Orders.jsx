import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { formatDate, formatPrice } from '../../utils/helpers';
import { Link } from 'react-router-dom';

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

    if (loading) {
        return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div></div>;
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No orders found.</p>
                <Link to="/products" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b border-gray-800">
                            <div>
                                <p className="text-gray-400 text-sm">Order ID</p>
                                <p className="font-mono text-white text-sm">#{order._id.slice(-8)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Date Added</p>
                                <p className="text-white text-sm">{formatDate(order.createdAt)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total</p>
                                <p className="text-purple-400 font-bold">{formatPrice(order.totalPrice)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Status</p>
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${order.orderStatus === 'Delivered' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                                    {order.orderStatus}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {order.products.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-medium">{item.name}</p>
                                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-gray-300 text-sm">{formatPrice(item.price)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
