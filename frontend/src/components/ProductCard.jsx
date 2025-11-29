import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import Rating from './Rating';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (product.stock > 0) {
            dispatch(addToCart(product));
            toast.success('Added to cart!');
        } else {
            toast.error('Product out of stock');
        }
    };

    return (
        <Link to={`/products/${product._id}`} className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.images[0] || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="product-image"
                />
                {product.stock === 0 && (
                    <div className="out-of-stock-badge">Out of Stock</div>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>

                <div className="product-rating">
                    <Rating value={product.ratings} numReviews={product.numReviews} />
                </div>

                <div className="product-footer">
                    <div className="product-price">{formatPrice(product.price)}</div>
                    <button
                        className="btn-add-cart"
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            width="20"
                            height="20"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <style>{`
        .product-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: all var(--transition-base);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-300);
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
          transform: scale(1.1);
        }

        .out-of-stock-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--error);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: 700;
          text-transform: uppercase;
        }

        .product-info {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-size: var(--font-size-lg);
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-category {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }

        .product-rating {
          margin-bottom: 1rem;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .product-price {
          font-size: var(--font-size-xl);
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-add-cart {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
          box-shadow: var(--shadow-md);
        }

        .btn-add-cart:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: var(--shadow-lg);
        }

        .btn-add-cart:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
        </Link>
    );
};

export default ProductCard;
