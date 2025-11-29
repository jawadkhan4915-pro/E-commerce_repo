import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../api/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const { data } = await api.get('/products?limit=8');
            setFeaturedProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Electronics', icon: '💻', color: '#667eea' },
        { name: 'Clothing', icon: '👕', color: '#f093fb' },
        { name: 'Shoes', icon: '👟', color: '#4facfe' },
        { name: 'Accessories', icon: '⌚', color: '#43e97b' },
        { name: 'Home & Garden', icon: '🏡', color: '#fa709a' },
        { name: 'Sports', icon: '⚽', color: '#30cfd0' },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title animate-fade-in">
                            Discover Amazing Products
                        </h1>
                        <p className="hero-subtitle animate-fade-in">
                            Shop the latest trends with unbeatable prices and fast delivery
                        </p>
                        <div className="hero-buttons animate-fade-in">
                            <Link to="/products" className="btn btn-primary btn-lg">
                                Shop Now
                            </Link>
                            <Link to="/products?sort=rating" className="btn btn-outline btn-lg">
                                Best Sellers
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section py-12">
                <div className="container">
                    <h2 className="section-title text-center">Shop by Category</h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                to={`/products?category=${category.name}`}
                                className="category-card"
                                style={{ '--category-color': category.color }}
                            >
                                <div className="category-icon">{category.icon}</div>
                                <h3 className="category-name">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section py-12">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <Link to="/products" className="view-all-link">
                            View All →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="promo-banner">
                <div className="container">
                    <div className="promo-content">
                        <h2 className="promo-title">Special Offer!</h2>
                        <p className="promo-text">
                            Get up to 50% off on selected items. Limited time only!
                        </p>
                        <Link to="/products" className="btn btn-accent btn-lg">
                            Shop Deals
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
        .hero {
          background: var(--gradient-hero);
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') bottom center no-repeat;
          background-size: cover;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2.5rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 3rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .view-all-link {
          color: var(--primary-600);
          font-weight: 600;
          font-size: 1.125rem;
          transition: all var(--transition-fast);
        }

        .view-all-link:hover {
          color: var(--primary-700);
          transform: translateX(5px);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .category-card {
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2.5rem 1.5rem;
          text-align: center;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--category-color) 0%, transparent 100%);
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--category-color);
        }

        .category-card:hover::before {
          opacity: 0.1;
        }

        .category-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .category-name {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
          position: relative;
          z-index: 1;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .promo-banner {
          background: var(--gradient-accent);
          padding: 4rem 0;
          margin: 4rem 0;
          border-radius: var(--radius-xl);
        }

        .promo-content {
          text-align: center;
          color: white;
        }

        .promo-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .promo-text {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 4rem 0;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default Home;
