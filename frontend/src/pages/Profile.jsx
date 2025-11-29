import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice, formatDate } from '../utils/helpers';
import api from '../api/api';

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);
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

    return (
        <div className="profile-page py-8">
            <div className="container">
                <h1 className="page-title">My Profile</h1>

                <div className="profile-layout">
                    {/* User Info Card */}
                    <div className="profile-card">
                        <div className="profile-header">
                            <img src={userInfo?.avatar || 'https://via.placeholder.com/100'} alt={userInfo?.name} className="profile-avatar" />
                            <div>
                                <h2 className="profile-name">{userInfo?.name}</h2>
                                <p className="profile-email">{userInfo?.email}</p>
                                {userInfo?.role === 'admin' && (
                                    <span className="badge badge-primary">Admin</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="orders-section">
                        <h2 className="section-title">Order History</h2>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        ) : orders.length > 0 ? (
                            <div className="orders-list">
                                {orders.map((order) => (
                                    <div key={order._id} className="order-card">
                                        <div className="order-header">
                                            <div>
                                                <p className="order-id">Order #{order._id.slice(-8)}</p>
                                                <p className="order-date">{formatDate(order.createdAt)}</p>
                                            </div>
                                            <div className="order-status-badges">
                                                <span className={`badge ${order.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                                                    {order.paymentStatus}
                                                </span>
                                                <span className={`badge ${order.orderStatus === 'Delivered' ? 'badge-success' : 'badge-primary'}`}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="order-items">
                                            {order.products.map((item, index) => (
                                                <div key={index} className="order-item">
                                                    <img src={item.image} alt={item.name} />
                                                    <div className="order-item-info">
                                                        <p className="order-item-name">{item.name}</p>
                                                        <p className="order-item-qty">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="order-item-price">{formatPrice(item.price * item.quantity)}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="order-footer">
                                            <p className="order-total">Total: {formatPrice(order.totalPrice)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-orders">
                                <p>No orders yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .profile-layout {
          display: grid;
          gap: 2rem;
        }

        .profile-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2rem;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-full);
          border: 3px solid var(--primary-500);
          object-fit: cover;
        }

        .profile-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .profile-email {
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .order-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .order-id {
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .order-date {
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }

        .order-status-badges {
          display: flex;
          gap: 0.5rem;
        }

        .order-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .order-item {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          gap: 1rem;
          align-items: center;
        }

        .order-item img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        .order-item-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .order-item-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .order-item-qty {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .order-item-price {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .order-footer {
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          text-align: right;
        }

        .order-total {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .loading-container {
          display: flex;
          justify-content: center;
          padding: 3rem;
        }

        .no-orders {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
};

export default Profile;
