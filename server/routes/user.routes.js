import { Router } from "express";
import { register, login, logout, getProfile, forgotPassword, resetPassword, updateProfile, changePassword, sendEmailOtp, sendPhoneOtp, verifyEmail, verifyPhone } from "../controller/user.controller.js";
import isLoggedIn from '../middlewares/auth.user.js'
import upload from "../middlewares/multer.middleware.js";

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/logout', isLoggedIn,logout);
router.get('/profile', isLoggedIn, getProfile);
router.put('/update', isLoggedIn, upload.single('avatar'), updateProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changePassword);
router.post('/send-email-otp', isLoggedIn, sendEmailOtp);
router.post('/send-phone-otp', isLoggedIn, sendPhoneOtp);
router.post('/verify-email', isLoggedIn, verifyEmail);
router.post('/verify-phone', isLoggedIn, verifyPhone);

export default router;