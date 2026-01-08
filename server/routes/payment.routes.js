import {Router} from 'express';

import { createOrder, initializeRazorpayPayment, verifyRazorpayPayment } from '../controller/payment.controller.js';
import isLoggedIn from '../middlewares/auth.user.js';

const paymentRouter = Router();

paymentRouter.post('/orders',isLoggedIn, createOrder);
paymentRouter.post('/razorpay/initialize',isLoggedIn, initializeRazorpayPayment);
paymentRouter.post('/razorpay/verify', isLoggedIn,verifyRazorpayPayment);
export default paymentRouter;