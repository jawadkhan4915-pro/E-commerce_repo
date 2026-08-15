import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiHelpCircle, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="notfound-page">
            <div className="container">
                <motion.div
                    className="notfound-card"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    <div className="notfound-glitch-badge">404 Error</div>
                    <h1 className="notfound-title">Page Not Found</h1>
                    <p className="notfound-desc">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div className="notfound-actions">
                        <Link to="/" className="btn btn-primary notfound-btn">
                            <FiHome size={16} /> Return to Homepage
                        </Link>
                        <Link to="/products" className="btn btn-outline notfound-btn">
                            <FiShoppingBag size={16} /> Browse Products
                        </Link>
                        <Link to="/contact" className="btn btn-secondary notfound-btn">
                            <FiHelpCircle size={16} /> Contact Support
                        </Link>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .notfound-page {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1rem;
        }

        .notfound-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 3.5rem 2rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        .notfound-glitch-badge {
          display: inline-block;
          font-size: 3.5rem;
          font-weight: 900;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          letter-spacing: -1px;
        }

        .notfound-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .notfound-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .notfound-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 320px;
          margin: 0 auto;
        }

        .notfound-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0.75rem 1.25rem;
        }
      `}</style>
        </div>
    );
};

export default NotFound;
