import User from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";
import AppError from "../utils/user.error.js";
import fs from "fs/promises";
import crypto from "crypto";
import { isBlank, validatePassword } from "../utils/validate.js";
import { ERROR_MESSAGES } from "../constants/index.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/user.error.js";
import generateOtp from "../utils/generateOtp.js";
import sendSms from "../utils/sendSms.js";
import { deleteImage, uploadImage } from "../services/s3.js";


const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000,/// 7 days
    httpOnly: true
}

const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    if (isBlank(firstName) || isBlank(lastName) || isBlank(email)) {
        return AppError(res, ERROR_MESSAGES.REQUIRED_FIELD, 400);
    }
    const isValidPassword = validatePassword(password);
    if (!isValidPassword.valid) {
        return AppError(res, isValidPassword.message, 400);
    }

    // If there is an existing user in the DB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return AppError(res, ERROR_MESSAGES.ALREADY_EXISTS, 400);
    }

    // Creating a user

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        avatar: {
            publicId: "#",
            secureUrl: "#"
        },
        lastLoginAt: new Date(),
    })

    if (!user) {
        return AppError(res, "User Registration Failed!", 400);
    }

    /// Saving the user
    await user.save();

    user.password = undefined;

    const token = await user.generateJWTtoken();
    res.cookie('token', token, cookieOption)

    return ApiResponse(res, {
        statusCode: 200,
        message: "User registered successfully",
        data: user
    });
}
const login = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        if (isBlank(email) || isBlank(password)) {
            return AppError(res, ERROR_MESSAGES.REQUIRED_FIELD, 400);
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 400);
        }
        const passwordMatched = await user.comparePassword(password);
        if (!passwordMatched) {
            return AppError(res, ERROR_MESSAGES.INCORRECT_PASS_OR_USERNAME, 400);
        }


        user.lastLoginAt = new Date();
        await user.save({ validateBeforeSave: false });

        user.password = undefined;

        const token = await user.generateJWTtoken();


        res.cookie('token', token, cookieOption);

        return ApiResponse(res, {
            statusCode: 200,
            message: "User loggin successful",
            data: user
        });

    } catch (error) {
        return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return ApiResponse(res, {
            statusCode: 200,
            message: "User logged out successfully",
        });
    } catch (error) {
        return ApiResponse(res, {
            statusCode: 200,
            message: ERROR_MESSAGES.OPERATION_FAILED,
        });
    }
}
const getProfile = async (req, res, next) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id);
        if (!user) {
            return AppError(res, ERROR_MESSAGES.NOT_FOUND, 404);
        }
        return ApiResponse(res, {
            statusCode: 200,
            data: user
        });
    } catch (error) {
        return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 404);
    }

}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return AppError(res, "Email is required", 400);
        }

        const user = await User.findOne({ email });

        if (!user) {
            return AppError(res, "Account does not exist", 404);
        }

        // Generate token
        const resetToken = await user.generatePasswordResetToken();
        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const subject = "Reset Your Password";
        const message = `
      <p>You requested a password reset.</p>
      <p>
        <a href="${resetPasswordUrl}" target="_blank">
          Click here to reset your password
        </a>
      </p>
    `;

        const emailSent = await sendEmail(email, subject, message);

        if (!emailSent) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpiry = undefined;
            await user.save({ validateBeforeSave: false });

            return AppError(res, "Email could not be sent", 500);
        }

        return ApiResponse(res, {
            statusCode: 200,
            message: `Reset password link sent to ${email}`,
        });

    } catch (error) {
        return AppError(
            res,
            ERROR_MESSAGES.OPERATION_FAILED,
            500,
        );
    }
};


const resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;

        if (!password) {
            return AppError(res, "Password is required", 400);
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: Date.now() },
        }).select("+password");

        if (!user) {
            return AppError(res, "Token is invalid or expired", 400);
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save();

        return ApiResponse(res, {
            statusCode: 200,
            message: "Password reset successfully"
        });
    } catch (error) {
        return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
    }

};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;
        if (!currentPassword || !newPassword) {
            return AppError(res, "All fields are mandatory", 400);
        }
        const isValidPassword = validatePassword(newPassword);
        if (!isValidPassword.valid) {
            return AppError(res, isValidPassword.message, 400);
        }

        const user = await User.findById(userId).select("+password");

        if (!user) {
            return AppError(res, "User does not exist", 404);
        }

        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return AppError(res, "Old password is incorrect", 401);
        }

        user.password = newPassword;
        await user.save();

        return ApiResponse(res, {
            statusCode: 200,
            message: "Password updated successfully"
        });
    } catch (error) {
        return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
    }
};


const updateProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, phone, bio, gender, dob, country } = req.body;
        if (isBlank(firstName) || isBlank(lastName) || isBlank(phone) || isBlank(bio) || isBlank(gender) || isBlank(dob) || isBlank(country)) {
            return ApiError(res, ERROR_MESSAGES.REQUIRED_FIELD, 404);
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return AppError(res, "User does not exist", 404);
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;
        user.bio = bio;
        user.gender = gender
        user.dob = dob;
        user.country = country;

        // File Upload To Cloudinary
        if(req.file){
            try {
            if(user.avatar.publicId && user.avatar.publicId !== "#"){
                    //delete existing image
                    await deleteImage(user.avatar.publicId);
            }
            const {publicId,secureUrl} = await uploadImage(req.file?.path);
                if(publicId && secureUrl){
                    user.avatar.publicId = publicId;
                    user.avatar.secureUrl = secureUrl;
                }
            } catch (e) {
                //remove the uploaded file from temp folder in case of error
                fs.rmSync(req.file?.path);
                return AppError(res,'file not uploaded try again',500);
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
    }
};

//send email otp
const sendEmailOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (isBlank(email)) {
            return AppError(res, ERROR_MESSAGES.REQUIRED_FIELD, 400);
        }
        const user = await User.findOne({ email });
        if (!user) {
            return AppError(res, "Account does not exist", 404);
        }
        // Generate OTP
        const otp = generateOtp();
        user.verificationToken = otp;
        user.verificationExpiry = Date.now() + 10 * 60 * 1000;
        await user.save({ validateBeforeSave: false });
        const subject = "Your Email Verification OTP";
        const message = `
      <p>Your OTP for email verification is: <strong>${otp}</strong></p> `
        const emailSent = await sendEmail(email, subject, message);
        if (!emailSent) {
            user.verificationToken = undefined;
            user.verificationExpiry = undefined;
            await user.save({ validateBeforeSave: false });
            return AppError(res, "Email could not be sent", 500);
        }
        return ApiResponse(res, {
            statusCode: 200,
            message: `OTP sent to ${email}`,
        });
    } catch (error) {
        return AppError(
            res,
            ERROR_MESSAGES.OPERATION_FAILED,
            500,
        );
    }
};

//send mobile otp
const sendPhoneOtp = async (req, res, next) => {
    try {
        const { phone } = req.body;
        const {id} = req.user;
        if(!id){
            return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 400);
        }
        if (isBlank(phone)) {
            return AppError(res, ERROR_MESSAGES.REQUIRED_FIELD, 400);
        }
        const user = await User.findById(id);
        if (!user) {
            return AppError(res, "Account does not exist", 404);
        }
        // Generate OTP
        const otp = generateOtp();
        user.verificationToken = otp;
        user.verificationExpiry = Date.now() + 10 * 60 * 1000;
        await user.save({ validateBeforeSave: false });
        const message = `Your OTP for phone verification is: ${otp}`;
        const smsSent = await sendSms(phone, message);
        if (!smsSent) {
            user.verificationToken = undefined;
            user.verificationExpiry = undefined;
            await user.save({ validateBeforeSave: false });
            return AppError(res, "SMS could not be sent", 500);
        }
        return ApiResponse(res, {
            statusCode: 200,
            message: `OTP sent to ${phone}`,
        });
    }
    catch (error) {
        return AppError(
            res,
            ERROR_MESSAGES.OPERATION_FAILED,
            500,
        );
    }
};
//verify email
const verifyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.body;
        const user = await User.findOne({
            verificationToken,
            verificationExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return AppError(res, "Token is invalid or expired", 400);
        }
        user.emailVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiry = undefined;
        await user.save();

        return ApiResponse(res, {
            statusCode: 200,
            message: "Email verified successfully"
        });
    } catch (error) {
        return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
    }
};


//verify phone
const verifyPhone = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({
            verificationToken,
            verificationExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return AppError(res, "Token is invalid or expired", 400);
        }
        user.phoneVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiry = undefined;
        await user.save();

        return ApiResponse(res, {
            statusCode: 200,
            message: "Phone verified successfully"
        });
    } catch (error) {
        return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
    }
};

export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    sendEmailOtp,
    sendPhoneOtp,
    verifyEmail,
    verifyPhone
}