import logger from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error server-side
    logger.error({
        timestamp: new Date(),
        path: req.path,
        method: req.method,
        userId: req.user?.id,
        ip: req.ip,
        statusCode,
        message,
        stack: err.stack,
        userAgent: req.headers["user-agent"],
    });

    // Return sanitized response
    const response = {
        success: false,
        message: statusCode === 500 ? "Internal Server Error" : message,
    };

    // Only include error details in development
    if (process.env.NODE_ENV !== "production" && err.details) {
        response.details = err.details;
    }

    // Include error code if available
    if (err.code) {
        response.code = err.code;
    }

    res.status(statusCode).json(response);
};

export default errorMiddleware;
