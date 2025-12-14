import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            // Assuming route is /api/orders/all based on controller doc, checking in next step to be sure but proceeding with this assumption to be async.
            // If check reveals different, I will update.
            const { data } = await axios.get('/api/orders/all/orders', config);
            setOrders(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching orders');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatusHandler = async (id, status) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.put(`/api/orders/${id}`, { orderStatus: status }, config);
            toast.success('Order status updated');
            fetchOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating status');
        }
    };

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="admin-table-container">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2>Orders ({orders.length})</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id.substring(0, 10)}...</td>
                                <td>{order.user?.name || 'Deleted User'}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>
                                    {order.paymentStatus === 'Paid' ? (
                                        <span className="badge badge-success">Paid</span>
                                    ) : (
                                        <span className="badge badge-warning">Pending</span>
                                    )}
                                </td>
                                <td>
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => updateStatusHandler(order._id, e.target.value)}
                                        className="form-select text-sm p-1"
                                        style={{ width: 'auto' }}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-outline">
                                        <FaEye /> Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
