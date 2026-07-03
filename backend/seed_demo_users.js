import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedUsers = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Seed Admin User
        const adminEmail = 'admin@example.com';
        const adminPassword = '123456';

        let adminUser = await User.findOne({ email: adminEmail }).select('+password');
        if (adminUser) {
            adminUser.password = adminPassword;
            adminUser.role = 'admin';
            await adminUser.save();
            console.log('✅ Admin user updated with email: admin@example.com and password: 123456');
        } else {
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
            });
            console.log('✅ Admin user created with email: admin@example.com and password: 123456');
        }

        // Seed Customer User
        const customerEmail = 'user@example.com';
        const customerPassword = '123456';

        let customerUser = await User.findOne({ email: customerEmail }).select('+password');
        if (customerUser) {
            customerUser.password = customerPassword;
            customerUser.role = 'user';
            await customerUser.save();
            console.log('✅ Customer user updated with email: user@example.com and password: 123456');
        } else {
            await User.create({
                name: 'Demo Customer',
                email: customerEmail,
                password: customerPassword,
                role: 'user',
            });
            console.log('✅ Customer user created with email: user@example.com and password: 123456');
        }

        console.log('🎉 Demo users seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error seeding demo users: ${error.message}`);
        process.exit(1);
    }
};

seedUsers();
