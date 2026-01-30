import {Router} from 'express';

import { createOrderAndInitializePayment, verifyRazorpayPayment } from '../controller/payment.controller.js';
import isLoggedIn from '../middlewares/auth.user.js';

const paymentRouter = Router();

paymentRouter.post('/orders', isLoggedIn, createOrderAndInitializePayment);
paymentRouter.post('/razorpay/verify', isLoggedIn,verifyRazorpayPayment);
export default paymentRouter;