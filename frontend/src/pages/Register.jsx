import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiAlertCircle } from 'react-icons/fi';
import { setCredentials } from '../store/slices/authSlice';
import api from '../api/api';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMsg) setErrorMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        setErrorMsg('');

        try {
            const { data } = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            dispatch(setCredentials(data));
            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            const msg = error.response?.data?.message || 'Registration failed. Please try again.';
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="container">
                <motion.div 
                    className="auth-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <div className="auth-card">
                        <div className="auth-header text-center">
                            <motion.div 
                                className="auth-badge"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            >
                                <FiUserPlus size={26} />
                            </motion.div>
                            <h1 className="auth-title">Create Account</h1>
                            <p className="auth-subtitle">Join ShopHub for exclusive deals & fast checkout</p>
                        </div>

                        {errorMsg && (
                            <motion.div 
                                className="auth-error-alert"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <FiAlertCircle size={20} />
                                <span>{errorMsg}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <div className="input-with-icon">
                                    <FiUser className="input-icon" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <div className="input-with-icon">
                                    <FiMail className="input-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="input-with-icon">
                                    <FiLock className="input-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="At least 6 characters"
                                        minLength={6}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <div className="input-with-icon">
                                    <FiLock className="input-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button 
                                type="submit" 
                                className="btn btn-primary btn-lg" 
                                disabled={loading} 
                                style={{ width: '100%' }}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="btn-spinner"></div> Creating Account...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Create Account <FiUserPlus />
                                    </span>
                                )}
                            </motion.button>
                        </form>

                        <p className="auth-footer">
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .auth-page {
          min-height: calc(100vh - var(--header-height));
          display: flex;
          align-items: center;
          padding: 3rem 0;
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.08), transparent 40%),
                      radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.08), transparent 40%),
                      var(--bg-secondary);
        }

        .auth-container {
          max-width: 480px;
          margin: 0 auto;
          width: 100%;
        }

        .auth-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2.5rem 2rem;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .auth-header {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .auth-badge {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: var(--gradient-accent);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          box-shadow: 0 10px 20px -5px rgba(236, 72, 153, 0.4);
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .auth-subtitle {
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .auth-error-alert {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: var(--error);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-tertiary);
          pointer-events: none;
        }

        .input-with-icon .form-input {
          padding-left: 2.75rem;
        }

        .password-toggle-btn {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: 0.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
        }

        .password-toggle-btn:hover {
          color: var(--text-primary);
        }

        .btn-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .auth-form {
          margin-bottom: 1.5rem;
        }

        .auth-footer {
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .auth-link {
          color: var(--primary-600);
          font-weight: 600;
        }

        .auth-link:hover {
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default Register;
