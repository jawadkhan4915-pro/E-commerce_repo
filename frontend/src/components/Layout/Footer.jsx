import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiUser, FiHeart, FiCheck, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Footer = () => {
    const [newsletterEmail, setNewsletterEmail] = useState('');

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            toast.success('Thank you for subscribing to our newsletter! 💌');
            setNewsletterEmail('');
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand & About Section */}
                    <div className="footer-section">
                        <h3 className="footer-title">ShopHub</h3>
                        <p className="footer-text">
                            Your one-stop destination for quality products at amazing prices.
                            Shop with confidence and enjoy fast, reliable delivery with our interactive AI Virtual Try-On experience.
                        </p>
                        <div className="developer-tag-card">
                            <span className="dev-tag-label">Developed By:</span>
                            <div className="dev-tag-body">
                                <span className="dev-tag-name">M.jawad khan</span>
                                <a href="mailto:jawad.khan4915@gmail.com" className="dev-tag-email">
                                    <FiMail size={13} /> jawad.khan4915@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Shop Catalog</h4>
                        <ul className="footer-links">
                            <li><Link to="/products">All Products</Link></li>
                            <li><Link to="/products?category=Electronics">Electronics</Link></li>
                            <li><Link to="/products?category=Clothing">Clothing & Apparel</Link></li>
                            <li><Link to="/products?category=Shoes">Footwear</Link></li>
                            <li><Link to="/products?category=Accessories">Watches & Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service & Help */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Customer Care</h4>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Support</Link></li>
                            <li><Link to="/shipping">Shipping & Delivery</Link></li>
                            <li><Link to="/returns">Returns & Refunds</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Stay Connected</h4>
                        <p className="footer-text">
                            Subscribe to receive exclusive deals, flash sale alerts, and new arrivals.
                        </p>
                        <form className="newsletter-form" onSubmit={handleNewsletter}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="newsletter-input"
                                value={newsletterEmail}
                                onChange={e => setNewsletterEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                                <FiSend size={15} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar without 2026 year, honoring developer M.jawad khan */}
                <div className="footer-bottom">
                    <div className="copyright-box">
                        <p className="copyright">
                            © ShopHub • Designed & Developed by <strong>M.jawad khan</strong> (<a href="mailto:jawad.khan4915@gmail.com" className="dev-link">jawad.khan4915@gmail.com</a>)
                        </p>
                    </div>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/shipping">Shipping</Link>
                        <Link to="/returns">Returns</Link>
                    </div>
                </div>
            </div>

            <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          margin-top: 5rem;
          padding: 4rem 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-title {
          font-size: 1.6rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.85rem;
        }

        .footer-heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.1rem;
        }

        .footer-text {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .developer-tag-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .dev-tag-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .dev-tag-body {
          display: flex;
          flex-direction: column;
        }

        .dev-tag-name {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .dev-tag-email {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-600);
          text-decoration: underline;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--primary-600);
          transform: translateX(2px);
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--primary-500);
        }

        .newsletter-btn {
          padding: 0.75rem 1.2rem;
          background: var(--gradient-primary);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright {
          color: var(--text-tertiary);
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .dev-link {
          color: var(--primary-600);
          font-weight: 600;
          text-decoration: underline;
        }

        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-bottom-links a {
          color: var(--text-tertiary);
          font-size: 0.85rem;
          transition: color var(--transition-fast);
        }

        .footer-bottom-links a:hover {
          color: var(--primary-600);
        }

        @media (max-width: 900px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 600px) {
          .footer {
            padding: 3rem 0 1.5rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom-links {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
