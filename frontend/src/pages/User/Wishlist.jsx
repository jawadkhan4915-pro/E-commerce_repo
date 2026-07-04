import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const Wishlist = () => {
    const dispatch = useDispatch();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const { data } = await api.get('/users/profile');
            setWishlist(data.wishlist || []);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await api.post('/users/wishlist', { productId });
            setWishlist(wishlist.filter(p => p._id !== productId));
            toast.success('Removed from wishlist');
        } catch (error) {
            console.error(error);
            toast.error('Failed to remove item');
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`Added ${product.name} to cart! 🛒`);
    };

    if (loading) {
        return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div></div>;
    }

    if (wishlist.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
            >
                <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-gray-500">
                    <FaHeart size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h3>
                <p className="text-gray-400 mb-8">Save items you love here for later.</p>
                <Link
                    to="/products"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
                >
                    Explore Products
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <h2 className="text-3xl font-bold text-white mb-8">My Wishlist <span className="text-lg text-gray-500 font-normal ml-2">({wishlist.length} items)</span></h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {wishlist.map((product) => (
                        <motion.div
                            key={product._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-between"
                        >
                            <div>
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={typeof product.images?.[0] === 'string' ? product.images[0] : (product.images?.[0]?.url || 'https://via.placeholder.com/300')}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-2">
                                        <Link
                                            to={`/products/${product._id}`}
                                            className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                    <button
                                        onClick={(e) => { e.preventDefault(); removeFromWishlist(product._id); }}
                                        className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white p-2.5 rounded-full hover:bg-red-500 transition-colors duration-300"
                                        title="Remove from Wishlist"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>

                                <div className="p-5">
                                    <Link to={`/products/${product._id}`}>
                                        <h3 className="text-white font-semibold text-lg mb-2 hover:text-purple-400 truncate transition-colors">{product.name}</h3>
                                    </Link>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                            {formatPrice(product.price)}
                                        </span>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5"
                                        >
                                            <FaShoppingCart size={13} />
                                            <span>Add to Cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Wishlist;
