import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiTruck, FiClock, FiGlobe, FiShield, FiPackage,
    FiCheckCircle, FiHelpCircle, FiChevronDown, FiSearch,
    FiMapPin, FiDollarSign, FiArrowRight
} from 'react-icons/fi';

const SHIPPING_METHODS = [
    {
        id: 'standard',
        name: 'Standard Delivery',
        time: '3 - 5 Business Days',
        cost: 'Free over $50 (or $4.99)',
        desc: 'Reliable doorstep delivery with live tracking.',
        icon: FiTruck,
        badge: 'Most Popular',
    },
    {
        id: 'express',
        name: 'Express Priority',
        time: '1 - 2 Business Days',
        cost: '$12.99',
        desc: 'Priority air dispatch for time-sensitive orders.',
        icon: FiClock,
        badge: 'Fastest',
    },
    {
        id: 'international',
        name: 'Global International',
        time: '7 - 14 Business Days',
        cost: '$19.99',
        desc: 'Worldwide delivery to over 180+ countries.',
        icon: FiGlobe,
        badge: 'Worldwide',
    },
];

const DELIVERY_STEPS = [
    { step: '01', title: 'Order Placed', desc: 'Your order is verified and sent to our warehouse fulfillment team.' },
    { step: '02', title: 'Carefully Packed', desc: 'Items are securely boxed with eco-friendly protective packaging.' },
    { step: '03', title: 'In Transit', desc: 'Dispatched via top-tier couriers with instant SMS & email tracking.' },
    { step: '04', title: 'Delivered', desc: 'Safely arrived at your doorstep with signature confirmation.' },
];

const FAQS = [
    {
        q: 'How do I track my shipment?',
        a: 'Once your order is dispatched, you will receive a tracking link via email and in your User Dashboard under "My Orders". You can track real-time delivery status 24/7.'
    },
    {
        q: 'Do you offer free shipping?',
        a: 'Yes! We provide Free Standard Shipping on all domestic orders over $50. No promo code needed — discount applies automatically at checkout.'
    },
    {
        q: 'Are customs duties and taxes included in international orders?',
        a: 'Import taxes and customs duties are calculated transparently at checkout where supported, or handled via standard customs clearance upon arrival in your country.'
    },
    {
        q: 'What if my package is delayed or lost?',
        a: 'All shipments are 100% insured. If your package experiences unexpected delays or is marked missing, our support team will issue an immediate replacement or full refund.'
    },
];

const Shipping = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [calcCountry, setCalcCountry] = useState('US');
    const [calcZip, setCalcZip] = useState('');
    const [estimatedDate, setEstimatedDate] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const date = new Date();
        date.setDate(date.getDate() + (calcCountry === 'US' ? 3 : 8));
        setEstimatedDate(date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
    };

    return (
        <div className="shipping-page">
            {/* Hero Header */}
            <section className="shipping-hero">
                <div className="container">
                    <motion.div
                        className="shipping-hero-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="shipping-badge">
                            <FiTruck size={14} /> Fast & Insured Delivery
                        </span>
                        <h1 className="shipping-title">Shipping & Delivery Information</h1>
                        <p className="shipping-subtitle">
                            We deliver your favorite products safely, quickly, and sustainably to over 180+ countries worldwide.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                {/* Shipping Methods Grid */}
                <section className="shipping-section">
                    <h2 className="section-title text-center">Shipping Options & Rates</h2>
                    <p className="section-subtitle text-center">Choose the delivery speed that fits your schedule.</p>

                    <div className="methods-grid">
                        {SHIPPING_METHODS.map((m, idx) => {
                            const Icon = m.icon;
                            return (
                                <motion.div
                                    key={m.id}
                                    className="method-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                    <div className="method-header">
                                        <div className="method-icon-box">
                                            <Icon size={24} />
                                        </div>
                                        <span className="method-badge">{m.badge}</span>
                                    </div>
                                    <h3 className="method-name">{m.name}</h3>
                                    <div className="method-time">
                                        <FiClock size={15} /> {m.time}
                                    </div>
                                    <div className="method-cost">{m.cost}</div>
                                    <p className="method-desc">{m.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Interactive Delivery Estimator */}
                <section className="calculator-section">
                    <div className="calc-card">
                        <div className="calc-info">
                            <span className="calc-tag"><FiMapPin size={13} /> Live Calculator</span>
                            <h3 className="calc-title">Estimate Delivery Time</h3>
                            <p className="calc-desc">Enter your destination to calculate estimated arrival dates.</p>
                        </div>
                        <form className="calc-form" onSubmit={handleCalculate}>
                            <select
                                className="calc-select"
                                value={calcCountry}
                                onChange={(e) => setCalcCountry(e.target.value)}
                            >
                                <option value="US">United States (Domestic)</option>
                                <option value="CA">Canada</option>
                                <option value="UK">United Kingdom</option>
                                <option value="EU">European Union</option>
                                <option value="PK">Pakistan</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="OTHER">Other International</option>
                            </select>
                            <input
                                type="text"
                                className="calc-input"
                                placeholder="Zip / Postal Code"
                                value={calcZip}
                                onChange={(e) => setCalcZip(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary calc-btn">
                                Calculate Date
                            </button>
                        </form>
                        {estimatedDate && (
                            <motion.div
                                className="calc-result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <FiCheckCircle size={18} className="text-success" />
                                <span>Estimated Arrival: <strong>{estimatedDate}</strong></span>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Delivery Process Timeline */}
                <section className="shipping-section">
                    <h2 className="section-title text-center">How Your Order Reaches You</h2>
                    <p className="section-subtitle text-center">Complete transparency from checkout to your doorstep.</p>

                    <div className="timeline-grid">
                        {DELIVERY_STEPS.map((step, idx) => (
                            <motion.div
                                key={step.step}
                                className="timeline-card"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                <span className="step-num">{step.step}</span>
                                <h4 className="step-title">{step.title}</h4>
                                <p className="step-desc">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Shipping FAQs */}
                <section className="shipping-section faq-section">
                    <h2 className="section-title text-center">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {FAQS.map((faq, i) => (
                            <div
                                key={i}
                                className={`faq-card ${activeFaq === i ? 'open' : ''}`}
                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            >
                                <div className="faq-question">
                                    <span>{faq.q}</span>
                                    <FiChevronDown className={`faq-arrow ${activeFaq === i ? 'rotated' : ''}`} size={18} />
                                </div>
                                {activeFaq === i && (
                                    <motion.div
                                        className="faq-answer"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p>{faq.a}</p>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="shipping-cta">
                    <div className="cta-box">
                        <h3>Have questions about an existing shipment?</h3>
                        <p>Our dedicated support team is available 24/7 to assist you.</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn btn-primary">
                                Contact Support
                            </Link>
                            <Link to="/products" className="btn btn-outline">
                                Continue Shopping <FiArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
        .shipping-page {
          padding-bottom: 4rem;
        }

        .shipping-hero {
          background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.05) 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 4.5rem 0 3rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .shipping-badge {
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

        .shipping-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .shipping-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .shipping-section {
          margin-bottom: 4.5rem;
        }

        .section-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
        }

        .text-center { text-align: center; }

        .methods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .method-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all 0.25s;
        }
        .method-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-500);
        }

        .method-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .method-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(99,102,241,0.1);
          color: var(--primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .method-badge {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .method-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .method-time {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .method-cost {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--primary-600);
          margin-bottom: 0.75rem;
        }

        .method-desc {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        /* Calculator */
        .calculator-section {
          margin-bottom: 4.5rem;
        }

        .calc-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2.25rem;
          box-shadow: var(--shadow-sm);
        }

        .calc-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary-600);
          margin-bottom: 0.4rem;
        }

        .calc-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .calc-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .calc-form {
          display: grid;
          grid-template-columns: 1.5fr 1fr auto;
          gap: 1rem;
        }

        .calc-select, .calc-input {
          padding: 0.8rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .calc-btn {
          white-space: nowrap;
          padding: 0.8rem 1.5rem;
        }

        .calc-result {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 1.25rem;
          background: rgba(16,185,129,0.1);
          border: 1px solid #10b981;
          border-radius: 10px;
          padding: 0.75rem 1.25rem;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        /* Timeline */
        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .timeline-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
        }

        .step-num {
          font-size: 1.8rem;
          font-weight: 900;
          color: rgba(99,102,241,0.25);
          display: block;
          margin-bottom: 0.5rem;
        }

        .step-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .step-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* FAQ */
        .faq-list {
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .faq-card:hover { border-color: var(--primary-500); }
        .faq-card.open { border-color: var(--primary-500); box-shadow: var(--shadow-sm); }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          color: var(--text-primary);
          font-size: 0.98rem;
        }

        .faq-arrow {
          color: var(--text-tertiary);
          transition: transform 0.2s;
        }
        .faq-arrow.rotated { transform: rotate(180deg); color: var(--primary-600); }

        .faq-answer {
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-color);
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* CTA */
        .shipping-cta {
          margin-top: 2rem;
        }

        .cta-box {
          background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.06) 100%);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
        }

        .cta-box h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .cta-box p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .shipping-title { font-size: 2rem; }
          .calc-form { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default Shipping;
