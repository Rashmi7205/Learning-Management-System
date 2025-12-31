import ApiError from "../utils/user.error.js";
import AppError from "../utils/user.error.js";
import Jwt  from "jsonwebtoken";

const isLoggedIn = async (req,res,next)=>{

    try {
        const {token} = req.cookies;
        if(!token){
            return next(AppError(res,'Unauthenticated User',400));
        }
        const userDetails =  Jwt.verify(token,process.env.JWT_SECRET);
        req.user = userDetails;

        next();
    } catch (error) {
        return ApiError(res,error.message,500);
    }

}
export const isInstructor = (req, res, next) => {
    try {
        if (!req.user) {
            return next(AppError(res, "Authentication required", 401));
        }

        if (req.user.role !== "instructor") {
            return next(
                AppError(res, "Access denied. Instructor only.", 403)
            );
        }
        next();
    } catch (error) {
        return next(AppError(res, error.message, 500));
    }
};

export const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return next(AppError(res, "Authentication required", 401));
        }

        if (req.user.role !== "admin") {
            return next(
                AppError(res, "Access denied. Admin only.", 403)
            );
        }

        next();
    } catch (error) {
        return next(AppError(res, error.message, 500));
    }
};

export const isAdminOrInstructor = (req, res, next) => {
    try {
        if (!req.user) {
            return next(AppError(res, "Authentication required", 401));
        }
        if (req.user.role !== "admin" && req.user.role !== "instructor") {
            return next(
                AppError(res, "Access denied. Admin or Instructor only.", 403)
            );
        }
        next();
    } catch (error) {
        return next(AppError(res, error.message, 500));
    }
}

export default isLoggedIn