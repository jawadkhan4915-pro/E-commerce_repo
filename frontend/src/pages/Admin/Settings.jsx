import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FiSettings, 
    FiSave, 
    FiRefreshCw, 
    FiCheckCircle, 
    FiAlertTriangle,
    FiShield, 
    FiGlobe, 
    FiPercent,
    FiTruck,
    FiBell
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        storeName: 'ShopHub Modern Store',
        supportEmail: 'support@shophub.com',
        currency: 'USD ($)',
        freeShippingThreshold: '50',
        taxRate: '8.5',
        maintenanceMode: false,
        announcementText: '🔥 Summer Sale! Use coupon code SHOP20 for 20% off on all items.',
        enableAnnouncement: true,
        autoApproveReviews: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success('Store settings updated successfully! 🎉');
        }, 600);
    };

    const handleClearCache = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 800)),
            {
                loading: 'Clearing API cache...',
                success: 'API cache cleared!',
                error: 'Could not clear cache',
            }
        );
    };

    return (
        <motion.div 
            className="admin-settings-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FiSettings className="text-indigo-500" /> Store Settings & Control Panel
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Manage global preferences, shipping thresholds, and store status</p>
                </div>
                <button 
                    type="button" 
                    onClick={handleClearCache}
                    className="btn btn-secondary flex items-center gap-2 text-sm"
                >
                    <FiRefreshCw /> Purge System Cache
                </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Store Settings */}
                <div className="card p-6 rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-400">
                        <FiGlobe /> General Information
                    </h3>

                    <div className="form-group mb-4">
                        <label className="form-label">Store Name</label>
                        <input
                            type="text"
                            name="storeName"
                            value={settings.storeName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label">Customer Support Email</label>
                        <input
                            type="email"
                            name="supportEmail"
                            value={settings.supportEmail}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group mb-4">
                            <label className="form-label">Default Currency</label>
                            <select
                                name="currency"
                                value={settings.currency}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="USD ($)">USD ($)</option>
                                <option value="EUR (€)">EUR (€)</option>
                                <option value="GBP (£)">GBP (£)</option>
                                <option value="CAD ($)">CAD ($)</option>
                            </select>
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label">Default Tax Rate (%)</label>
                            <input
                                type="number"
                                name="taxRate"
                                value={settings.taxRate}
                                onChange={handleChange}
                                className="form-input"
                                step="0.1"
                            />
                        </div>
                    </div>
                </div>

                {/* Shipping & Checkout Rules */}
                <div className="card p-6 rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-pink-400">
                        <FiTruck /> Shipping & Order Rules
                    </h3>

                    <div className="form-group mb-4">
                        <label className="form-label">Free Shipping Minimum Threshold ($)</label>
                        <input
                            type="number"
                            name="freeShippingThreshold"
                            value={settings.freeShippingThreshold}
                            onChange={handleChange}
                            className="form-input"
                        />
                        <span className="text-xs text-gray-500 mt-1 block">Orders above this amount will qualify for free shipping automatically.</span>
                    </div>

                    <div className="checkbox-group mt-6 p-4 rounded-xl border border-gray-800 bg-gray-950/40">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="autoApproveReviews"
                                checked={settings.autoApproveReviews}
                                onChange={handleChange}
                                className="w-5 h-5 rounded accent-indigo-600"
                            />
                            <div>
                                <span className="font-semibold text-sm block">Auto-Approve Customer Reviews</span>
                                <span className="text-xs text-gray-400">If disabled, new reviews will require admin verification.</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Announcement & Promotion Banner */}
                <div className="card p-6 rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur md:col-span-2">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-400">
                        <FiBell /> Announcement Banner & System Controls
                    </h3>

                    <div className="checkbox-group mb-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="enableAnnouncement"
                                checked={settings.enableAnnouncement}
                                onChange={handleChange}
                                className="w-5 h-5 rounded accent-amber-500"
                            />
                            <span className="font-semibold text-sm">Display Store Announcement Bar on Top Header</span>
                        </label>
                    </div>

                    {settings.enableAnnouncement && (
                        <div className="form-group mb-6">
                            <label className="form-label">Announcement Text</label>
                            <input
                                type="text"
                                name="announcementText"
                                value={settings.announcementText}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    )}

                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleChange}
                                className="w-5 h-5 rounded accent-red-600"
                            />
                            <div>
                                <span className="font-bold text-sm text-red-400 flex items-center gap-1">
                                    <FiAlertTriangle /> Enable Store Maintenance Mode
                                </span>
                                <span className="text-xs text-gray-400">When enabled, customers will see a maintenance screen while admins retain full portal access.</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary btn-lg flex items-center gap-2"
                    >
                        <FiSave /> {loading ? 'Saving Changes...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default Settings;
