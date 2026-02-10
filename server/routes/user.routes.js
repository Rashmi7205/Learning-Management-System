import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,
  sendEmailOtp,
  sendPhoneOtp,
  verifyEmail,
  verifyPhone,
  getUserOrders,
  updateProfileImage
} from "../controller/user.controller.js";
import isLoggedIn from "../middlewares/auth.user.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication APIs
 *   - name: User
 *     description: User Profile APIs
 *   - name: Verification
 *     description: Email & Phone Verification
 */

/* ================= REGISTER ================= */
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", register);

/* ================= LOGIN ================= */
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

/* ================= LOGOUT ================= */
/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get("/logout", isLoggedIn, logout);

/* ================= GET PROFILE ================= */
/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.get("/profile", isLoggedIn, getProfile);

/* ================= UPDATE PROFILE ================= */
/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               bio:
 *                 type: string
 *               gender:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               country:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
// Update profile 
router.put("/update-profile", isLoggedIn, updateProfile);

// Update profile image only
router.put("/update-avatar", isLoggedIn, upload.single("avatar"), updateProfileImage);

/* ================= FORGOT PASSWORD ================= */
/**
 * @swagger
 * /users/reset:
 *   post:
 *     summary: Send reset password email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset link sent
 */
router.post("/reset", forgotPassword);

/* ================= RESET PASSWORD ================= */
/**
 * @swagger
 * /users/reset/{resetToken}:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post("/reset/:resetToken", resetPassword);

/* ================= CHANGE PASSWORD ================= */
/**
 * @swagger
 * /users/change-password:
 *   post:
 *     summary: Change password
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
router.post("/change-password", isLoggedIn, changePassword);

/* ================= SEND EMAIL OTP ================= */
/**
 * @swagger
 * /users/send-email-otp:
 *   post:
 *     summary: Send email OTP
 *     tags: [Verification]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 */
router.post("/send-email-otp", isLoggedIn, sendEmailOtp);

/* ================= SEND PHONE OTP ================= */
/**
 * @swagger
 * /users/send-phone-otp:
 *   post:
 *     summary: Send phone OTP
 *     tags: [Verification]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [phone]
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to phone
 */
router.post("/send-phone-otp", isLoggedIn, sendPhoneOtp);

/* ================= VERIFY EMAIL ================= */
/**
 * @swagger
 * /users/verify-email:
 *   post:
 *     summary: Verify email using OTP
 *     tags: [Verification]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [verificationToken]
 *             properties:
 *               verificationToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified
 */
router.post("/verify-email", isLoggedIn, verifyEmail);

/* ================= VERIFY PHONE ================= */
/**
 * @swagger
 * /users/verify-phone:
 *   post:
 *     summary: Verify phone using OTP
 *     tags: [Verification]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [verificationToken]
 *             properties:
 *               verificationToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Phone verified
 */
router.post("/verify-phone", isLoggedIn, verifyPhone);

router.get("/orders", isLoggedIn, getUserOrders);

export default router;
