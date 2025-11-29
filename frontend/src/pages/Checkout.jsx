import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/helpers';
import api from '../api/api';
import toast from 'react-hot-toast';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'Cash on Delivery',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                products: items.map((item) => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.images[0],
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country,
                },
                paymentMethod: formData.paymentMethod,
                totalPrice: totalPrice * 1.1,
                shippingPrice: 0,
                taxPrice: totalPrice * 0.1,
            };

            await api.post('/orders', orderData);
            dispatch(clearCart());
            toast.success('Order placed successfully!');
            navigate('/profile');
        } catch (error) {
            // Error handled by interceptor
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-page py-8">
            <div className="container">
                <h1 className="page-title">Checkout</h1>

                <div className="checkout-layout">
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-section">
                            <h3 className="section-heading">Shipping Address</h3>

                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input" required />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-input" required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Postal Code</label>
                                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="form-input" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Country</label>
                                <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-input" required />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="section-heading">Payment Method</h3>

                            <div className="payment-options">
                                <label className="payment-option">
                                    <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={formData.paymentMethod === 'Cash on Delivery'} onChange={handleChange} />
                                    <span>Cash on Delivery</span>
                                </label>
                                <label className="payment-option">
                                    <input type="radio" name="paymentMethod" value="Credit Card" checked={formData.paymentMethod === 'Credit Card'} onChange={handleChange} />
                                    <span>Credit Card</span>
                                </label>
                                <label className="payment-option">
                                    <input type="radio" name="paymentMethod" value="PayPal" checked={formData.paymentMethod === 'PayPal'} onChange={handleChange} />
                                    <span>PayPal</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </form>

                    <div className="order-summary">
                        <h3 className="summary-title">Order Summary</h3>

                        <div className="order-items">
                            {items.map((item) => (
                                <div key={item._id} className="order-item">
                                    <img src={item.images[0]} alt={item.name} />
                                    <div className="order-item-info">
                                        <p className="order-item-name">{item.name}</p>
                                        <p className="order-item-qty">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="order-item-price">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax</span>
                            <span>{formatPrice(totalPrice * 0.1)}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>{formatPrice(totalPrice * 1.1)}</span>
                        </div>
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

        .checkout-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-section {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2rem;
        }

        .section-heading {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .payment-option:has(input:checked) {
          border-color: var(--primary-500);
          background: var(--primary-50);
        }

        .payment-option input[type="radio"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .payment-option span {
          font-weight: 500;
          color: var(--text-primary);
        }

        .order-summary {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2rem;
          height: fit-content;
          position: sticky;
          top: calc(var(--header-height) + 1rem);
        }

        .summary-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .order-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
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

        .summary-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1.5rem 0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }

        .summary-total {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0;
        }

        @media (max-width: 1024px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }

          .order-summary {
            position: static;
          }
        }
      `}</style>
        </div>
    );
};

export default Checkout;
