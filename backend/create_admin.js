import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const adminEmail = 'admin@example.com';
        const adminPassword = 'adminpassword123';

        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            userExists.role = 'admin';
            await userExists.save();
            console.log('Existing user updated to Admin role.');
        } else {
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
            });
            console.log('Admin user created successfully.');
        }

        console.log('-----------------------------------');
        console.log('Admin Credentials:');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log('-----------------------------------');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
