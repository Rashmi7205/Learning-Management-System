import Jwt from "jsonwebtoken";
import AppError from "../utils/user.error.js";
import logger from "../utils/logger.js";

const isLoggedIn = async (req, res, next) => {
    try {
        // Try to get token from cookie first, then Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            logger.security({
                message: "Missing authentication token",
                path: req.path,
                ip: req.ip,
            });
            return next(AppError(res, "Unauthenticated User", 401));
        }

        try {
            const userDetails = Jwt.verify(token, process.env.JWT_SECRET);
            req.user = userDetails;
            next();
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                logger.security({
                    message: "Expired token attempted",
                    ip: req.ip,
                });
                return AppError(res, "Token expired, please login again", 401);
            }
            if (err.name === "JsonWebTokenError") {
                logger.security({
                    message: "Invalid token attempted",
                    ip: req.ip,
                });
                return AppError(res, "Invalid token", 401);
            }
            throw err;
        }
    } catch (error) {
        logger.error({
            message: "Authentication error",
            error: error.message,
        });
        return AppError(res, "Authentication failed", 500);
    }
};

export const isInstructor = (req, res, next) => {
    try {
        if (!req.user) {
            return AppError(res, "Authentication required", 401);
        }
        if (req.user.role !== "instructor") {
            logger.security({
                message: "Non-instructor accessed instructor route",
                userId: req.user.id,
                path: req.path,
                ip: req.ip,
            });
            return AppError(res, "Access denied. Instructor only.", 403);
        }
        next();
    } catch (error) {
        return AppError(res, "Authorization error", 500);
    }
};

export const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return AppError(res, "Authentication required", 401);
        }
        if (req.user.role !== "admin") {
            logger.security({
                message: "Non-admin accessed admin route",
                userId: req.user.id,
                path: req.path,
                ip: req.ip,
            });
            return AppError(res, "Access denied. Admin only.", 403);
        }
        next();
    } catch (error) {
        return AppError(res, "Authorization error", 500);
    }
};

export const isAdminOrInstructor = (req, res, next) => {
    try {
        if (!req.user) {
            return AppError(res, "Authentication required", 401);
        }
        if (req.user.role !== "admin" && req.user.role !== "instructor") {
            logger.security({
                message: "Unauthorized role access",
                userId: req.user.id,
                role: req.user.role,
                path: req.path,
                ip: req.ip,
            });
            return AppError(res, "Access denied. Admin or Instructor only.", 403);
        }
        next();
    } catch (error) {
        return AppError(res, "Authorization error", 500);
    }
};

export default isLoggedIn;
