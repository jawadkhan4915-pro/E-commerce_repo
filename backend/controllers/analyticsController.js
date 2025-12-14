import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

/**
 * @desc    Get dashboard stats
 * @route   GET /api/analytics/dashboard
 * @access  Private/Admin
 */
export const getDashboardStats = async (req, res) => {
    try {
        // 1. Total counts
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // 2. Total Sales
        const orders = await Order.find({ paymentStatus: 'Paid' });
        const totalSales = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

        // 3. Sales over time (last 7 days - simplified)
        // Group orders by date
        // This is a basic implementation. For production, MongoDB Aggregation Framework is better.
        // But let's stick to a simpler JS approach if dataset is small, or use aggregation if needed.
        // Let's use aggregation for better performance.

        const salesData = await Order.aggregate([
            {
                $match: { paymentStatus: 'Paid' } // Only paid orders
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $limit: 7 } // Last 7 days that have sales
        ]);

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalSales,
            salesData
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
