import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiCheckCircle, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';

const Terms = () => {
    return (
        <div className="terms-page">
            <section className="terms-hero">
                <div className="container">
                    <motion.div
                        className="terms-hero-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="terms-badge">
                            <FiFileText size={14} /> User Agreement
                        </span>
                        <h1 className="terms-main-title">Terms of Service</h1>
                        <p className="terms-subtitle">
                            Please review the terms and conditions governing the use of ShopHub and our services.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                <div className="terms-content-card">
                    <div className="terms-block">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing, browsing, or creating an account on ShopHub, you agree to adhere to all applicable terms, conditions, and policies outlined in this agreement.
                        </p>
                    </div>

                    <div className="terms-block">
                        <h2>2. User Accounts & Security</h2>
                        <p>
                            Users are responsible for maintaining the confidentiality of their credentials and all activities occurring under their accounts. You agree to immediately notify our support team of any unauthorized use or security breach.
                        </p>
                    </div>

                    <div className="terms-block">
                        <h2>3. Orders, Pricing & Payments</h2>
                        <p>
                            All product prices and availability are displayed in real time and subject to change without prior notice. We reserve the right to refuse or cancel orders placed with erroneous pricing or fraudulent indicators.
                        </p>
                    </div>

                    <div className="terms-block">
                        <h2>4. Virtual Try-On Studio Usage</h2>
                        <p>
                            The Virtual Try-On Studio is provided as an interactive preview tool. While our cutout engine accurately overlays garments, final product appearance may vary slightly based on physical fabrics and sizing choices.
                        </p>
                    </div>

                    <div className="terms-block">
                        <h2>5. Contact & Governing Information</h2>
                        <p>
                            For inquiries regarding these terms, please contact:
                        </p>
                        <div className="terms-contact-box">
                            <strong>Platform Developer:</strong> M.jawad khan<br />
                            <strong>Email:</strong> <a href="mailto:jawad.khan4915@gmail.com">jawad.khan4915@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .terms-page { padding-bottom: 4rem; }
        .terms-hero {
          background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.05) 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 4.5rem 0 3rem;
          text-align: center;
          margin-bottom: 3rem;
        }
        .terms-badge {
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
        .terms-main-title { font-size: 2.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem; }
        .terms-subtitle { font-size: 1.1rem; color: var(--text-secondary); max-width: 620px; margin: 0 auto; line-height: 1.6; }

        .terms-content-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2.5rem;
          max-width: 860px;
          margin: 0 auto;
          box-shadow: var(--shadow-sm);
        }

        .terms-block { margin-bottom: 2rem; }
        .terms-block:last-child { margin-bottom: 0; }

        .terms-block h2 {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }

        .terms-block p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .terms-contact-box {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          margin-top: 0.75rem;
          font-size: 0.92rem;
          color: var(--text-primary);
          line-height: 1.6;
        }
        .terms-contact-box a {
          color: var(--primary-600);
          font-weight: 700;
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default Terms;
