import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaMapMarkerAlt, FaHome, FaCity, FaFlag } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AddressBook = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isDefault: false,
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const { data } = await api.get('/users/profile');
            setAddresses(data.addresses || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/users/address', formData);
            setAddresses(data);
            setShowForm(false);
            setFormData({ street: '', city: '', state: '', zipCode: '', country: '', isDefault: false });
            toast.success('Address added successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add address');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            const { data } = await api.delete(`/users/address/${id}`);
            setAddresses(data);
            toast.success('Address removed');
        } catch (error) {
            toast.error('Failed to remove address');
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div></div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Address Book</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
                >
                    {showForm ? 'Cancel' : <><FaPlus /> <span>Add New</span></>}
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 mb-8 shadow-xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Form Inputs similar to Dashboard but for Address */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 group">
                                        <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">Street Address</label>
                                        <div className="relative text-gray-400 focus-within:text-purple-400 transition-colors">
                                            <span className="absolute left-4 top-3.5"><FaHome /></span>
                                            <input type="text" name="street" placeholder="123 Main St" value={formData.street} onChange={handleChange} required
                                                className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">City</label>
                                        <div className="relative text-gray-400 focus-within:text-purple-400 transition-colors">
                                            <span className="absolute left-4 top-3.5"><FaCity /></span>
                                            <input type="text" name="city" placeholder="New York" value={formData.city} onChange={handleChange} required
                                                className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">State / Province</label>
                                        <div className="relative text-gray-400 focus-within:text-purple-400 transition-colors">
                                            <span className="absolute left-4 top-3.5"><FaMapMarkerAlt /></span>
                                            <input type="text" name="state" placeholder="NY" value={formData.state} onChange={handleChange} required
                                                className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">Zip Code</label>
                                        <div className="relative text-gray-400 focus-within:text-purple-400 transition-colors">
                                            <span className="absolute left-4 top-3.5"><FaMapMarkerAlt /></span>
                                            <input type="text" name="zipCode" placeholder="10001" value={formData.zipCode} onChange={handleChange} required
                                                className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-gray-400 mb-2 text-sm font-medium ml-1">Country</label>
                                        <div className="relative text-gray-400 focus-within:text-purple-400 transition-colors">
                                            <span className="absolute left-4 top-3.5"><FaFlag /></span>
                                            <input type="text" name="country" placeholder="USA" value={formData.country} onChange={handleChange} required
                                                className="w-full bg-black/20 border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all placeholder-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                    <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} id="isDefault"
                                        className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
                                    />
                                    <label htmlFor="isDefault" className="text-gray-300 font-medium cursor-pointer select-none">Set as default shipping address</label>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button type="submit" className="bg-white text-purple-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">Save Address</button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.length === 0 && !showForm ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-2 text-center py-20 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
                    >
                        <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-gray-500">
                            <FaMapMarkerAlt size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No addresses saved</h3>
                        <p className="text-gray-400">Add a new address to make checkouts faster.</p>
                    </motion.div>
                ) : (
                    addresses.map((addr, index) => (
                        <motion.div
                            key={addr._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl relative group hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300"
                        >
                            {addr.isDefault && (
                                <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    Default
                                </span>
                            )}
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-gray-800/50 p-3 rounded-xl text-purple-400">
                                    <FaHome size={24} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{addr.street}</h3>
                            <div className="text-gray-400 space-y-1 mb-6">
                                <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                                <p className="flex items-center gap-2"><FaFlag size={12} /> {addr.country}</p>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                <button
                                    onClick={() => handleDelete(addr._id)}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all"
                                >
                                    <FaTrash size={14} /> <span>Delete</span>
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default AddressBook;
