// Mongoose connection error handlers

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new Error(message);
};

const handleDuplicateKeyError = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    return new Error(message);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors)
        .map((el) => el.message)
        .join(', ');
    const message = `Invalid input data: ${errors}`;
    return new Error(message);
};

const handleJWTError = () => {
    return new Error('Invalid token. Please log in again');
};

const handleJWTExpiredError = () => {
    return new Error('Token expired. Please log in again');
};

// Main error handler middleware
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong MongoDB ID error
    if (err.name === 'CastError') {
        err = handleCastError(err);
    }

    // Duplicate key error
    if (err.code === 11000) {
        err = handleDuplicateKeyError(err);
    }

    // Validation error
    if (err.name === 'ValidationError') {
        err = handleValidationError(err);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        err = handleJWTError();
    }

    if (err.name === 'TokenExpiredError') {
        err = handleJWTExpiredError();
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

module.exports = errorHandler;