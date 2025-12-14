import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/Layout/AdminLayout'; // Import AdminLayout

// Pages
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import ProductForm from './pages/Admin/ProductForm';
import ProductListAdmin from './pages/Admin/ProductList'; // Renamed to avoid verification errors if names clash
import OrderList from './pages/Admin/OrderList';
import UserList from './pages/Admin/UserList';


function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="app">
            <Routes>
                {/* Admin Routes - Wrapped in AdminLayout */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<ProductListAdmin />} />
                    <Route path="products/new" element={<ProductForm />} />
                    <Route path="products/:id/edit" element={<ProductForm />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="orders" element={<OrderList />} />
                    {/* Add fallback for /admin root to redirect to dashboard if needed, or just let it render what matches */}
                    <Route index element={<Dashboard />} />
                </Route>

                {/* Public & Customer Routes */}
                <Route
                    path="*"
                    element={
                        <>
                            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                            <main className="main-content">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/products" element={<ProductList />} />
                                    <Route path="/products/:id" element={<ProductDetail />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />

                                    {/* Protected Customer Routes */}
                                    <Route
                                        path="/checkout"
                                        element={
                                            <ProtectedRoute>
                                                <Checkout />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/profile"
                                        element={
                                            <ProtectedRoute>
                                                <Profile />
                                            </ProtectedRoute>
                                        }
                                    />
                                </Routes>
                            </main>
                            <Footer />
                        </>
                    }
                />
            </Routes>

            <style>{`
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
        }
      `}</style>
        </div>
    );
}

export default App;
