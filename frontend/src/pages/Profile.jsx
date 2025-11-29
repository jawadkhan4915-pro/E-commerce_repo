import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { formatPrice, formatDate } from '../utils/helpers';
import api from '../api/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    setUploading(true);
    try {
      const { data } = await api.put('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(setCredentials(data));
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error(error.response?.data?.message || 'Failed to update avatar');
    } finally {
      setUploading(false);
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
              <div className="avatar-container">
                <img
                  src={userInfo?.avatar || 'https://via.placeholder.com/100'}
                  alt={userInfo?.name}
                  className="profile-avatar"
                />
                <button
                  className="avatar-edit-btn"
                  onClick={() => fileInputRef.current.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <div className="spinner-sm"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  )}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
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

        .avatar-container {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .profile-avatar {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-full);
          border: 3px solid var(--primary-500);
          object-fit: cover;
        }

        .avatar-edit-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 32px;
          height: 32px;
          background: var(--primary-600);
          color: white;
          border: 2px solid var(--bg-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .avatar-edit-btn:hover {
          background: var(--primary-700);
          transform: scale(1.1);
        }

        .avatar-edit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner-sm {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
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
