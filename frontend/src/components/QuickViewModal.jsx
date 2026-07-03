import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiCheck, FiStar, FiHeart, FiShield, FiTruck } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/helpers';
import Rating from './Rating';
import toast from 'react-hot-toast';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        if (product.stock > 0) {
            for (let i = 0; i < quantity; i++) {
                dispatch(addToCart(product));
            }
            toast.success(`Added ${quantity} ${product.name} to cart!`);
            onClose();
        }
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        if (!isWishlisted) {
            toast.success('Saved to your wishlist! ❤️');
        } else {
            toast('Removed from wishlist');
        }
    };

    return (
        <AnimatePresence>
            <div className="quickview-backdrop" onClick={onClose}>
                <motion.div
                    className="quickview-modal"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="quickview-close-btn" onClick={onClose} aria-label="Close modal">
                        <FiX size={22} />
                    </button>

                    <div className="quickview-grid">
                        {/* Gallery Section */}
                        <div className="quickview-gallery">
                            <div className="quickview-main-img-wrapper">
                                <img
                                    src={product.images?.[selectedImage] || product.images?.[0] || 'https://via.placeholder.com/400'}
                                    alt={product.name}
                                    className="quickview-main-img"
                                />
                                {product.stock === 0 && (
                                    <span className="quickview-out-badge">Out of Stock</span>
                                )}
                            </div>

                            {product.images && product.images.length > 1 && (
                                <div className="quickview-thumbs">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`quickview-thumb-btn ${selectedImage === idx ? 'active' : ''}`}
                                        >
                                            <img src={img} alt="" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="quickview-details">
                            <div className="quickview-category-row">
                                <span className="quickview-category">{product.category}</span>
                                <button
                                    onClick={toggleWishlist}
                                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                                    title="Add to Wishlist"
                                >
                                    <FiHeart size={20} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : 'currentColor'} />
                                </button>
                            </div>

                            <h2 className="quickview-title">{product.name}</h2>

                            <div className="quickview-rating-row">
                                <Rating value={product.ratings || 4.5} numReviews={product.numReviews || 12} />
                            </div>

                            <div className="quickview-price-row">
                                <span className="quickview-price">{formatPrice(product.price)}</span>
                                <span className={`quickview-stock-tag ${product.stock > 0 ? 'in-stock' : 'no-stock'}`}>
                                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Sold Out'}
                                </span>
                            </div>

                            <p className="quickview-description">
                                {product.description || 'Elevate your experience with this premium crafted product designed for maximum performance and style.'}
                            </p>

                            {/* Quantity Selector */}
                            {product.stock > 0 && (
                                <div className="quickview-quantity-wrapper">
                                    <label className="quickview-qty-label">Quantity:</label>
                                    <div className="quickview-qty-controls">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn">-</button>
                                        <span className="qty-val">{quantity}</span>
                                        <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="qty-btn">+</button>
                                    </div>
                                </div>
                            )}

                            {/* Trust Perks */}
                            <div className="quickview-perks">
                                <div className="perk-item">
                                    <FiTruck className="perk-icon" />
                                    <span>Fast Express Delivery</span>
                                </div>
                                <div className="perk-item">
                                    <FiShield className="perk-icon" />
                                    <span>2-Year Official Warranty</span>
                                </div>
                            </div>

                            {/* Add to Cart CTA */}
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="btn btn-primary btn-lg quickview-cta"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FiShoppingCart size={20} />
                                {product.stock > 0 ? 'Add to Shopping Cart' : 'Currently Unavailable'}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .quickview-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .quickview-modal {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          max-width: 850px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          padding: 2.5rem;
        }

        .quickview-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          z-index: 10;
        }

        .quickview-close-btn:hover {
          background: var(--error);
          color: white;
          border-color: var(--error);
        }

        .quickview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .quickview-main-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
        }

        .quickview-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .quickview-out-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--error);
          color: white;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .quickview-thumbs {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          overflow-x: auto;
        }

        .quickview-thumb-btn {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 2px solid var(--border-color);
          background: var(--bg-secondary);
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
        }

        .quickview-thumb-btn.active {
          border-color: var(--primary-600);
        }

        .quickview-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .quickview-details {
          display: flex;
          flex-direction: column;
        }

        .quickview-category-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .quickview-category {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.75px;
          color: var(--primary-600);
        }

        .wishlist-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-tertiary);
          padding: 0.4rem;
          border-radius: 50%;
          transition: all var(--transition-fast);
        }

        .wishlist-btn:hover {
          color: var(--error);
          background: rgba(239, 68, 68, 0.1);
        }

        .quickview-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }

        .quickview-rating-row {
          margin-bottom: 1rem;
        }

        .quickview-price-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .quickview-price {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--primary-600);
        }

        .quickview-stock-tag {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .quickview-stock-tag.in-stock {
          background: #d1fae5;
          color: #065f46;
        }

        .quickview-stock-tag.no-stock {
          background: #fee2e2;
          color: #991b1b;
        }

        .quickview-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .quickview-quantity-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .quickview-qty-label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .quickview-qty-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.25rem 0.5rem;
        }

        .qty-btn {
          width: 30px;
          height: 30px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qty-val {
          font-weight: 700;
          min-width: 30px;
          text-align: center;
        }

        .quickview-perks {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          padding: 0.85rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .perk-icon {
          color: var(--primary-600);
        }

        .quickview-cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .quickview-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .quickview-modal {
            padding: 1.5rem;
          }
        }
      `}</style>
        </AnimatePresence>
    );
};

export default QuickViewModal;
