import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';

/**
 * General API Rate Limiter
 * Limits each IP to 100 requests per 15-minute window
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    message: {
        message: 'Too many requests from this IP, please try again after 15 minutes.',
    },
});

/**
 * Strict Rate Limiter for Authentication & Sensitive Actions
 * Limits each IP to 10 requests per 15-minute window (brute-force protection)
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window
    standardHeaders: true,
    legacyHeaders: false, // Disable legacy headers
    message: {
        message: 'Too many authentication attempts. Please try again after 15 minutes.',
    },
});

/**
 * Configure Helmet HTTP Security Headers
 */
export const configureHelmet = () => {
    return helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                imgSrc: ["'self'", "data:", "https:", "http:"],
                connectSrc: ["'self'", "http:", "https:"],
            },
        },
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" },
    });
};

/**
 * Middleware to sanitize MongoDB queries against NoSQL Injection
 */
export const sanitizeData = () => {
    return mongoSanitize({
        allowDots: true,
        replaceWith: '_',
    });
};

/**
 * Middleware for HTTP Parameter Pollution (HPP) protection
 */
export const preventHpp = () => {
    return hpp({
        whitelist: ['price', 'category', 'ratings', 'sort', 'page', 'limit'],
    });
};

/**
 * Helper to escape regex special characters to prevent ReDoS (Regex Denial of Service)
 */
export const escapeRegex = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
