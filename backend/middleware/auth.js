import { getUserFromToken } from '../lib/supabase.js';

/**
 * Middleware to verify JWT token from Supabase
 */
export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'No authorization token provided'
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        const user = await getUserFromToken(token);

        // Attach user to request object
        req.user = user;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
};

/**
 * Optional auth - doesn't fail if no token, but attaches user if present
 */
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const user = await getUserFromToken(token);
            req.user = user;
        }

        next();
    } catch (error) {
        // Continue without user
        next();
    }
};
