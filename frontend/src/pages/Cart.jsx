import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector((state) => state.cart);

    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleRemove = (id, name) => {
        dispatch(removeFromCart(id));
        toast.success(`${name} removed from cart`);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success('Cart cleared');
    };

    if (items.length === 0) {
        return (
            <div className="empty-cart">
                <div className="container">
                    <div className="empty-cart-content">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="120" height="120">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <h2>Your cart is empty</h2>
                        <p>Add some products to get started!</p>
                        <Link to="/products" className="btn btn-primary btn-lg">
                            Browse Products
                        </Link>
                    </div>
                </div>

                <style>{`
          .empty-cart {
            min-height: calc(100vh - var(--header-height) - 200px);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .empty-cart-content {
            text-align: center;
            max-width: 400px;
          }

          .empty-cart-content svg {
            color: var(--text-tertiary);
            margin-bottom: 2rem;
          }

          .empty-cart-content h2 {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: var(--text-primary);
          }

          .empty-cart-content p {
            color: var(--text-secondary);
            margin-bottom: 2rem;
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="cart-page py-8">
            <div className="container">
                <div className="cart-header">
                    <h1 className="page-title">Shopping Cart</h1>
                    <button onClick={handleClearCart} className="btn btn-outline btn-sm">
                        Clear Cart
                    </button>
                </div>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {items.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img src={item.images[0] || 'https://via.placeholder.com/100'} alt={item.name} className="cart-item-image" />

                                <div className="cart-item-details">
                                    <Link to={`/products/${item._id}`} className="cart-item-name">
                                        {item.name}
                                    </Link>
                                    <p className="cart-item-category">{item.category}</p>
                                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)} className="qty-btn">-</button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)} className="qty-btn">+</button>
                                    </div>

                                    <button onClick={() => handleRemove(item._id, item.name)} className="remove-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary">
                        <h3 className="summary-title">Order Summary</h3>

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

                        <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                            Proceed to Checkout
                        </Link>

                        <Link to="/products" className="continue-shopping">
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 100px 1fr auto auto;
          gap: 1.5rem;
          padding: 1.5rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          align-items: center;
        }

        .cart-item-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
        }

        .cart-item-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .cart-item-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .cart-item-name:hover {
          color: var(--primary-600);
        }

        .cart-item-category {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }

        .cart-item-price {
          font-size: 1rem;
          font-weight: 600;
          color: var(--primary-600);
        }

        .cart-item-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.5rem;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .qty-btn:hover {
          background: var(--primary-500);
          color: white;
          border-color: var(--primary-500);
        }

        .qty-value {
          min-width: 30px;
          text-align: center;
          font-weight: 600;
          color: var(--text-primary);
        }

        .remove-btn {
          background: none;
          border: none;
          color: var(--error);
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .cart-item-total {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cart-summary {
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

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }

        .summary-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1.5rem 0;
        }

        .summary-total {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .continue-shopping {
          display: block;
          text-align: center;
          margin-top: 1rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .continue-shopping:hover {
          color: var(--primary-600);
        }

        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }

          .cart-summary {
            position: static;
          }

          .cart-item {
            grid-template-columns: 80px 1fr auto;
            gap: 1rem;
          }

          .cart-item-total {
            grid-column: 2 / 4;
            text-align: right;
          }
        }

        @media (max-width: 640px) {
          .cart-item {
            grid-template-columns: 1fr;
          }

          .cart-item-image {
            width: 100%;
            height: 200px;
          }

          .cart-item-total {
            grid-column: 1;
            text-align: left;
          }
        }
      `}</style>
        </div>
    );
};

export default Cart;
