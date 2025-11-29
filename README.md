# 🛒 ShopHub - Modern MERN E-Commerce Platform

A complete, professional, and visually stunning e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🎨 User Interface
- **Modern Design**: Beautiful gradient-based UI with smooth animations
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Premium Aesthetics**: Glassmorphism effects and modern card designs

### 🛍️ Shopping Features
- Browse products with advanced filtering and search
- Product categories and sorting options
- Detailed product pages with image galleries
- Shopping cart with quantity management
- Wishlist functionality
- Secure checkout process
- Order tracking and history

### 👤 User Features
- User registration and authentication (JWT)
- User profile management
- Order history
- Password hashing with bcrypt

### 🔐 Admin Features
- Admin dashboard with statistics
- Product management (Create, Read, Update, Delete)
- Order management
- Stock tracking

### 🚀 Technical Features
- RESTful API architecture
- Redux Toolkit for state management
- Protected routes for authentication
- Toast notifications for user feedback
- Pagination for product listings
- Product reviews and ratings
- Image upload support (Cloudinary ready)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Vanilla CSS** - Custom design system

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage (optional)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd E-commerce_repo
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm run install-all
   \`\`\`

3. **Setup Backend Environment Variables**
   
   Create a \`.env\` file in the \`backend\` directory:
   \`\`\`bash
   cd backend
   cp .env.example .env
   \`\`\`

   Edit \`.env\` with your configuration:
   \`\`\`env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_URL=http://localhost:5173
   
   # Optional - for image uploads
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   \`\`\`

4. **Start Development Servers**
   
   From the root directory:
   \`\`\`bash
   npm run dev
   \`\`\`

   This will start:
   - Backend server on http://localhost:5000
   - Frontend dev server on http://localhost:5173

### Alternative: Start Servers Separately

**Backend:**
\`\`\`bash
cd backend
npm install
npm start
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## 📝 API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user
- \`GET /api/auth/profile\` - Get user profile (Protected)
- \`PUT /api/auth/profile\` - Update user profile (Protected)
- \`POST /api/auth/wishlist\` - Toggle wishlist item (Protected)

### Products
- \`GET /api/products\` - Get all products (with pagination, search, filters)
- \`GET /api/products/:id\` - Get single product
- \`POST /api/products\` - Create product (Admin)
- \`PUT /api/products/:id\` - Update product (Admin)
- \`DELETE /api/products/:id\` - Delete product (Admin)
- \`POST /api/products/:id/reviews\` - Add product review (Protected)

### Orders
- \`POST /api/orders\` - Create new order (Protected)
- \`GET /api/orders\` - Get user orders (Protected)
- \`GET /api/orders/:id\` - Get order by ID (Protected)
- \`GET /api/orders/all/orders\` - Get all orders (Admin)
- \`PUT /api/orders/:id\` - Update order status (Admin)

## 👨‍💼 Admin Access

To create an admin user, you need to manually update the user's role in the database:

1. Register a new user through the application
2. Connect to MongoDB
3. Find the user and update the \`role\` field to \`"admin"\`

\`\`\`javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
\`\`\`

## 🎨 Design System

The application uses a custom CSS design system with:
- CSS variables for theming
- Modern gradient backgrounds
- Smooth animations and transitions
- Responsive breakpoints
- Dark mode support
- Glassmorphism effects

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- CORS configuration
- Environment variable protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1280px+)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using the MERN Stack**