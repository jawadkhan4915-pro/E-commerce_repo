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
} from 'recharts';
import { FaUsers, FaBox, FaShoppingBag, FaDollarSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get token from local storage (or redux state if I had access here easily, but localStorage is safer for dirty fetch)
        // Actually, I should use the axios instance if it exists, or just manual axios with header.
        // I'll assume standard axios for now, but need to attach token.
        const token = JSON.parse(localStorage.getItem('userInfo'))?.token; // Assuming userInfo is stored in localStorage by auth slice.

        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get('/api/analytics/dashboard', config);
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="spinner"></div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toFixed(2)}`,
      icon: <FaDollarSign />,
      color: 'var(--success)',
      bg: 'rgba(16, 185, 129, 0.1)',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <FaShoppingBag />,
      color: 'var(--primary-500)',
      bg: 'rgba(99, 102, 241, 0.1)',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: 'var(--warning)',
      bg: 'rgba(245, 158, 11, 0.1)',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <FaBox />,
      color: 'var(--accent-500)',
      bg: 'rgba(236, 72, 153, 0.1)',
    },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="mb-8">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
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

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="chart-container"
        >
          <h3 className="mb-4 text-lg">Sales Overview (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={stats.salesData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis
                dataKey="_id"
                stroke="var(--text-secondary)"
                tick={{ fill: 'var(--text-secondary)' }}
              />
              <YAxis
                stroke="var(--text-secondary)"
                tick={{ fill: 'var(--text-secondary)' }}
              />
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
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
