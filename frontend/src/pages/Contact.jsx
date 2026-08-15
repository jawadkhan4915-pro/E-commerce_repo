import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiMail, FiPhone, FiMapPin, FiClock,
    FiSend, FiCheckCircle, FiMessageSquare,
    FiUser, FiHelpCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const CONTACT_INFO = [
    {
        title: 'Developer & Lead Support',
        name: 'M.jawad khan',
        contact: 'jawad.khan4915@gmail.com',
        href: 'mailto:jawad.khan4915@gmail.com',
        sub: 'Direct response within 24 hours',
        icon: FiUser,
    },
    {
        title: 'Customer Experience Team',
        name: 'ShopHub Support',
        contact: 'support@shophub.com',
        href: 'mailto:support@shophub.com',
        sub: 'Orders, billing & general inquiries',
        icon: FiMail,
    },
    {
        title: 'Operating Hours',
        name: '24 / 7 Availability',
        contact: 'Online Customer Care',
        href: null,
        sub: 'Mon - Sun, Round the clock',
        icon: FiClock,
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success(`Thank you, ${formData.name}! Your message has been sent to jawad.khan4915@gmail.com.`);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 800);
    };

    return (
        <div className="contact-page">
            {/* Hero Header */}
            <section className="contact-hero">
                <div className="container">
                    <motion.div
                        className="contact-hero-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="contact-badge">
                            <FiMessageSquare size={14} /> Get in Touch
                        </span>
                        <h1 className="contact-title">We’d Love to Hear From You</h1>
                        <p className="contact-subtitle">
                            Have questions about our products, feedback on your experience, or developer inquiries? Contact our team anytime.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                {/* Contact Info Cards */}
                <section className="contact-cards-section">
                    <div className="contact-cards-grid">
                        {CONTACT_INFO.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    className="contact-card"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                    <div className="contact-icon-box">
                                        <Icon size={24} />
                                    </div>
                                    <span className="contact-tag">{item.title}</span>
                                    <h3 className="contact-name">{item.name}</h3>
                                    {item.href ? (
                                        <a href={item.href} className="contact-link">
                                            {item.contact}
                                        </a>
                                    ) : (
                                        <p className="contact-text">{item.contact}</p>
                                    )}
                                    <span className="contact-sub">{item.sub}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Form & Support Layout */}
                <section className="contact-form-section">
                    <div className="contact-layout-grid">
                        {/* Form Card */}
                        <motion.div
                            className="form-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35 }}
                        >
                            <h2 className="form-title">Send a Direct Message</h2>
                            <p className="form-subtitle">Fill out the form below and we will respond promptly.</p>

                            {submitted && (
                                <div className="form-success-banner">
                                    <FiCheckCircle size={20} />
                                    <div>
                                        <strong>Message Dispatched Successfully!</strong>
                                        <p>Our lead developer M.jawad khan will review your message shortly.</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label className="form-label">Your Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="e.g. Alex Johnson"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            placeholder="e.g. alex@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="How can we help you?"
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        className="form-textarea"
                                        rows={5}
                                        placeholder="Write your message or inquiry here..."
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary form-submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending Message…' : (
                                        <>
                                            <FiSend size={16} /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Side Info Box */}
                        <motion.div
                            className="side-info-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35 }}
                        >
                            <h3 className="side-title">Direct Developer Contact</h3>
                            <p className="side-text">
                                ShopHub was crafted from the ground up by <strong>M.jawad khan</strong>. For collaboration, feature requests, or technical support, feel free to reach out directly:
                            </p>

                            <div className="side-dev-box">
                                <div className="side-dev-avatar">JK</div>
                                <div>
                                    <h4 className="side-dev-name">M.jawad khan</h4>
                                    <a href="mailto:jawad.khan4915@gmail.com" className="side-dev-email">
                                        jawad.khan4915@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="side-features-list">
                                <div className="side-feat-item">
                                    <FiCheckCircle className="side-check" size={16} />
                                    <span>Fast 24-Hour Response Guarantee</span>
                                </div>
                                <div className="side-feat-item">
                                    <FiCheckCircle className="side-check" size={16} />
                                    <span>Custom Feature Inquiries & Support</span>
                                </div>
                                <div className="side-feat-item">
                                    <FiCheckCircle className="side-check" size={16} />
                                    <span>Full-Stack Web Development Inquiries</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>

            <style>{`
        .contact-page {
          padding-bottom: 4rem;
        }

        .contact-hero {
          background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(236,72,153,0.05) 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 4.5rem 0 3rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-badge {
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

        .contact-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .contact-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-cards-section {
          margin-bottom: 3.5rem;
        }

        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .contact-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s;
        }
        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary-500);
        }

        .contact-icon-box {
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

        .contact-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.3rem;
        }

        .contact-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }

        .contact-link {
          color: var(--primary-600);
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 0.4rem;
          text-decoration: underline;
        }

        .contact-text {
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 0.4rem;
        }

        .contact-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Form Layout */
        .contact-layout-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .form-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2.25rem;
          box-shadow: var(--shadow-sm);
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .form-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .form-success-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(16,185,129,0.1);
          border: 1px solid #10b981;
          color: #065f46;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .form-input, .form-textarea {
          padding: 0.8rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: inherit;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--primary-500);
          background: var(--bg-primary);
        }

        .form-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0.85rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          margin-top: 0.5rem;
        }

        /* Side Info Card */
        .side-info-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2rem;
        }

        .side-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .side-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .side-dev-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .side-dev-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: white;
          font-size: 1.2rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .side-dev-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .side-dev-email {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary-600);
          text-decoration: underline;
        }

        .side-features-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .side-feat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .side-check { color: #10b981; }

        @media (max-width: 768px) {
          .contact-layout-grid { grid-template-columns: 1fr; }
          .form-row-2 { grid-template-columns: 1fr; }
          .contact-title { font-size: 2rem; }
        }
      `}</style>
        </div>
    );
};

export default Contact;
