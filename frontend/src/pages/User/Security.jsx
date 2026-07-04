import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiEyeOff, FiCheck, FiKey, FiSmartphone } from 'react-icons/fi';
import api from '../../api/api';
import toast from 'react-hot-toast';

const Security = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        try {
            await api.put('/auth/profile', {
                password: passwordData.newPassword,
            });
            toast.success('Password updated successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to update password';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const toggle2FA = () => {
        setTwoFactorEnabled(!twoFactorEnabled);
        if (!twoFactorEnabled) {
            toast.success('Two-Factor Authentication activated!');
        } else {
            toast('Two-Factor Authentication disabled');
        }
    };

    return (
        <motion.div 
            className="security-settings-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="border-b border-white/10 pb-4 mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                    <FiShield className="text-purple-400" /> Account Security & Password
                </h2>
                <p className="text-gray-400 text-sm mt-1">Manage your password, login credentials, and authentication security</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Change Password Card */}
                <div className="bg-gray-950/40 p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-400">
                        <FiKey /> Change Password
                    </h3>

                    <form onSubmit={handlePasswordChange}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">New Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                    placeholder="At least 6 characters"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm New Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
                        >
                            {loading ? 'Updating Password...' : 'Update Password'}
                        </button>
                    </form>
                </div>

                {/* 2FA & Login Activity */}
                <div className="flex flex-col gap-6">
                    <div className="bg-gray-950/40 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-400">
                                    <FiSmartphone /> Two-Factor Authentication (2FA)
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">Add an extra layer of protection to your account with SMS/Authenticator OTP code.</p>
                            </div>
                            <button
                                type="button"
                                onClick={toggle2FA}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                    twoFactorEnabled
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20'
                                }`}
                            >
                                {twoFactorEnabled ? 'Enabled ✓' : 'Enable 2FA'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-950/40 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-pink-400">
                            <FiShield /> Recent Active Sessions
                        </h3>
                        <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-gray-900/60 border border-white/5 flex justify-between items-center text-xs">
                                <div>
                                    <span className="font-semibold text-white block">Windows PC — Chrome Browser</span>
                                    <span className="text-gray-400">Current Session • Active Now</span>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">This Device</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Security;
