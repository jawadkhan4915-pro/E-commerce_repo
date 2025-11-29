import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            avatar: avatar || 'https://via.placeholder.com/150',
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email (include password field)
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                wishlist: user.wishlist,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password;
            }

            // Handle Avatar Upload
            if (req.file) {
                if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
                    try {
                        const result = await cloudinary.uploader.upload(req.file.path, {
                            folder: 'avatars',
                            width: 150,
                            crop: 'scale',
                        });

                        user.avatar = result.secure_url;

                        // Remove file from local uploads folder
                        fs.unlinkSync(req.file.path);
                    } catch (uploadError) {
                        console.error('Cloudinary Upload Error:', uploadError);
                        return res.status(500).json({ message: 'Image upload failed' });
                    }
                } else {
                    // Fallback to local storage
                    const protocol = req.protocol;
                    const host = req.get('host');
                    // Construct URL: http://localhost:5000/uploads/filename.jpg
                    user.avatar = `${protocol}://${host}/uploads/${req.file.filename}`;
                    // File is already in 'uploads/' via multer, so we keep it there.
                }
            } else if (req.body.avatar) {
                // Allow updating avatar via URL string if provided
                user.avatar = req.body.avatar;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                role: updatedUser.role,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Add/Remove product from wishlist
 * @route   POST /api/auth/wishlist
 * @access  Private
 */
export const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            const index = user.wishlist.indexOf(productId);

            if (index > -1) {
                // Remove from wishlist
                user.wishlist.splice(index, 1);
            } else {
                // Add to wishlist
                user.wishlist.push(productId);
            }

            await user.save();
            const updatedUser = await User.findById(user._id).populate('wishlist');

            res.json({
                message: 'Wishlist updated',
                wishlist: updatedUser.wishlist,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
