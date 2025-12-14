import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { FaCamera, FaUser, FaEnvelope, FaLock, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        setUploading(true);
        try {
            const { data } = await api.put('/users/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            dispatch(setCredentials(data));
            toast.success('Profile picture updated!');
        } catch (error) {
            console.error('Error updating avatar:', error);
            toast.error(error.response?.data?.message || 'Failed to update avatar');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setLoading(true);
        try {
            const { data } = await api.put('/users/profile', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            dispatch(setCredentials(data));
            toast.success('Profile updated successfully');
            setFormData({ ...formData, password: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Profile Settings</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 flex flex-col items-center space-y-6 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-xl"
                >
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-pink-500">
                            <img
                                src={userInfo?.avatar || 'https://via.placeholder.com/150'}
                                alt={userInfo?.name}
                                className="w-full h-full rounded-full object-cover border-4 border-gray-900 duration-300 group-hover:scale-105"
                            />
                        </div>
                        <button
                            onClick={() => fileInputRef.current.click()}
                            disabled={uploading}
                            className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-2xl shadow-lg transition-all transform hover:scale-110 hover:rotate-3"
                        >
                            {uploading ? <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div> : <FaCamera />}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-1">{userInfo?.name}</h3>
                        <p className="text-purple-300 font-medium">{userInfo?.email}</p>
                        <div className="mt-4 inline-flex px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold border border-purple-500/30">
                            Member
                        </div>
                    </div>
                </motion.div>

                {/* Edit Form */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">Full Name</label>
                                <div className="relative transition-all duration-300 focus-within:transform focus-within:scale-[1.02]">
                                    <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"><FaUser /></span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">Email Address</label>
                                <div className="relative transition-all duration-300 focus-within:transform focus-within:scale-[1.02]">
                                    <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"><FaEnvelope /></span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/5 my-6"></div>
                        <h4 className="text-gray-300 font-medium mb-4">Security</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">New Password</label>
                                <div className="relative transition-all duration-300 focus-within:transform focus-within:scale-[1.02]">
                                    <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"><FaLock /></span>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">Confirm Password</label>
                                <div className="relative transition-all duration-300 focus-within:transform focus-within:scale-[1.02]">
                                    <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"><FaLock /></span>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                                ) : (
                                    <>
                                        <FaSave />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
