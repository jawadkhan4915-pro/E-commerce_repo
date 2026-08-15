import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/Layout/AdminLayout';
import VirtualTryOnModal from './components/VirtualTryOnModal';

// Public Core Pages
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

// Informational & Support Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// User Dashboard Pages
import UserLayout from './components/Layout/UserLayout';
import UserDashboard from './pages/User/Dashboard';
import UserOrders from './pages/User/Orders';
import AddressBook from './pages/User/AddressBook';
import Wishlist from './pages/User/Wishlist';
import UserSecurity from './pages/User/Security';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import ProductForm from './pages/Admin/ProductForm';
import ProductListAdmin from './pages/Admin/ProductList';
import OrderList from './pages/Admin/OrderList';
import UserList from './pages/Admin/UserList';
import AdminSettings from './pages/Admin/Settings';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    // Virtual Try-On global state
    const [tryOnOpen, setTryOnOpen] = useState(false);
    const [tryOnProduct, setTryOnProduct] = useState(null);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    // Listen for custom events from any component
    useEffect(() => {
        const handler = (e) => {
            setTryOnProduct(e.detail?.product || null);
            setTryOnOpen(true);
        };
        window.addEventListener('open-tryon', handler);
        return () => window.removeEventListener('open-tryon', handler);
    }, []);

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
                    <Route path="settings" element={<AdminSettings />} />
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

                                    {/* Company & Support Pages */}
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/shipping" element={<Shipping />} />
                                    <Route path="/returns" element={<Returns />} />
                                    <Route path="/privacy" element={<Privacy />} />
                                    <Route path="/terms" element={<Terms />} />

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
                                                <UserLayout />
                                            </ProtectedRoute>
                                        }
                                    >
                                        <Route index element={<UserDashboard />} />
                                        <Route path="orders" element={<UserOrders />} />
                                        <Route path="address" element={<AddressBook />} />
                                        <Route path="wishlist" element={<Wishlist />} />
                                        <Route path="security" element={<UserSecurity />} />
                                    </Route>

                                    {/* 404 Fallback Route */}
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                            <Footer />
                        </>
                    }
                />
            </Routes>

            {/* Global Virtual Try-On Modal */}
            <VirtualTryOnModal
                isOpen={tryOnOpen}
                onClose={() => { setTryOnOpen(false); setTryOnProduct(null); }}
                preSelectedProduct={tryOnProduct}
            />

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
