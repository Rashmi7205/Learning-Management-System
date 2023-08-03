import User from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";
import AppError from "../utils/user.error.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import crypto from "crypto";
import bcrypt from 'bcrypt';

const cookieOption = {
    maxAge:7*24*60*60*1000,/// 7 days
    httpOnly:true
}

const  register = async(req,res,next)=>{
    const {fullName,email,password} = req.body;
    
    if(!fullName||!email||!password){
        return next(new AppError("All fields are Required",400));
    }

    /// If there is an existing user in the DB
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new AppError("Already user exists",400));
    }

    /// Creating a user

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:"##"
        }
    })

    if(!user){
        return next(new AppError("User Registration Failed!",400));
    }

    // / File Upload To Cloudinary
    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"lms",
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            });
            if(result){
                user.avatar.public_id=result.public_id;
                user.avatar.secure_url=result.secure_url;

                /// Remove the file from server
                fs.rm( `uploads/${req.file.filename}`);
            }
        } catch (e) {
            return next(new AppError('file not uploaded try again',500));
        }
    }

    /// Saving the user
    await user.save();

    user.password=undefined;

    const token = await user.generateJWTtoken();
    res.cookie('token',token,cookieOption)

   res.status(200).json({
        success:true,
        message:"USer Registered Successfully",
        user
    })

} 
const  login = async(req,res,next)=>{

    const {email,password} = req.body;
    try {
        if(!email||!password){
            return next(new AppError("Every field is required",400));
        }
    
        const user = await User.findOne({email}).select('+password');
    
        if(!user || !user.comparePassword(password)){
            return next(new AppError('Email or password Does not match',400));
        }
    
        user.password=undefined;
        const token = await user.generateJWTtoken();
      
    
        res.cookie('token',token,cookieOption);
    
        res.status(200).json({
            success:true,
            message:"User Logged in Successfully",
            user
        })
    
    } catch (error) {
        return next(new AppError(error.message,500));
    }
    

} 
const  logout = async(req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"User Logged out Successfully"
    })
} 
const  getProfile = async(req,res,next)=>{
    const {email} = req.user.email;
    try {
        const user = await User.findOne(email);
        res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            user
        })
    } catch (error) {
        return next(new AppError('User data Fetching failed',404))
    }
   
} 

const forgotPassword = async (req,res,next)=>{

    const {email}= req.body;
    
    if(!email){
        return next(new AppError("Email is Required",400));
    }

    const user = await User.findOne({email});

    if(!user){
        return next(new AppError("Account Not Exist",400));
    }

    const resetToken =await user.generatePasswordResetToken();


    await user.save();

    const resetPasswordUrl=`link/reset-password/${resetToken}`;

    const subject = "Reset Password";
    const message = `You can  Can reset your password By Clicking <a href ="${resetPasswordUrl}" target="_blank">Click Here</a>`

    try {
        await sendEmail(email,subject,message);
        res.status(200).json({
            success:true,
            message:`Reset Password token has been sent to ${email}`
        })
    } catch (e) {
        user.forgotPasswordExpiaryDate=undefined;
        user.forgotPasswordToken=undefined;
        await user.save();

        return next(new AppError(e.message,400));
    }

   

}


const resetPassword = async (req,res,next)=>{
    const {resetToken} = req.params;

    
    const {password} = req.body;

    const user =  await User.findOne({
        forgotPasswordToken:resetToken,
        forgotPasswordExpiaryDate:{$gt:Date.now()}
    });
    const forgotPasswordToken = crypto
                            .createHash('sha256')
                            .update(resetToken)
                            .digest('hex');
    if(!user){
        return next(new AppError("User Not Found",400));
    }

    user.password=password;
    user.forgotPasswordExpiaryDate=undefined;
    user.forgotPasswordToken=undefined;

    user.save();

        res.status(200).json({
            success:true,
            message:"Your Password Reset Succsessfully!"
        });


}
const changePassword = async (req,res,next)=>{
    const {oldPassword,newPassword} = req.body;
    const {id} = req.user;
    if(!oldPassword||!newPassword){
        return next(new AppError("Every Field is mandatory",400));
    }

    const user = await User.findById(id).select('+password');

    if(!user){
        return next(new AppError("User Does not exist",400));
    }

    const isvalidPassword = await user.comparePassword(oldPassword);

    if(!isvalidPassword){
        return next(new AppError("password invalid"));
    }
    
    user.password = newPassword;
    user.save();
    user.password = undefined;
    res.status(200).json({
        success:true,
        message:"Password Updated Succsessfully"
    })
    
}
const updateProfile = async (req,res,next)=>{
    const {fullName} = req.body;
    const {id} = req.user;

    const user = await User.findById(id);

    if(!user){
        return next(new AppError("User Does not exist",400));
    }

    if(fullName){
        user.fullName = fullName;
    }

    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"lms",
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            });
            if(result){
                user.avatar.public_id=result.public_id;
                user.avatar.secure_url=result.secure_url;

                /// Remove the file from server
                fs.rm( `uploads/${req.file.filename}`);
            }
        } catch (e) {
            return next(new AppError('file not uploaded try again',500));
        }
    }
    await user.save();

    res.status(200).json({
        success:true,
        message:"Profile Updated succsessfully"
    })
}


export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile
}