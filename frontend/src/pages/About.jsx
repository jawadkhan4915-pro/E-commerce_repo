import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiShoppingBag, FiCode, FiMail, FiCheckCircle,
    FiAward, FiHeart, FiZap, FiLayers, FiShield,
    FiUsers, FiGlobe, FiGithub, FiArrowRight
} from 'react-icons/fi';

const STATS = [
    { num: '50K+', label: 'Happy Shoppers' },
    { num: '99.9%', label: 'Order Satisfaction' },
    { num: '180+', label: 'Countries Shipped' },
    { num: '24/7', label: 'Customer Support' },
];

const VALUES = [
    {
        title: 'Customer-Obsessed',
        desc: 'Every feature, from virtual try-ons to instant checkout, is engineered to give shoppers a seamless, delightful experience.',
        icon: FiHeart,
    },
    {
        title: 'Technological Excellence',
        desc: 'Built on high-performance modern MERN architecture, responsive React 18, and scalable secure micro-services.',
        icon: FiZap,
    },
    {
        title: 'Verified Quality',
        desc: 'Every item in our collection is curated from certified premium manufacturers with 100% authenticity guarantees.',
        icon: FiAward,
    },
    {
        title: 'Security & Trust',
        desc: 'Enterprise-grade encryption, JWT secure authentication, and sanitized NoSQL databases protecting all user data.',
        icon: FiShield,
    },
];

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <motion.div
                        className="about-hero-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="about-badge">
                            <FiShoppingBag size={14} /> Our Mission & Story
                        </span>
                        <h1 className="about-title">Revolutionizing Modern E-Commerce</h1>
                        <p className="about-subtitle">
                            ShopHub is a premier full-stack MERN e-commerce application designed with cutting-edge UI aesthetics, interactive Virtual Try-On, and lightning-fast performance.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                {/* Stats Bar */}
                <section className="stats-section">
                    <div className="stats-grid">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="stat-card"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                                <span className="stat-num">{stat.num}</span>
                                <span className="stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Developer Spotlight Card */}
                <section className="developer-section">
                    <motion.div
                        className="developer-card"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="dev-badge-row">
                            <span className="dev-tag"><FiCode size={14} /> Lead Architect & Developer</span>
                            <span className="tech-badge">MERN Full-Stack</span>
                        </div>

                        <div className="dev-profile-layout">
                            <div className="dev-avatar-box">
                                <div className="dev-avatar">JK</div>
                            </div>
                            <div className="dev-info">
                                <h2 className="dev-name">M.jawad khan</h2>
                                <p className="dev-role">Full-Stack Software Engineer • React & Node.js Specialist</p>
                                <p className="dev-bio">
                                    Passionate about architecting responsive, scalable web applications with rich visual aesthetics, state-of-the-art interactive features (like our real-time Virtual Try-On Studio), and secure database design.
                                </p>
                                <div className="dev-contact-row">
                                    <a
                                        href="mailto:jawad.khan4915@gmail.com"
                                        className="dev-email-btn"
                                    >
                                        <FiMail size={15} /> jawad.khan4915@gmail.com
                                    </a>
                                    <Link to="/contact" className="dev-contact-link">
                                        Send a Message <FiArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Core Values */}
                <section className="values-section">
                    <h2 className="section-title text-center">What Sets Us Apart</h2>
                    <p className="section-subtitle text-center">Engineered with precision, built for effortless shopping.</p>

                    <div className="values-grid">
                        {VALUES.map((val, idx) => {
                            const Icon = val.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    className="value-card"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                    <div className="value-icon-box">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="value-title">{val.title}</h3>
                                    <p className="value-desc">{val.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Tech Stack Highlights */}
                <section className="tech-section">
                    <div className="tech-box">
                        <h3 className="tech-title">Platform Technology Stack</h3>
                        <p className="tech-sub">Engineered with high performance modern technologies:</p>
                        <div className="tech-pills">
                            <span className="tech-pill">React 18</span>
                            <span className="tech-pill">Vite</span>
                            <span className="tech-pill">Redux Toolkit</span>
                            <span className="tech-pill">Framer Motion</span>
                            <span className="tech-pill">Node.js / Express</span>
                            <span className="tech-pill">MongoDB Atlas</span>
                            <span className="tech-pill">HTML5 Canvas Cutout</span>
                            <span className="tech-pill">JWT Security</span>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
        .about-page {
          padding-bottom: 4rem;
        }

        .about-hero {
          background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(236,72,153,0.05) 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 4.5rem 0 3rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .about-badge {
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

        .about-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .about-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Stats */
        .stats-section {
          margin-bottom: 4rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.75rem 1.25rem;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }

        .stat-num {
          display: block;
          font-size: 2.2rem;
          font-weight: 900;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* Developer Card */
        .developer-section {
          margin-bottom: 4.5rem;
        }

        .developer-card {
          background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(16,185,129,0.04) 100%);
          border: 1px solid var(--primary-400);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
        }

        .dev-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .dev-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-600);
          background: rgba(99,102,241,0.1);
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
        }

        .tech-badge {
          font-size: 0.78rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16,185,129,0.1);
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
        }

        .dev-profile-layout {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .dev-avatar-box {
          flex-shrink: 0;
        }

        .dev-avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: var(--gradient-primary);
          color: white;
          font-size: 2rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(99,102,241,0.35);
        }

        .dev-info { flex: 1; }

        .dev-name {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .dev-role {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--primary-600);
          margin-bottom: 0.75rem;
        }

        .dev-bio {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          max-width: 680px;
        }

        .dev-contact-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .dev-email-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 0.55rem 1.1rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--primary-600);
          transition: all 0.2s;
        }
        .dev-email-btn:hover {
          border-color: var(--primary-500);
          box-shadow: var(--shadow-sm);
        }

        .dev-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .dev-contact-link:hover { color: var(--primary-600); }

        /* Values */
        .values-section {
          margin-bottom: 4.5rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .value-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.75rem;
          box-shadow: var(--shadow-sm);
          transition: all 0.25s;
        }
        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary-500);
        }

        .value-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(99,102,241,0.1);
          color: var(--primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .value-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .value-desc {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        /* Tech Section */
        .tech-box {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2.25rem;
          text-align: center;
        }

        .tech-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .tech-sub {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .tech-pills {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .tech-pill {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .dev-profile-layout { flex-direction: column; text-align: center; }
          .dev-contact-row { justify-content: center; }
          .about-title { font-size: 2rem; }
        }
      `}</style>
        </div>
    );
};

export default About;
