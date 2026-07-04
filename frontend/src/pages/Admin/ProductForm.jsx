import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { FiUploadCloud, FiTrash2, FiPlus, FiImage } from 'react-icons/fi';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        stock: '',
        images: [''],
    });

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await api.get(`/products/${id}`);
            setFormData({
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                stock: data.stock,
                images: data.images.length > 0 ? data.images : [''],
            });
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const removeImageField = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
    };

    const handleQuickUnsplashImage = (idx) => {
        const demoImages = [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80'
        ];
        const randomImg = demoImages[Math.floor(Math.random() * demoImages.length)];
        handleImageChange(idx, randomImg);
        toast.success('Sample image populated!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                images: formData.images.filter((img) => img.trim() !== ''),
            };

            if (isEditMode) {
                await api.put(`/products/${id}`, productData);
                toast.success('Product updated successfully!');
            } else {
                await api.post('/products', productData);
                toast.success('Product created successfully!');
            }

            navigate('/admin/dashboard');
        } catch (error) {
            // Error handled by interceptor
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Electronics', 'Clothing', 'Shoes', 'Accessories', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Beauty', 'Other'];

    return (
        <div className="product-form-page py-8">
            <div className="container">
                <h1 className="page-title">{isEditMode ? 'Edit Catalog Item' : 'Add New Catalog Item'}</h1>

                <div className="form-container">
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-group">
                            <label className="form-label">Product Title</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Full Product Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-textarea"
                                rows={4}
                                placeholder="Describe key features, specs, and benefits..."
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Unit Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="299.99"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Inventory Quantity (Stock)</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="50"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Product Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Image Manager & Live Gallery Preview */}
                        <div className="form-group border-t pt-6 mt-6 border-gray-200 dark:border-gray-800">
                            <div className="flex justify-between items-center mb-3">
                                <label className="form-label mb-0 flex items-center gap-2">
                                    <FiImage className="text-indigo-600" /> Media & Product Images
                                </label>
                                <button
                                    type="button"
                                    onClick={addImageField}
                                    className="btn btn-secondary btn-sm flex items-center gap-1 text-xs"
                                >
                                    <FiPlus size={14} /> Add Additional Image
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="flex gap-3 items-center">
                                        <div className="w-12 h-12 rounded-xl border overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center">
                                            {image ? (
                                                <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Error'; }} />
                                            ) : (
                                                <FiImage className="text-gray-400" />
                                            )}
                                        </div>

                                        <input
                                            type="url"
                                            value={image}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                            className="form-input flex-1 text-xs"
                                            placeholder="Paste Image URL (https://...)"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleQuickUnsplashImage(index)}
                                            className="btn btn-outline btn-sm text-xs px-2"
                                            title="Use HD Unsplash Demo Image"
                                        >
                                            <FiUploadCloud size={14} /> Sample
                                        </button>

                                        {formData.images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeImageField(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/dashboard')}
                                className="btn btn-outline btn-lg"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary btn-lg shadow-xl" disabled={loading}>
                                {loading ? 'Saving Product...' : isEditMode ? 'Save Changes' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .product-form {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column-reverse;
          }

          .form-actions button {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default ProductForm;
