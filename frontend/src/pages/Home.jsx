import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FiShoppingBag, 
    FiTrendingUp, 
    FiTruck, 
    FiShield, 
    FiClock, 
    FiArrowRight, 
    FiGift, 
    FiCheckCircle,
    FiZap
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import api from '../api/api';
import toast from 'react-hot-toast';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [couponClaimed, setCouponClaimed] = useState(false);

    // Flash sale countdown timer state (Hours, Minutes, Seconds)
    const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    // Countdown Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const { data } = await api.get('/products?limit=8');
            setFeaturedProducts(data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            setCouponClaimed(true);
            toast.success('🎉 Code "SHOP20" claimed! Check your email for details.');
        }
    };

    const categories = [
        { name: 'Electronics', icon: '💻', count: '120+ Products', color: '#6366f1' },
        { name: 'Clothing', icon: '👕', count: '350+ Products', color: '#ec4899' },
        { name: 'Shoes', icon: '👟', count: '90+ Products', color: '#3b82f6' },
        { name: 'Accessories', icon: '⌚', count: '210+ Products', color: '#10b981' },
        { name: 'Home & Garden', icon: '🏡', count: '180+ Products', color: '#f59e0b' },
        { name: 'Sports', icon: '⚽', count: '140+ Products', color: '#8b5cf6' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className="home-page">
            {/* Hero Banner */}
            <section className="hero">
                <div className="container">
                    <div className="hero-grid">
                        <motion.div 
                            className="hero-text-col"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="hero-top-badge">
                                <FiZap className="badge-icon" /> Next-Gen Shopping Experience
                            </div>
                            <h1 className="hero-title">
                                Redefining Luxury & Style For <span className="gradient-text">Everyone.</span>
                            </h1>
                            <p className="hero-subtitle">
                                Discover handpicked trending electronics, fashion, and everyday essentials with lightning-fast delivery and top tier customer satisfaction.
                            </p>

                            <div className="hero-buttons">
                                <Link to="/products" className="btn btn-primary btn-lg flex items-center gap-2">
                                    <FiShoppingBag /> Explore Store
                                </Link>
                                <Link to="/products?sort=rating" className="btn btn-secondary btn-lg flex items-center gap-2">
                                    <FiTrendingUp /> Best Sellers
                                </Link>
                            </div>

                            {/* Trust Pill Bar */}
                            <div className="trust-pills-row">
                                <div className="trust-pill">
                                    <FiTruck className="pill-icon" /> Free Shipping Over $50
                                </div>
                                <div className="trust-pill">
                                    <FiShield className="pill-icon" /> 100% Genuine Products
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="hero-image-col"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="hero-card-stack">
                                <div className="hero-glass-card main-card">
                                    <img 
                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80" 
                                        alt="Featured Smart Watch" 
                                        className="hero-card-img" 
                                    />
                                    <div className="hero-card-info">
                                        <span className="card-tag">Hot Deal</span>
                                        <h4>Premium Edition Smart Watch</h4>
                                        <p className="price">$199.99 <span className="old-price">$299.99</span></p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Flash Sale Countdown Section */}
            <section className="flash-sale-section py-8">
                <div className="container">
                    <div className="flash-sale-card">
                        <div className="flash-sale-header">
                            <div className="flash-title-group">
                                <FiClock className="flash-icon" />
                                <div>
                                    <h3 className="flash-title">Flash Sale Ending Soon!</h3>
                                    <p className="flash-subtitle">Grab exclusive discounts up to 50% off before time runs out</p>
                                </div>
                            </div>

                            <div className="timer-boxes">
                                <div className="timer-box">
                                    <span className="timer-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                                    <span className="timer-lbl">Hours</span>
                                </div>
                                <span className="timer-colon">:</span>
                                <div className="timer-box">
                                    <span className="timer-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    <span className="timer-lbl">Mins</span>
                                </div>
                                <span className="timer-colon">:</span>
                                <div className="timer-box">
                                    <span className="timer-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    <span className="timer-lbl">Secs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section py-12">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Browse By Category</h2>
                        <p className="section-subtitle">Find high quality items tailored to your needs</p>
                    </div>

                    <motion.div 
                        className="categories-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {categories.map((cat) => (
                            <motion.div key={cat.name} variants={itemVariants}>
                                <Link
                                    to={`/products?category=${cat.name}`}
                                    className="category-card"
                                    style={{ '--cat-color': cat.color }}
                                >
                                    <div className="cat-icon-wrapper">{cat.icon}</div>
                                    <h3 className="cat-name">{cat.name}</h3>
                                    <span className="cat-count">{cat.count}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Products Grid */}
            <section className="featured-section py-12">
                <div className="container">
                    <div className="section-header flex justify-between items-center mb-8">
                        <div>
                            <h2 className="section-title">Featured Products</h2>
                            <p className="section-subtitle">Handpicked favorites selected for exceptional quality</p>
                        </div>
                        <Link to="/products" className="view-all-link flex items-center gap-1">
                            Browse Catalog <FiArrowRight />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <motion.div 
                            className="products-grid"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {featuredProducts.map((product) => (
                                <motion.div key={product._id} variants={itemVariants}>
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Newsletter Coupon Banner */}
            <section className="newsletter-section py-12">
                <div className="container">
                    <div className="newsletter-card">
                        <div className="newsletter-content">
                            <div className="newsletter-icon-badge">
                                <FiGift size={32} />
                            </div>
                            <h2 className="newsletter-title">Unlock 20% Off Your First Order</h2>
                            <p className="newsletter-text">
                                Subscribe to our weekly updates and get special coupon codes delivered directly to your inbox.
                            </p>

                            {!couponClaimed ? (
                                <form onSubmit={handleSubscribe} className="newsletter-form">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address..."
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        className="newsletter-input"
                                        required
                                    />
                                    <button type="submit" className="btn btn-accent btn-lg">
                                        Claim Coupon
                                    </button>
                                </form>
                            ) : (
                                <div className="coupon-claimed-box">
                                    <FiCheckCircle size={24} className="claimed-icon" />
                                    <span>Coupon <strong>SHOP20</strong> active! Applied automatically at checkout.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        .home-page {
          overflow-x: hidden;
        }

        .hero {
          padding: 5rem 0 4rem;
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.12), transparent 50%),
                      radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.1), transparent 50%),
                      var(--bg-primary);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary-600);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .badge-icon {
          color: var(--warning);
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .gradient-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 540px;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .trust-pills-row {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .trust-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .pill-icon {
          color: var(--primary-600);
        }

        .hero-card-stack {
          position: relative;
        }

        .hero-glass-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 1.25rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .hero-card-img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-radius: var(--radius-lg);
          margin-bottom: 1rem;
        }

        .hero-card-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .card-tag {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--accent-600);
        }

        .hero-card-info h4 {
          margin: 0;
          font-size: 1.2rem;
        }

        .hero-card-info .price {
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--primary-600);
          margin: 0;
        }

        .old-price {
          font-size: 0.9rem;
          text-decoration: line-through;
          color: var(--text-tertiary);
          margin-left: 0.5rem;
        }

        /* Flash Sale Card */
        .flash-sale-card {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border-radius: var(--radius-xl);
          padding: 2rem 2.5rem;
          color: white;
          box-shadow: 0 15px 30px -10px rgba(79, 70, 229, 0.4);
        }

        .flash-sale-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .flash-title-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .flash-icon {
          font-size: 2.5rem;
          color: #fef08a;
        }

        .flash-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
          color: white;
        }

        .flash-subtitle {
          color: rgba(255,255,255,0.85);
          font-size: 0.95rem;
          margin: 0;
        }

        .timer-boxes {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .timer-box {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
        }

        .timer-val {
          font-size: 1.4rem;
          font-weight: 900;
          line-height: 1;
        }

        .timer-lbl {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.85;
          margin-top: 0.2rem;
        }

        .timer-colon {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .section-header {
          margin-bottom: 2.5rem;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.4rem;
          color: var(--text-primary);
        }

        .section-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .category-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 1.75rem 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .category-card:hover {
          transform: translateY(-6px);
          border-color: var(--cat-color);
          box-shadow: 0 12px 24px -6px rgba(0,0,0,0.1);
        }

        .cat-icon-wrapper {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }

        .cat-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .cat-count {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .view-all-link {
          color: var(--primary-600);
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
        }

        .view-all-link:hover {
          text-decoration: underline;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.75rem;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }

        .newsletter-card {
          background: radial-gradient(circle at top left, rgba(236, 72, 153, 0.15), transparent 60%),
                      var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 3.5rem 2rem;
          text-align: center;
        }

        .newsletter-content {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .newsletter-icon-badge {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: var(--gradient-accent);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 10px 20px -5px rgba(236, 72, 153, 0.4);
        }

        .newsletter-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .newsletter-text {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          width: 100%;
          max-width: 480px;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.85rem 1.25rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .coupon-claimed-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--success);
          border-radius: var(--radius-lg);
          font-weight: 600;
        }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .flash-sale-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
};

export default Home;
