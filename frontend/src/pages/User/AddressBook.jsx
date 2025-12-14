import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';

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
        // Since we don't have a separate 'get addresses' endpoint yet, we might need to fetch user profile
        // Or assume the endpoint returns updated list on modification.
        // For now, let's fetch user profile to get addresses
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const { data } = await api.get('/users/profile'); // Assuming profile return includes addresses if updated
            // Wait, the backend getAllUsers returns addresses? getUserById does.
            // Let's check userController. getUserProfile usually fetches current user.
            // Current backend route structure: /api/users/profile (PUT only). /api/users (GET all, admin).
            // We might need a "get current user profile" endpoint if not exists.
            // Or use stored userInfo if it persists.
            // Actually, let's just use the state from Redux if available, or fetch.
            // Re-checking userController...
            // updateUserProfile returns updated user data including addresses if we modify it.
            // But we need a GET for current user profile.
            // Usually /api/users/profile GET is common. User controller had "getUserById" but that's for admin with ID.
            // Let's implement a quick check. If not available, we rely on local storage or add the endpoint.
            // For now, let's assume we can get it or we will add it.

            // Wait, I didn't add a GET /api/users/profile endpoint.
            // Common practice is GET /api/users/profile.
            // Let's check routes again. 
            // I only added PUT /api/users/profile. 
            // I should add GET /api/users/profile to fetch current user data.
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // TEMPORARY FIX: We will just mock it or rely on a new endpoint which I will add.
    // I will add GET /api/users/profile endpoint in next step.

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/users/address', formData);
            setAddresses(data); // Returns updated addresses array
            setShowForm(false);
            setFormData({ street: '', city: '', state: '', zipCode: '', country: '', isDefault: false });
            toast.success('Address added successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add address');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const { data } = await api.delete(`/users/address/${id}`);
            setAddresses(data);
            toast.success('Address removed');
        } catch (error) {
            toast.error('Failed to remove address');
        }
    };

    // Placeholder logic for initial load until I fix the GET endpoint
    // We can try to use saved userInfo from localStorage for initial render?
    // UserInfo in redux usually has minimal info.

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Address Book</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    <FaPlus /> <span>Add New</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-700">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                        <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="bg-gray-800 border-gray-700 rounded p-2 text-white" />
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} id="isDefault" />
                            <label htmlFor="isDefault" className="text-gray-300">Set as default</label>
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full md:w-auto">Save Address</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.length === 0 && !loading ? (
                    <p className="text-gray-400 col-span-2 text-center py-8">No addresses saved yet.</p>
                ) : (
                    addresses.map((addr) => (
                        <div key={addr._id} className="bg-gray-900 border border-gray-700 p-4 rounded-lg relative group">
                            {addr.isDefault && <span className="absolute top-2 right-2 bg-purple-900 text-purple-200 text-xs px-2 py-1 rounded">Default</span>}
                            <p className="text-white font-semibold mb-1">{addr.street}</p>
                            <p className="text-gray-400 text-sm">{addr.city}, {addr.state} {addr.zipCode}</p>
                            <p className="text-gray-400 text-sm">{addr.country}</p>
                            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-end opacity-0 group-hover:opacity-100 transition">
                                <button onClick={() => handleDelete(addr._id)} className="text-red-400 hover:text-red-300 flex items-center space-x-1">
                                    <FaTrash size={14} /> <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AddressBook;
