import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiEye, FiHeart, FiShoppingCart, FiCamera } from 'react-icons/fi';
import { addToCart } from '../store/slices/cartSlice';
import Rating from './Rating';
import QuickViewModal from './QuickViewModal';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.stock > 0) {
            dispatch(addToCart(product));
            toast.success(`Added ${product.name} to cart!`);
        } else {
            toast.error('Product out of stock');
        }
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setQuickViewOpen(true);
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        if (!isWishlisted) {
            toast.success('Saved to wishlist ❤️');
        } else {
            toast('Removed from wishlist');
        }
    };

    const handleTryOn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('open-tryon', { detail: { product } }));
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="product-card-container"
            >
                <Link to={`/products/${product._id}`} className="product-card">
                    <div className="product-image-wrapper">
                        <img
                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
                            alt={product.name}
                            className="product-image"
                            loading="lazy"
                        />
                        {product.stock === 0 ? (
                            <div className="out-of-stock-badge">Out of Stock</div>
                        ) : (
                            <div className="product-badge">Top Rated</div>
                        )}

                        {/* Top Action Buttons (Wishlist & Quick View) */}
                        <div className="card-top-actions">
                            <motion.button
                                type="button"
                                onClick={handleToggleWishlist}
                                className={`card-action-btn wishlist-icon-btn ${isWishlisted ? 'active' : ''}`}
                                title="Wishlist"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiHeart size={18} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : 'currentColor'} />
                            </motion.button>
                        </div>

                        {/* Quick View Floating Button overlay */}
                        <div className="quickview-overlay">
                            <motion.button
                                type="button"
                                onClick={handleQuickView}
                                className="quickview-overlay-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiEye size={16} /> Quick View
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={handleTryOn}
                                className="card-tryon-btn"
                                title="Virtual Try-On"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiCamera size={15} /> Try On
                            </motion.button>
                        </div>
                    </div>

                    <div className="product-info">
                        <span className="product-category">{product.category}</span>
                        <h3 className="product-name">{product.name}</h3>

                        <div className="product-rating">
                            <Rating value={product.ratings} numReviews={product.numReviews} />
                        </div>

                        <div className="product-footer">
                            <div className="product-price">{formatPrice(product.price)}</div>
                            <motion.button
                                type="button"
                                className="btn-add-cart"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                title="Add to Cart"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiShoppingCart size={18} />
                            </motion.button>
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Quick View Modal */}
            <QuickViewModal
                product={product}
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
            />

            <style>{`
        .product-card-container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .product-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: border-color var(--transition-base), box-shadow var(--transition-base);
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
          position: relative;
        }

        .product-card:hover {
          box-shadow: 0 15px 30px -10px rgba(99, 102, 241, 0.15);
          border-color: var(--primary-400);
        }

        .product-image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 100%;
          overflow: hidden;
          background: var(--bg-secondary);
        }

        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .product-card:hover .product-image {
          transform: scale(1.08);
        }

        .product-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(99, 102, 241, 0.9);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
        }

        .out-of-stock-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: var(--error);
          color: white;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          z-index: 2;
        }

        .card-top-actions {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .card-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: all var(--transition-fast);
        }

        .wishlist-icon-btn.active {
          border-color: rgba(239, 68, 68, 0.4);
          background: rgba(239, 68, 68, 0.05);
        }

        .quickview-overlay {
          position: absolute;
          bottom: 0.75rem;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all var(--transition-base);
          z-index: 3;
        }

        .product-card:hover .quickview-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .quickview-overlay-btn {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          backdrop-filter: blur(6px);
        }

        .quickview-overlay-btn:hover {
          background: var(--primary-600);
          color: white;
          border-color: var(--primary-600);
        }

        .card-tryon-btn {
          background: linear-gradient(135deg, #6366f1, #ec4899);
          color: white;
          border: none;
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 4px 12px rgba(99,102,241,0.35);
        }

        .card-tryon-btn:hover {
          box-shadow: 0 6px 18px rgba(99,102,241,0.55);
        }


        .product-info {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-category {
          font-size: 0.75rem;
          color: var(--primary-600);
          text-transform: uppercase;
          letter-spacing: 0.75px;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .product-name {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.35;
        }

        .product-rating {
          margin-bottom: 1rem;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-color);
        }

        .product-price {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .btn-add-cart {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .btn-add-cart:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>
        </>
    );
};

export default ProductCard;
