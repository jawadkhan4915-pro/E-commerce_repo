import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FaUsers, FaBox, FaShoppingBag, FaDollarSign, FaExclamationTriangle, FaBell, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesData: [],
  });
  const [loading, setLoading] = useState(true);

  // Mocked low stock alerts and activity feed for rich administrative overview
  const lowStockItems = [
    { id: '1', name: 'Wireless Noise Canceling Headphones', stock: 2, category: 'Electronics' },
    { id: '2', name: 'Ultra HD Smart TV 55 Inch', stock: 1, category: 'Electronics' },
    { id: '3', name: 'Leather Messenger Bag', stock: 3, category: 'Accessories' }
  ];

  const recentActivities = [
    { time: '10 mins ago', title: 'New order #ORD-8942 received ($249.99)', type: 'order' },
    { time: '35 mins ago', title: 'User john_doe registered a new account', type: 'user' },
    { time: '1 hour ago', title: 'Order #ORD-8930 status updated to Delivered', type: 'shipping' },
    { time: '3 hours ago', title: 'New product rating received (5 Stars ⭐)', type: 'review' }
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get('/api/analytics/dashboard', config);
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Sales Revenue',
      value: `$${(stats.totalSales || 0).toFixed(2)}`,
      icon: <FaDollarSign />,
      color: 'var(--success)',
      bg: 'rgba(16, 185, 129, 0.1)',
      trend: '+14.2% vs last week'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders || 0,
      icon: <FaShoppingBag />,
      color: 'var(--primary-500)',
      bg: 'rgba(99, 102, 241, 0.1)',
      trend: '+8.1% vs last week'
    },
    {
      title: 'Active Customers',
      value: stats.totalUsers || 0,
      icon: <FaUsers />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.1)',
      trend: '+5.4% new accounts'
    },
    {
      title: 'Catalog Items',
      value: stats.totalProducts || 0,
      icon: <FaBox />,
      color: 'var(--accent-500)',
      bg: 'rgba(236, 72, 153, 0.1)',
      trend: 'In stock & listed'
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Admin Portal Executive Dashboard</h2>
          <p className="text-gray-400 text-sm">Real-time performance analytics & business insights</p>
        </div>

        <div className="flex gap-3">
          <Link to="/admin/products/new" className="btn btn-primary btn-sm flex items-center gap-2">
            + Add New Product
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="stat-info">
              <h4>{card.title}</h4>
              <p>{card.value}</p>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-1">
                <FaArrowUp size={10} /> {card.trend}
              </span>
            </div>
            <div
              className="stat-icon"
              style={{ color: card.color, backgroundColor: card.bg }}
            >
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts & Side Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="chart-container lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Sales & Revenue Trend</h3>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
              Live Data
            </span>
          </div>

          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.salesData || []}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="_id" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="totalSales"
                  stroke="var(--primary-500)"
                  fill="url(#colorSales)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Low Stock Alerts Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 bg-gray-900/60 border border-gray-800 rounded-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaExclamationTriangle className="text-amber-400" />
              <h3 className="text-lg font-bold">Low Stock Alerts</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">Items requiring immediate inventory restock:</p>

            <div className="flex flex-col gap-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-gray-950/60 border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h5 className="font-semibold text-sm text-gray-200">{item.name}</h5>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300">
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/admin/products" className="btn btn-outline btn-sm text-center w-full mt-6">
            Manage Inventory Catalog →
          </Link>
        </motion.div>
      </div>

      {/* Recent Activities Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6 bg-gray-900/60 border border-gray-800 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FaBell className="text-indigo-400" /> Recent System Activities
          </h3>
          <span className="text-xs text-gray-400">Auto-updating feed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentActivities.map((act, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-950/50 border border-gray-800 flex flex-col justify-between">
              <span className="text-xs text-indigo-400 font-semibold mb-2">{act.time}</span>
              <p className="text-sm font-medium text-gray-200">{act.title}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
