import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const demoProducts = [
    // === ELECTRONICS ===
    {
        name: 'UltraNoise NC9 Wireless Headphones',
        description: 'Experience studio-grade active noise cancellation with 40-hour battery life, spatial audio, and premium memory foam ear cushions.',
        price: 299.99,
        category: 'Electronics',
        stock: 25,
        ratings: 4.9,
        numReviews: 42,
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
        ],
        reviews: [
            { name: 'Alex Rivera', rating: 5, comment: 'Best noise cancellation I have ever experienced. Battery lasts all week!' },
            { name: 'Sarah Chen', rating: 5, comment: 'Super comfortable for long work shifts and flight travel.' }
        ]
    },
    {
        name: 'ZenBook Pro 15 OLED Laptop',
        description: 'Ultra-thin magnesium-alloy laptop with 4K OLED Touch display, Intel Core i9 processor, and 32GB RAM for creative professionals.',
        price: 1699.99,
        category: 'Electronics',
        stock: 12,
        ratings: 4.8,
        numReviews: 18,
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
        ],
        reviews: [
            { name: 'David Miller', rating: 5, comment: 'OLED screen is breathtaking. Blazing fast video editing.' }
        ]
    },
    {
        name: 'UltraView 32" Curved 4K Monitor',
        description: 'Immersive 144Hz 1ms response curved display with HDR600 and Thunderbolt 4 connectivity for gaming and productivity.',
        price: 649.99,
        category: 'Electronics',
        stock: 8,
        ratings: 4.7,
        numReviews: 29,
        images: [
            'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === CLOTHING ===
    {
        name: 'Minimalist Merino Wool Overcoat',
        description: 'Tailored double-breasted overcoat crafted from 100% Italian merino wool. Timeless silhouette for formal and casual styling.',
        price: 249.50,
        category: 'Clothing',
        stock: 30,
        ratings: 4.8,
        numReviews: 15,
        images: [
            'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
        ],
        reviews: [
            { name: 'Marcus Vance', rating: 5, comment: 'Exceptional warmth and premium feel. Fits like a glove.' }
        ]
    },
    {
        name: 'Urban Techwear Waterproof Parka',
        description: 'All-weather breathable jacket featuring sealed seams, magnetic pocket enclosures, and thermal lining for winter urban outdoor exploration.',
        price: 189.99,
        category: 'Clothing',
        stock: 18,
        ratings: 4.6,
        numReviews: 24,
        images: [
            'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === SHOES ===
    {
        name: 'AeroStride Pro Running Sneakers',
        description: 'Next-gen carbon fiber responsive midsole sneakers with breathable FlyKnit upper for effortless propulsion and maximum comfort.',
        price: 159.99,
        category: 'Shoes',
        stock: 40,
        ratings: 4.9,
        numReviews: 53,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
        ],
        reviews: [
            { name: 'Jordan K.', rating: 5, comment: 'Shaved 30 seconds off my 5k pace! Cushioning is top notch.' }
        ]
    },
    {
        name: 'Handcrafted Italian Leather Oxfords',
        description: 'Classic Goodyear welted full-grain calfskin leather dress shoes with cushioned footbed and polished mahogany burnished finish.',
        price: 219.00,
        category: 'Shoes',
        stock: 15,
        ratings: 4.7,
        numReviews: 12,
        images: [
            'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === ACCESSORIES ===
    {
        name: 'Chronos Master Automatic Wristwatch',
        description: 'Swiss movement self-winding luxury automatic watch featuring 316L stainless steel case, sapphire crystal lens, and 100m water resistance.',
        price: 499.99,
        category: 'Accessories',
        stock: 10,
        ratings: 5.0,
        numReviews: 19,
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80'
        ],
        reviews: [
            { name: 'Ethan Hunt', rating: 5, comment: 'Craftsmanship rivaling watches 5x the price.' }
        ]
    },
    {
        name: 'Minimalist RFID Leather Wallet',
        description: 'Slim vegetable-tanned leather bi-fold wallet with quick-draw card slider and RFID protection.',
        price: 45.00,
        category: 'Accessories',
        stock: 50,
        ratings: 4.8,
        numReviews: 31,
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === HOME & GARDEN ===
    {
        name: 'Nordic Pour-Over Ceramic Coffee Carafe',
        description: 'Ergonomic heat-resistant glass carafe with stainless steel micro-mesh filter and natural beechwood collar collar.',
        price: 54.99,
        category: 'Home & Garden',
        stock: 22,
        ratings: 4.8,
        numReviews: 27,
        images: [
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
        ]
    },
    {
        name: 'Ambient Warm Arch LED Table Lamp',
        description: 'Dimmable smart LED desk lamp with touch control slider, wireless charging pad base, and natural warm eye-care illumination.',
        price: 79.99,
        category: 'Home & Garden',
        stock: 14,
        ratings: 4.7,
        numReviews: 16,
        images: [
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === SPORTS ===
    {
        name: 'ProFlex Eco Marble Yoga Mat',
        description: 'Extra thick 6mm non-slip dense cushioning eco TPE yoga mat with alignment guidelines and carrying strap.',
        price: 42.50,
        category: 'Sports',
        stock: 35,
        ratings: 4.9,
        numReviews: 38,
        images: [
            'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80'
        ]
    },
    {
        name: 'HydroSteel Thermal Sports Flask (1L)',
        description: 'Double-wall vacuum insulated stainless steel water bottle keeping drinks ice-cold for 24 hours or piping hot for 12 hours.',
        price: 34.99,
        category: 'Sports',
        stock: 45,
        ratings: 4.8,
        numReviews: 62,
        images: [
            'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === BOOKS ===
    {
        name: 'The Art of Modern Architecture',
        description: 'Comprehensive hardcover collector edition detailing iconic minimalist architectural masterpieces with high-definition photography.',
        price: 49.99,
        category: 'Books',
        stock: 20,
        ratings: 5.0,
        numReviews: 11,
        images: [
            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === TOYS ===
    {
        name: 'AeroRacer 4K FPV Camera Drone',
        description: 'Foldable GPS quadcopter drone featuring 4K UHD camera, 3-axis gimbal stabilization, 30-minute flight time, and obstacle avoidance.',
        price: 279.99,
        category: 'Toys',
        stock: 16,
        ratings: 4.6,
        numReviews: 21,
        images: [
            'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === BEAUTY ===
    {
        name: 'Radiance Botanical Facial Serum',
        description: 'Organic cold-pressed rosehip oil enriched with Vitamin C, Hyaluronic Acid, and botanical oils for glowing skin hydration.',
        price: 38.00,
        category: 'Beauty',
        stock: 30,
        ratings: 4.9,
        numReviews: 47,
        images: [
            'https://images.unsplash.com/photo-1608248597560-841578330777?w=800&auto=format&fit=crop&q=80'
        ]
    },

    // === OTHER ===
    {
        name: 'AromaTherapy Ultrasonic Mist Diffuser',
        description: 'Whisper-quiet ceramic essential oil diffuser with 7 ambient LED light colors and auto shut-off safety protection.',
        price: 39.99,
        category: 'Other',
        stock: 28,
        ratings: 4.8,
        numReviews: 33,
        images: [
            'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80'
        ]
    }
];

const seedProducts = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Find Admin User to set createdBy field
        let adminUser = await User.findOne({ role: 'admin' });
        if (!adminUser) {
            adminUser = await User.findOne({});
        }

        const adminId = adminUser ? adminUser._id : null;

        // Clear existing demo products to ensure clean seed
        await Product.deleteMany({});
        console.log('🗑️ Existing products cleared.');

        // Insert new products with assigned createdBy field and valid user field on reviews
        const productsWithAdmin = demoProducts.map((p) => ({
            ...p,
            createdBy: adminId,
            reviews: (p.reviews || []).map((r) => ({
                ...r,
                user: adminId,
            })),
        }));

        const insertedProducts = await Product.insertMany(productsWithAdmin);

        console.log(`🎉 Successfully seeded ${insertedProducts.length} demo products across all categories!`);
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error seeding products: ${error.message}`);
        process.exit(1);
    }
};

seedProducts();
