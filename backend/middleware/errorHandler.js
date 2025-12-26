/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let status = err.status || 500;
    let message = err.message || 'Internal server error';

    // Specific error types
    if (err.name === 'ValidationError') {
        status = 400;
        message = err.message;
    }

    if (err.name === 'UnauthorizedError') {
        status = 401;
        message = 'Invalid token';
    }

    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

/**
 * 404 handler
 */
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
};
