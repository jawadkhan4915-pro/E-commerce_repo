import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/helpers';
import api from '../api/api';
import toast from 'react-hot-toast';
import { FiCreditCard, FiLock, FiCheckCircle, FiShield, FiTruck, FiPrinter, FiArrowRight } from 'react-icons/fi';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [createdOrder, setCreatedOrder] = useState(null);

    const [formData, setFormData] = useState({
        address: '124 Innovation Avenue, Tech Park',
        city: 'San Francisco',
        postalCode: '94107',
        country: 'United States',
        paymentMethod: 'Credit Card',
        cardNumber: '4532 •••• •••• 8892',
        cardHolder: 'John Doe',
        cardExpiry: '12/28',
        cardCvc: '888'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const activeDiscount = React.useMemo(() => {
        const saved = localStorage.getItem('activeCoupon');
        return saved ? JSON.parse(saved) : null;
    }, []);

    const discountAmount = activeDiscount ? (totalPrice * activeDiscount.percent) / 100 : 0;
    const taxAmount = (totalPrice - discountAmount) * 0.1;
    const finalTotal = totalPrice - discountAmount + taxAmount;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setLoading(true);

        // If paying with Credit Card or PayPal, simulate 1.5s secure gateway processing
        if (formData.paymentMethod !== 'Cash on Delivery') {
            setIsProcessingPayment(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsProcessingPayment(false);
        }

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
                paymentStatus: formData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
                totalPrice: finalTotal,
                shippingPrice: 0,
                taxPrice: taxAmount,
            };

            const response = await api.post('/orders', orderData);
            const newOrder = response.data;

            dispatch(clearCart());
            localStorage.removeItem('activeCoupon');
            toast.success('🎉 Order placed successfully!');
            setCreatedOrder(newOrder);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    // If order has been successfully placed, display the Confirmation Receipt
    if (createdOrder) {
        return (
            <div className="checkout-success-page py-12">
                <div className="container max-w-2xl mx-auto">
                    <div className="card card-glass p-8 text-center rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="success-icon-wrapper mb-6">
                            <FiCheckCircle size={72} className="text-emerald-500 mx-auto animate-bounce" />
                        </div>

                        <span className="badge badge-success px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
                            Payment Confirmed
                        </span>

                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                            Thank You For Your Order!
                        </h1>

                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Your order <strong className="text-indigo-600 dark:text-indigo-400">#{createdOrder._id?.slice(-8).toUpperCase()}</strong> has been confirmed and is currently being processed.
                        </p>

                        <div className="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-6 text-left mb-8 border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-gray-900 dark:text-white border-b pb-3 mb-4 flex justify-between items-center">
                                <span>Order Summary</span>
                                <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                            </h3>

                            <div className="space-y-3 mb-4">
                                {createdOrder.products?.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex justify-between">
                                    <span>Payment Method:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{createdOrder.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Payment Status:</span>
                                    <span className={`font-semibold ${createdOrder.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {createdOrder.paymentStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-base text-gray-900 dark:text-white pt-2 border-t">
                                    <span>Total Amount:</span>
                                    <span className="text-indigo-600 dark:text-indigo-400">{formatPrice(createdOrder.totalPrice)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.print()}
                                className="btn btn-secondary flex items-center justify-center gap-2"
                            >
                                <FiPrinter size={18} /> Print Receipt
                            </button>
                            <Link
                                to="/profile/orders"
                                className="btn btn-primary flex items-center justify-center gap-2"
                            >
                                Track Order <FiArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page py-8">
            {/* Secure Payment Processing Overlay */}
            {isProcessingPayment && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white">
                    <div className="spinner-border animate-spin w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
                    <h3 className="text-xl font-bold mb-2">Processing Payment...</h3>
                    <p className="text-sm text-gray-300 flex items-center gap-2">
                        <FiShield className="text-emerald-400" /> Connecting to 256-bit encrypted Gateway
                    </p>
                </div>
            )}

            <div className="container">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <FiLock className="text-emerald-500" /> 256-Bit SSL Encrypted Checkout
                </div>

                <h1 className="page-title">Checkout</h1>

                <div className="checkout-layout">
                    <form onSubmit={handleSubmit} className="checkout-form">
                        {/* Shipping Section */}
                        <div className="form-section">
                            <h3 className="section-heading flex items-center gap-2">
                                <FiTruck className="text-indigo-600" /> Shipping Address
                            </h3>

                            <div className="form-group">
                                <label className="form-label">Street Address</label>
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

                        {/* Payment Method Section */}
                        <div className="form-section">
                            <h3 className="section-heading flex items-center gap-2">
                                <FiCreditCard className="text-indigo-600" /> Payment Details
                            </h3>

                            <div className="payment-options mb-6">
                                <label className="payment-option">
                                    <input type="radio" name="paymentMethod" value="Credit Card" checked={formData.paymentMethod === 'Credit Card'} onChange={handleChange} />
                                    <span className="font-semibold flex items-center gap-2">
                                        💳 Credit / Debit Card (Stripe Instant)
                                    </span>
                                </label>
                                <label className="payment-option">
                                    <input type="radio" name="paymentMethod" value="PayPal" checked={formData.paymentMethod === 'PayPal'} onChange={handleChange} />
                                    <span className="font-semibold flex items-center gap-2">
                                        🅿️ PayPal Express
                                    </span>
                                </label>
                                <label className="payment-option">
                                    <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={formData.paymentMethod === 'Cash on Delivery'} onChange={handleChange} />
                                    <span className="font-semibold flex items-center gap-2">
                                        💵 Cash on Delivery
                                    </span>
                                </label>
                            </div>

                            {/* Credit Card Input Widget */}
                            {formData.paymentMethod === 'Credit Card' && (
                                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl text-white shadow-xl border border-indigo-500/30 mb-4 space-y-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs uppercase tracking-widest text-indigo-300 font-mono">Simulated Card Payment</span>
                                        <FiShield className="text-emerald-400 text-xl" />
                                    </div>

                                    <div className="form-group">
                                        <label className="text-xs text-indigo-200 uppercase font-bold tracking-wider">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            className="form-input bg-slate-800/80 border-indigo-700 text-white font-mono"
                                            placeholder="4532 •••• •••• ••••"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label className="text-xs text-indigo-200 uppercase font-bold tracking-wider">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleChange}
                                                className="form-input bg-slate-800/80 border-indigo-700 text-white font-mono"
                                                placeholder="MM/YY"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="text-xs text-indigo-200 uppercase font-bold tracking-wider">CVC / CVV</label>
                                            <input
                                                type="password"
                                                name="cardCvc"
                                                value={formData.cardCvc}
                                                onChange={handleChange}
                                                maxLength="4"
                                                className="form-input bg-slate-800/80 border-indigo-700 text-white font-mono"
                                                placeholder="•••"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg shadow-xl" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Processing Transaction...' : `Pay & Place Order (${formatPrice(finalTotal)})`}
                        </button>
                    </form>

                    {/* Right Order Summary */}
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
                        {activeDiscount && (
                            <div className="summary-row text-emerald-600 font-semibold">
                                <span>Discount ({activeDiscount.code})</span>
                                <span>-{formatPrice(discountAmount)}</span>
                            </div>
                        )}
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="text-emerald-600 font-medium">Free</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (10%)</span>
                            <span>{formatPrice(taxAmount)}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>{formatPrice(finalTotal)}</span>
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
          background: rgba(99, 102, 241, 0.05);
        }

        .payment-option input[type="radio"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
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
