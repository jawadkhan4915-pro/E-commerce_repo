import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiDatabase, FiMail, FiCheckCircle } from 'react-icons/fi';

const Privacy = () => {
    return (
        <div className="policy-page">
            <section className="policy-hero">
                <div className="container">
                    <motion.div
                        className="policy-hero-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="policy-badge">
                            <FiShield size={14} /> Data Protection & Security
                        </span>
                        <h1 className="policy-main-title">Privacy Policy</h1>
                        <p className="policy-subtitle">
                            Your privacy and data security are our top priorities. Learn how we protect and manage your personal information.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                <div className="policy-content-card">
                    <div className="policy-block">
                        <div className="policy-header-item">
                            <FiLock className="policy-icon" size={20} />
                            <h2>1. Information We Collect</h2>
                        </div>
                        <p>
                            When you browse, register, or make a purchase on ShopHub, we collect necessary personal details such as your name, email address, shipping address, and payment transaction metadata to fulfill your orders securely.
                        </p>
                        <ul>
                            <li><strong>Account Data:</strong> Name, verified email address, encrypted authentication credentials.</li>
                            <li><strong>Order Information:</strong> Shipping destinations, transaction history, purchased products.</li>
                            <li><strong>Virtual Try-On Photos:</strong> Photos uploaded to the Virtual Try-On Studio are processed entirely on your local browser device. No personal portraits or webcam captures are stored on or transmitted to external servers.</li>
                        </ul>
                    </div>

                    <div className="policy-block">
                        <div className="policy-header-item">
                            <FiDatabase className="policy-icon" size={20} />
                            <h2>2. How We Use Your Data</h2>
                        </div>
                        <p>
                            We use collected data solely to deliver your orders, maintain your shopping wishlist, ensure platform security, and improve our services. We do not sell, rent, or trade your personal information to third parties.
                        </p>
                    </div>

                    <div className="policy-block">
                        <div className="policy-header-item">
                            <FiEye className="policy-icon" size={20} />
                            <h2>3. Data Security & Encryption</h2>
                        </div>
                        <p>
                            We employ industry-standard cryptographic protocols (JWT, HTTPS, bcrypt password hashing, and NoSQL injection query sanitization) to guard your data against unauthorized access, alteration, or disclosure.
                        </p>
                    </div>

                    <div className="policy-block">
                        <div className="policy-header-item">
                            <FiMail className="policy-icon" size={20} />
                            <h2>4. Contact Our Data Protection Lead</h2>
                        </div>
                        <p>
                            If you have questions, data export requests, or privacy inquiries, please contact our lead developer and data privacy officer:
                        </p>
                        <div className="policy-contact-box">
                            <strong>Developer:</strong> M.jawad khan<br />
                            <strong>Email:</strong> <a href="mailto:jawad.khan4915@gmail.com">jawad.khan4915@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .policy-page { padding-bottom: 4rem; }
        .policy-hero {
          background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.05) 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 4.5rem 0 3rem;
          text-align: center;
          margin-bottom: 3rem;
        }
        .policy-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.12);
          color: var(--primary-600);
          font-weight: 700;
          font-size: 0.82rem;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          margin-bottom: 1rem;
        }
        .policy-main-title { font-size: 2.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem; }
        .policy-subtitle { font-size: 1.1rem; color: var(--text-secondary); max-width: 620px; margin: 0 auto; line-height: 1.6; }

        .policy-content-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2.5rem;
          max-width: 860px;
          margin: 0 auto;
          box-shadow: var(--shadow-sm);
        }

        .policy-block {
          margin-bottom: 2.5rem;
        }
        .policy-block:last-child { margin-bottom: 0; }

        .policy-header-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 0.75rem;
        }
        .policy-header-item h2 {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .policy-icon { color: var(--primary-600); }

        .policy-block p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
        }

        .policy-block ul {
          margin-left: 1.5rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.92rem;
        }

        .policy-block li { margin-bottom: 0.5rem; }

        .policy-contact-box {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          margin-top: 0.75rem;
          font-size: 0.92rem;
          color: var(--text-primary);
          line-height: 1.6;
        }
        .policy-contact-box a {
          color: var(--primary-600);
          font-weight: 700;
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default Privacy;
