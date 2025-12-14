import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { FaCamera, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

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
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32">
                        <img
                            src={userInfo?.avatar || 'https://via.placeholder.com/150'}
                            alt={userInfo?.name}
                            className="w-full h-full rounded-full object-cover border-4 border-purple-500"
                        />
                        <button
                            onClick={() => fileInputRef.current.click()}
                            disabled={uploading}
                            className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700 transition"
                        >
                            {uploading ? <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div> : <FaCamera />}
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
                        <h3 className="text-xl font-semibold text-white">{userInfo?.name}</h3>
                        <p className="text-gray-400">{userInfo?.email}</p>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="flex-1 bg-gray-900 rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Full Name</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500"><FaUser /></span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500"><FaEnvelope /></span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2">New Password</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500"><FaLock /></span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="Leave blank to keep current"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2">Confirm Password</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500"><FaLock /></span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
