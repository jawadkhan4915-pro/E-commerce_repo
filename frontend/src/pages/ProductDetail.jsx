import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import Rating from '../components/Rating';
import { formatPrice } from '../utils/helpers';
import api from '../api/api';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
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
        if (product.stock > 0) {
            for (let i = 0; i < quantity; i++) {
                dispatch(addToCart(product));
            }
            toast.success(`Added ${quantity} item(s) to cart!`);
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
        return <div className="container py-8"><p>Product not found</p></div>;
    }

    return (
        <div className="product-detail-page py-8">
            <div className="container">
                <div className="product-detail-grid">
                    {/* Image Gallery */}
                    <div className="product-images">
                        <div className="main-image">
                            <img src={product.images[selectedImage] || 'https://via.placeholder.com/600'} alt={product.name} />
                        </div>
                        {product.images.length > 1 && (
                            <div className="image-thumbnails">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-info-section">
                        <div className="product-category-badge">{product.category}</div>
                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-rating-section">
                            <Rating value={product.ratings} numReviews={product.numReviews} />
                        </div>

                        <div className="product-price-section">
                            <span className="product-price">{formatPrice(product.price)}</span>
                            <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        <p className="product-description">{product.description}</p>

                        {product.stock > 0 && (
                            <div className="quantity-section">
                                <label className="quantity-label">Quantity:</label>
                                <div className="quantity-controls">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn">-</button>
                                    <span className="qty-value">{quantity}</span>
                                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="qty-btn">+</button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%' }}
                        >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="reviews-section">
                    <h2 className="reviews-title">Customer Reviews</h2>
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="reviews-list">
                            {product.reviews.map((review) => (
                                <div key={review._id} className="review-card">
                                    <div className="review-header">
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} showReviews={false} />
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-reviews">No reviews yet</p>
                    )}
                </div>
            </div>

            <style>{`
        .loading-page {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .product-images {
          position: sticky;
          top: calc(var(--header-height) + 2rem);
          height: fit-content;
        }

        .main-image {
          width: 100%;
          aspect-ratio: 1;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--bg-secondary);
          margin-bottom: 1rem;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-thumbnails {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 0.75rem;
        }

        .thumbnail {
          aspect-ratio: 1;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 2px solid var(--border-color);
          background: var(--bg-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          padding: 0;
        }

        .thumbnail:hover,
        .thumbnail.active {
          border-color: var(--primary-500);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .product-category-badge {
          display: inline-block;
          width: fit-content;
          padding: 0.5rem 1rem;
          background: var(--primary-100);
          color: var(--primary-700);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .product-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .product-price-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .product-price {
          font-size: 2rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stock-badge {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .stock-badge.in-stock {
          background: #d1fae5;
          color: #065f46;
        }

        .stock-badge.out-of-stock {
          background: #fee2e2;
          color: #991b1b;
        }

        .product-description {
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 1.125rem;
        }

        .quantity-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .quantity-label {
          font-weight: 600;
          color: var(--text-primary);
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.5rem;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
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
          min-width: 40px;
          text-align: center;
          font-weight: 600;
          color: var(--text-primary);
        }

        .reviews-section {
          margin-top: 4rem;
          padding-top: 4rem;
          border-top: 1px solid var(--border-color);
        }

        .reviews-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .review-comment {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .no-reviews {
          text-align: center;
          color: var(--text-secondary);
          padding: 2rem;
        }

        @media (max-width: 1024px) {
          .product-detail-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .product-images {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .product-title {
            font-size: 2rem;
          }

          .product-price {
            font-size: 1.75rem;
          }
        }
      `}</style>
        </div>
    );
};

export default ProductDetail;
