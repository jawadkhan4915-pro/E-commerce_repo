import { body, param, query, validationResult } from 'express-validator';

/**
 * Utility middleware to check validation results and return structured errors
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
            errors: errors.array().map((err) => ({
                field: err.path || err.param,
                message: err.msg,
            })),
        });
    }
    next();
};

/**
 * Auth Input Validation Rules
 */
export const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name cannot exceed 50 characters')
        .escape(),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    validate,
];

export const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
];

export const validateProfileUpdate = [
    body('name')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Name cannot exceed 50 characters')
        .escape(),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    validate,
];

/**
 * Product Input Validation Rules
 */
export const validateProduct = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ max: 100 })
        .withMessage('Product name cannot exceed 100 characters')
        .escape(),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 2000 })
        .withMessage('Description cannot exceed 2000 characters')
        .escape(),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .escape(),
    body('stock')
        .notEmpty()
        .withMessage('Stock is required')
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
    validate,
];

export const validateReview = [
    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),
    body('comment')
        .trim()
        .notEmpty()
        .withMessage('Comment is required')
        .isLength({ max: 500 })
        .withMessage('Comment cannot exceed 500 characters')
        .escape(),
    validate,
];

/**
 * Order Validation Rules
 */
export const validateOrder = [
    body('products')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one product'),
    body('products.*.product')
        .isMongoId()
        .withMessage('Invalid product ID'),
    body('products.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    body('products.*.price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('shippingAddress.address')
        .trim()
        .notEmpty()
        .withMessage('Shipping address is required')
        .escape(),
    body('shippingAddress.city')
        .trim()
        .notEmpty()
        .withMessage('City is required')
        .escape(),
    body('shippingAddress.postalCode')
        .trim()
        .notEmpty()
        .withMessage('Postal code is required')
        .escape(),
    body('shippingAddress.country')
        .trim()
        .notEmpty()
        .withMessage('Country is required')
        .escape(),
    body('paymentMethod')
        .trim()
        .notEmpty()
        .withMessage('Payment method is required')
        .isIn(['Credit Card', 'PayPal', 'Cash on Delivery'])
        .withMessage('Invalid payment method'),
    validate,
];
