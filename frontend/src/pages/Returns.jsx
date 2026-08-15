import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiRotateCcw, FiShield, FiCheckCircle, FiClock,
    FiPackage, FiDollarSign, FiHelpCircle, FiArrowRight
} from 'react-icons/fi';

const RETURN_STEPS = [
    {
        num: '1',
        title: 'Submit Return Request',
        desc: 'Go to your Orders page, select the item, and choose your reason for return within 30 days.'
    },
    {
        num: '2',
        title: 'Print Prepaid Label',
        desc: 'Download your prepaid return shipping label and attach it to the original package.'
    },
    {
        num: '3',
        title: 'Drop Off Package',
        desc: 'Hand your package to any local courier drop-off location or schedule a free home pickup.'
    },
    {
        num: '4',
        title: 'Instant Refund',
        desc: 'Once inspected at our warehouse, your refund is credited to your original payment method within 3 - 5 business days.'
    },
];

const Returns = () => {
    return (
        <div className="returns-page">
            <section className="returns-hero">
                <div className="container">
                    <motion.div
                        className="returns-hero-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="returns-badge">
                            <FiRotateCcw size={14} /> 30-Day Guarantee
                        </span>
                        <h1 className="returns-title">Hassle-Free Returns & Refunds</h1>
                        <p className="returns-subtitle">
                            Not completely satisfied with your purchase? We offer simple 30-day returns with 100% money-back guarantee.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                {/* 4 Step Process */}
                <section className="returns-section">
                    <h2 className="section-title text-center">4 Simple Steps to Return</h2>
                    <p className="section-subtitle text-center">Our streamlined return process takes less than 2 minutes.</p>

                    <div className="steps-grid">
                        {RETURN_STEPS.map((s, idx) => (
                            <motion.div
                                key={s.num}
                                className="step-card"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                <div className="step-badge">{s.num}</div>
                                <h3 className="step-heading">{s.title}</h3>
                                <p className="step-text">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Return Policy Highlights */}
                <section className="policy-section">
                    <div className="policy-grid">
                        <div className="policy-card">
                            <div className="policy-icon-box">
                                <FiShield size={24} />
                            </div>
                            <h3 className="policy-title">100% Money-Back Guarantee</h3>
                            <p className="policy-desc">
                                We guarantee full refunds on all eligible items returned in their original condition with tags attached.
                            </p>
                        </div>
                        <div className="policy-card">
                            <div className="policy-icon-box">
                                <FiPackage size={24} />
                            </div>
                            <h3 className="policy-title">Free Return Shipping</h3>
                            <p className="policy-desc">
                                We cover the return postage on all domestic returns so you never have to pay out of pocket.
                            </p>
                        </div>
                        <div className="policy-card">
                            <div className="policy-icon-box">
                                <FiDollarSign size={24} />
                            </div>
                            <h3 className="policy-title">Fast Refund Processing</h3>
                            <p className="policy-desc">
                                Funds are credited back to your original payment method or instant store credit wallet within 3 to 5 business days.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="returns-cta">
                    <div className="returns-cta-box">
                        <h3>Need help with a return or exchange?</h3>
                        <p>Our support team is here to guide you through every step.</p>
                        <div className="returns-cta-actions">
                            <Link to="/profile/orders" className="btn btn-primary">
                                View My Orders
                            </Link>
                            <Link to="/contact" className="btn btn-outline">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
        .returns-page { padding-bottom: 4rem; }

        .returns-hero {
          background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.05) 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 4.5rem 0 3rem;
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .returns-badge {
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

        .returns-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .returns-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .returns-section { margin-bottom: 4rem; }
        .section-title { font-size: 1.85rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem; }
        .section-subtitle { font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 2.5rem; }
        .text-center { text-align: center; }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .step-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.75rem;
          position: relative;
          box-shadow: var(--shadow-sm);
        }

        .step-badge {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--gradient-primary);
          color: white;
          font-size: 1.1rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .step-heading {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .step-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .policy-section { margin-bottom: 4rem; }

        .policy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .policy-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 2rem;
        }

        .policy-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(99,102,241,0.1);
          color: var(--primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .policy-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .policy-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .returns-cta-box {
          background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.06) 100%);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
        }

        .returns-cta-box h3 { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem; }
        .returns-cta-box p { font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
        .returns-cta-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        @media (max-width: 768px) {
          .returns-title { font-size: 2rem; }
        }
      `}</style>
        </div>
    );
};

export default Returns;
