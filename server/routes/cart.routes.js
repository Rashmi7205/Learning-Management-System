import { Router } from 'express';
import  {  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  moveToWishlist,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  moveToCart,
  getCartSummary } from '../controller/cart.controller.js';
import isLoggedIn from "../middlewares/auth.user.js";

const cartRouter = Router();
// Get user's cart
cartRouter.get('/', isLoggedIn, getCart);

// Add course to cart
cartRouter.post('/add', isLoggedIn, addToCart);

// Remove course from cart
cartRouter.delete('/remove/:courseId', isLoggedIn, removeFromCart);

// Clear entire cart
cartRouter.delete('/clear', isLoggedIn, clearCart);

// Move course from cart to wishlist
cartRouter.post('/move-to-wishlist', isLoggedIn, moveToWishlist);

// ==================== WISHLIST ROUTES ====================

// Get user's wishlist
cartRouter.get('/wishlist', isLoggedIn, getWishlist);

// Add course to wishlist
cartRouter.post('/wishlist/add', isLoggedIn, addToWishlist);

// Remove course from wishlist
cartRouter.delete('/wishlist/remove/:courseId', isLoggedIn, removeFromWishlist);

// Clear entire wishlist
cartRouter.delete('/wishlist/clear', isLoggedIn, clearWishlist);

// Move course from wishlist to cart
cartRouter.post('/wishlist/move-to-cart', isLoggedIn, moveToCart);


// Get cart summary (counts only)
cartRouter.get('/summary', isLoggedIn, getCartSummary);

export default  cartRouter;