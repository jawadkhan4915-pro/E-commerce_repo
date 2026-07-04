import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
    FiShoppingCart, 
    FiHeart, 
    FiTruck, 
    FiShield, 
    FiRotateCcw, 
    FiCheck, 
    FiStar, 
    FiArrowLeft,
    FiUser
} from 'react-icons/fi';
import { addToCart } from '../store/slices/cartSlice';
import Rating from '../components/Rating';
import { formatPrice } from '../utils/helpers';
import api from '../api/api';
import toast from 'react-hot-toast';

import { useSelector } from 'react-redux';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Review Form state
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/products/${id}`);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product && product.stock > 0) {
            for (let i = 0; i < quantity; i++) {
                dispatch(addToCart(product));
            }
            toast.success(`Added ${quantity} ${product.name} to cart!`);
        }
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        if (!isWishlisted) {
            toast.success('Added to wishlist ❤️');
        } else {
            toast('Removed from wishlist');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            return toast.error('Please enter a review comment');
        }
        setSubmittingReview(true);
        try {
            await api.post(`/products/${id}/reviews`, {
                rating: Number(newRating),
                comment: newComment,
            });
            toast.success('Review submitted successfully! ⭐');
            setNewComment('');
            setShowReviewForm(false);
            fetchProduct();
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to submit review';
            toast.error(msg);
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-page">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-12 text-center">
                <h2>Product Not Found</h2>
                <Link to="/products" className="btn btn-primary mt-4">
                    Back to Catalog
                </Link>
            </div>
        );
    }

    // Calculate Star Rating Breakdown
    const reviewsCount = product.reviews ? product.reviews.length : 0;
    const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => {
        const count = product.reviews
            ? product.reviews.filter((r) => Math.round(r.rating) === stars).length
            : 0;
        const percentage = reviewsCount > 0 ? (count / reviewsCount) * 100 : 0;
        return { stars, count, percentage };
    });

    return (
        <motion.div 
            className="product-detail-page py-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container">
                {/* Back Link */}
                <Link to="/products" className="back-link mb-6 inline-flex items-center gap-2">
                    <FiArrowLeft /> Back to Catalog
                </Link>

                <div className="product-detail-grid">
                    {/* Image Gallery */}
                    <div className="product-images-col">
                        <div className="main-image-frame">
                            <img 
                                src={product.images?.[selectedImage] || product.images?.[0] || 'https://via.placeholder.com/600'} 
                                alt={product.name} 
                                className="main-img"
                            />
                            {product.stock === 0 && (
                                <span className="out-badge">Out of Stock</span>
                            )}
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="image-thumbnails flex gap-3 mt-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`thumb-btn ${selectedImage === idx ? 'active' : ''}`}
                                    >
                                        <img src={img} alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Information Section */}
                    <div className="product-info-col">
                        <div className="category-wishlist-row flex justify-between items-center mb-2">
                            <span className="cat-badge">{product.category}</span>
                            <motion.button 
                                onClick={toggleWishlist}
                                className={`wishlist-icon-btn ${isWishlisted ? 'active' : ''}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Wishlist"
                            >
                                <FiHeart size={20} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : 'currentColor'} />
                            </motion.button>
                        </div>

                        <h1 className="detail-title">{product.name}</h1>

                        <div className="rating-row mb-4">
                            <Rating value={product.ratings} numReviews={product.numReviews} />
                        </div>

                        <div className="price-stock-row flex items-center gap-4 mb-6">
                            <span className="price-tag">{formatPrice(product.price)}</span>
                            <span className={`stock-tag ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                                {product.stock > 0 ? `${product.stock} Units In Stock` : 'Out of Stock'}
                            </span>
                        </div>

                        <p className="description-text mb-6">{product.description}</p>

                        {/* Quantity controls */}
                        {product.stock > 0 && (
                            <div className="quantity-wrapper flex items-center gap-4 mb-6">
                                <label className="qty-label font-semibold">Select Quantity:</label>
                                <div className="qty-picker">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn">-</button>
                                    <span className="qty-val">{quantity}</span>
                                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="qty-btn">+</button>
                                </div>
                            </div>
                        )}

                        <div className="action-buttons mb-8">
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="btn btn-primary btn-lg full-cta"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FiShoppingCart size={20} />
                                {product.stock > 0 ? `Add ${quantity} to Shopping Cart` : 'Currently Out of Stock'}
                            </motion.button>
                        </div>

                        {/* Guarantee Perks */}
                        <div className="guarantee-cards-row grid grid-cols-3 gap-3">
                            <div className="perk-box">
                                <FiTruck className="perk-icon" />
                                <div>
                                    <span className="perk-title">Free Delivery</span>
                                    <span className="perk-sub">Orders over $50</span>
                                </div>
                            </div>
                            <div className="perk-box">
                                <FiRotateCcw className="perk-icon" />
                                <div>
                                    <span className="perk-title">30 Days Return</span>
                                    <span className="perk-sub">Hassle-free exchange</span>
                                </div>
                            </div>
                            <div className="perk-box">
                                <FiShield className="perk-icon" />
                                <div>
                                    <span className="perk-title">2-Year Warranty</span>
                                    <span className="perk-sub">Official coverage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="reviews-container mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                        <div>
                            <h2 className="reviews-heading">Customer Reviews & Ratings</h2>
                            <p className="text-sm text-gray-500">Based on {reviewsCount} verified purchase review{reviewsCount !== 1 ? 's' : ''}</p>
                        </div>
                        {isAuthenticated ? (
                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="btn btn-secondary btn-sm flex items-center gap-2"
                            >
                                <FiStar /> {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                            </button>
                        ) : (
                            <Link to="/login" className="btn btn-outline btn-sm">
                                Sign in to write a review
                            </Link>
                        )}
                    </div>

                    {/* Star Breakdown Widget & Write Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Rating Breakdown */}
                        <div className="card p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 flex flex-col justify-center">
                            <div className="text-center mb-4">
                                <span className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                                    {(product.ratings || 0).toFixed(1)}
                                </span>
                                <span className="text-lg text-gray-400"> / 5</span>
                                <div className="flex justify-center mt-1">
                                    <Rating value={product.ratings} showReviews={false} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                {ratingBreakdown.map((item) => (
                                    <div key={item.stars} className="flex items-center gap-3 text-xs">
                                        <span className="w-12 font-bold flex items-center gap-1">
                                            {item.stars} <FiStar className="text-amber-400" size={12} />
                                        </span>
                                        <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                                            <div
                                                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="w-8 text-right font-medium text-gray-500">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Review Form or Promo Banner */}
                        <div className="lg:col-span-2">
                            {showReviewForm ? (
                                <motion.form
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onSubmit={handleReviewSubmit}
                                    className="card p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-indigo-500/30"
                                >
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <FiStar className="text-amber-400" /> Share Your Product Feedback
                                    </h3>
                                    <div className="mb-4">
                                        <label className="form-label">Overall Rating</label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewRating(star)}
                                                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                                                >
                                                    <FiStar
                                                        className={star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}
                                                    />
                                                </button>
                                            ))}
                                            <span className="text-sm font-semibold ml-2 text-indigo-400">{newRating} of 5 Stars</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Your Review Comment</label>
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            rows="3"
                                            className="form-textarea"
                                            placeholder="What did you like or dislike about this item?"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowReviewForm(false)}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submittingReview}
                                            className="btn btn-primary btn-sm flex items-center gap-2"
                                        >
                                            {submittingReview ? 'Submitting...' : 'Post Review'}
                                        </button>
                                    </div>
                                </motion.form>
                            ) : (
                                <div className="card p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 h-full flex flex-col justify-center items-center text-center">
                                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">Have you used this product?</h4>
                                    <p className="text-xs text-gray-500 max-w-md mb-4">Your honest feedback helps thousands of customers make the right purchase decision.</p>
                                    {isAuthenticated ? (
                                        <button
                                            onClick={() => setShowReviewForm(true)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Write a Verified Review
                                        </button>
                                    ) : (
                                        <Link to="/login" className="btn btn-primary btn-sm">
                                            Sign In to Share Feedback
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="reviews-list grid gap-4">
                            {product.reviews.map((rev) => (
                                <div key={rev._id} className="review-item-card">
                                    <div className="review-user-header flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="user-avatar-circle">
                                                <FiUser />
                                            </div>
                                            <strong className="user-name">{rev.name}</strong>
                                        </div>
                                        <Rating value={rev.rating} showReviews={false} />
                                    </div>
                                    <p className="review-text">{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-reviews-box text-center py-8 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
                            <p className="text-gray-500 text-sm">No reviews yet for this product. Be the first to leave a feedback!</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .back-link {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .back-link:hover {
          color: var(--primary-600);
        }

        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: start;
        }

        .main-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
        }

        .main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .out-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--error);
          color: white;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .thumb-btn {
          width: 70px;
          height: 70px;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 2px solid var(--border-color);
          background: var(--bg-secondary);
          cursor: pointer;
          padding: 0;
        }

        .thumb-btn.active {
          border-color: var(--primary-600);
        }

        .thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cat-badge {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.75px;
          color: var(--primary-600);
          background: var(--primary-50);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .wishlist-icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .detail-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }

        .price-tag {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary-600);
        }

        .stock-tag {
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .stock-tag.in-stock {
          background: #d1fae5;
          color: #065f46;
        }

        .stock-tag.out-stock {
          background: #fee2e2;
          color: #991b1b;
        }

        .description-text {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .qty-picker {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.25rem 0.5rem;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-weight: 700;
          cursor: pointer;
        }

        .qty-val {
          font-weight: 700;
          min-width: 30px;
          text-align: center;
        }

        .full-cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .perk-box {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .perk-icon {
          color: var(--primary-600);
          font-size: 1.25rem;
        }

        .perk-title {
          display: block;
          font-weight: 700;
          font-size: 0.8rem;
          color: var(--text-primary);
        }

        .perk-sub {
          display: block;
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        .reviews-heading {
          font-size: 1.6rem;
          font-weight: 800;
        }

        .review-item-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
        }

        .user-avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--primary-100);
          color: var(--primary-700);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-page {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 992px) {
          .product-detail-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .guarantee-cards-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </motion.div>
    );
};

export default ProductDetail;
