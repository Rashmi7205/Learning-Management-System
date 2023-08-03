import AppError from "../utils/user.error.js";
import Jwt  from "jsonwebtoken";

const isLoggedIn = async (req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated USer',400));
    }
    const userDetails = await Jwt.verify(token,process.env.JWT_SECRET);
   
    req.user = userDetails;

    next();

}

export default isLoggedIn