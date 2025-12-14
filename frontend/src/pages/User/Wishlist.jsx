import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            // Need to fetch user profile populated with wishlist
            const { data } = await api.get('/users/profile');
            setWishlist(data.wishlist || []);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        // Implement logic to remove from wishlist locally or refetch
        // Since ProductCard might handle the toggle, we might just need to refresh
        try {
            const { data } = await api.post('/users/wishlist', { productId });
            // API returns updated wishlist IDs, but we need full product objects.
            // So we might need to filter the current list.
            setWishlist(wishlist.filter(p => p._id !== productId));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div></div>;
    }

    if (wishlist.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">Your wishlist is empty.</p>
                <Link to="/products" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Explore Products</Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((product) => (
                    // We can reuse ProductCard, but we need to ensure it handles the "wished" state correctly
                    // Or we can just render a simple card here.
                    // Let's assume ProductCard is smart enough or we pass props.
                    // For now, let's just make a simple card to be safe and fast.
                    <div key={product._id} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                            <img src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                            <button
                                onClick={(e) => { e.preventDefault(); removeFromWishlist(product._id); }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4">
                            <Link to={`/product/${product._id}`}>
                                <h3 className="text-white font-semibold mb-2 hover:text-purple-400 truncate">{product.name}</h3>
                            </Link>
                            <p className="text-purple-400 font-bold">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
