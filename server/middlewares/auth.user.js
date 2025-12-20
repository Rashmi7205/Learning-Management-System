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

export default isLoggedIn