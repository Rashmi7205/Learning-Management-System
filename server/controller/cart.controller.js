import AppError from "../utils/user.error.js";
import {Cart} from '../models/cart.model.js'
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";

const getCart = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const cartData = await Cart.aggregate([
      { $match: { user: userId } },
      { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "courses",
          localField: "items.course",
          foreignField: "_id",
          as: "courseDetails"
        }
      },
      { $unwind: { path: "$courseDetails", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "instructors",
          localField: "courseDetails.instructor",
          foreignField: "_id",
          as: "instructorInfo"
        }
      },
      { $unwind: { path: "$instructorInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "instructorInfo.user",
          foreignField: "_id",
          as: "userData"
        }
      },
      { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$_id",
          items: {
            $push: {
              $cond: [
                { $gt: ["$items", null] },
                {
                  _id: "$courseDetails._id",
                  title: "$courseDetails.title",
                  thumbnail: "$courseDetails.thumbnail",
                  price: "$courseDetails.price",
                  discountPrice: "$courseDetails.discountPrice",
                  instructor: {
                    firstName: "$userData.firstName",
                    lastName: "$userData.lastName"
                  }
                },
                "$$REMOVE"
              ]
            }
          }
        }
      }
    ]);

    const cart = cartData[0] || { items: [] };

    res.status(200).json({
      success: true,
      cart: {
        items: cart.items,
        itemCount: cart.items.length,
      },
    });
  } catch (error) {
    console.error('Aggregation Cart Error:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

// Add course to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return AppError(res, 'Course ID is required', 400);
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return AppError(res, 'Course not found', 404);
    }

    // Check if course is published
    if (course.status !== 'published') {
      return AppError(res, 'Course is not available', 400);
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [], wishlistItems: [] });
    }

    // Check if course is already in cart
    if (cart.isInCart(courseId)) {
      return AppError(res, 'Course already in cart', 400);
    }

    // Add course to cart
    cart.items.push({ course: courseId });

    // Remove from wishlist if it's there
    cart.wishlistItems = cart.wishlistItems.filter(
      (item) => item.course.toString() !== courseId.toString()
    );

    await cart.save();

    // Populate and return updated cart
    await cart.populate({
      path: 'items.course',
      select: 'title subtitle thumbnail price discountPrice instructor category',
    });

    res.status(200).json({
      success: true,
      message: 'Course added to cart',
      cart: {
        items: cart.items,
        itemCount: cart.items.length,
      },
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    return AppError(res, 'Failed to add course to cart', 500);
  }
};

// Remove course from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    if (!courseId) {
      return AppError(res, 'Course ID is required', 400);
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return AppError(res, 'Cart not found', 404);
    }

    // Remove course from cart
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.course.toString() !== courseId.toString()
    );

    if (cart.items.length === initialLength) {
      return AppError(res, 'Course not found in cart', 404);
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Course removed from cart',
      cart: {
        items: cart.items,
        itemCount: cart.items.length,
      },
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    return AppError(res, 'Failed to remove course from cart', 500);
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return AppError(res, 'Cart not found', 404);
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart: {
        items: [],
        itemCount: 0,
      },
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    return AppError(res, 'Failed to clear cart', 500);
  }
};

// Move course from cart to wishlist
const moveToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;
    if (!courseId) return AppError(res, 'Course ID is required', 400);
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: { items: { course: courseId } },
        $addToSet: { wishlistItems: { course: courseId } }
      },
      { new: true }
    );

    if (!cart) return AppError(res, 'Cart not found', 404);

    res.status(200).json({
      success: true,
      message: 'Moved to wishlist successfully',
      cart: {
        items: cart.items,
        wishlistItems: cart.wishlistItems,
      },
    });
  } catch (error) {
    console.error('Move to wishlist error:', error);
    return AppError(res, 'Failed to move course', 500);
  }
};

// Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const result = await Cart.aggregate([
      { $match: { user: userId } },
      { $unwind: { path: "$wishlistItems", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "courses",
          localField: "wishlistItems.course",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "instructors",
          localField: "course.instructor",
          foreignField: "_id",
          as: "instructorDoc"
        }
      },
      { $unwind: { path: "$instructorDoc", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "instructorDoc.user",
          foreignField: "_id",
          as: "instructorUser"
        }
      },
      { $unwind: { path: "$instructorUser", preserveNullAndEmptyArrays: true } },

      // 6. Group and project the final clean objects
      {
        $group: {
          _id: "$_id",
          wishlistItems: {
            $push: {
              $cond: [
                { $gt: ["$course._id", null] }, // Only push if course exists
                {
                  _id: "$course._id",
                  title: "$course.title",
                  subtitle: "$course.subtitle",
                  thumbnail: "$course.thumbnail",
                  price: "$course.price",
                  discountPrice: "$course.discountPrice",
                  category: "$course.category",
                  averageRating: "$course.averageRating",
                  instructor: {
                    firstName: "$instructorUser.firstName",
                    lastName: "$instructorUser.lastName"
                  }
                },
                "$$REMOVE"
              ]
            }
          }
        }
      }
    ]);
    const wishlist = result[0] || { wishlistItems: [] };

    res.status(200).json({
      success: true,
      wishlist: {
        items: wishlist.wishlistItems,
        itemCount: wishlist.wishlistItems.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch wishlist' });
  }
};

// Add course to wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return AppError(res, 'Course ID is required', 400);
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return AppError(res, 'Course not found', 404);
    }

    // Check if course is published
    if (course.status !== 'published') {
      return AppError(res, 'Course is not available', 400);
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [], wishlistItems: [] });
    }

    // Check if course is already in wishlist
    if (cart.isInWishlist(courseId)) {
      return AppError(res, 'Course already in wishlist', 400);
    }

    // Add course to wishlist
    cart.wishlistItems.push({ course: courseId });
    await cart.save();

    // Populate and return updated wishlist
    await cart.populate({
      path: 'wishlistItems.course',
      select: 'title subtitle thumbnail price discountPrice instructor category',
    });

    res.status(200).json({
      success: true,
      message: 'Course added to wishlist',
      wishlist: {
        items: cart.wishlistItems,
        itemCount: cart.wishlistItems.length,
      },
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    return AppError(res, 'Failed to add course to wishlist', 500);
  }
};

// Remove course from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    if (!courseId) {
      return AppError(res, 'Course ID is required', 400);
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return AppError(res, 'Cart not found', 404);
    }

    // Remove course from wishlist
    const initialLength = cart.wishlistItems.length;
    cart.wishlistItems = cart.wishlistItems.filter(
      (item) => item.course.toString() !== courseId.toString()
    );

    if (cart.wishlistItems.length === initialLength) {
      return AppError(res, 'Course not found in wishlist', 404);
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Course removed from wishlist',
      wishlist: {
        items: cart.wishlistItems,
        itemCount: cart.wishlistItems.length,
      },
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    return AppError(res, 'Failed to remove course from wishlist', 500);
  }
};

// Clear entire wishlist
const clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return AppError(res, 'Cart not found', 404);
    }

    cart.wishlistItems = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Wishlist cleared successfully',
      wishlist: {
        items: [],
        itemCount: 0,
      },
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    return AppError(res, 'Failed to clear wishlist', 500);
  }
};

// Move course from wishlist to cart
const moveToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return AppError(res, 'Course ID is required', 400);
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return AppError(res, 'Cart not found', 404);
    }

    // Check if course is in wishlist
    if (!cart.isInWishlist(courseId)) {
      return AppError(res, 'Course not found in wishlist', 404);
    }

    // Remove from wishlist
    cart.wishlistItems = cart.wishlistItems.filter(
      (item) => item.course.toString() !== courseId.toString()
    );

    // Add to cart if not already there
    if (!cart.isInCart(courseId)) {
      cart.items.push({ course: courseId });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Course moved to cart',
      cart: {
        items: cart.items,
        itemCount: cart.items.length,
        wishlistItems: cart.wishlistItems,
        wishlistCount: cart.wishlistItems.length,
      },
    });
  } catch (error) {
    console.error('Move to cart error:', error);
    return AppError(res, 'Failed to move course to cart', 500);
  }
};

// Get cart summary (both cart and wishlist counts)
const getCartSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId }).select('items wishlistItems');

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [], wishlistItems: [] });
    }

    res.status(200).json({
      success: true,
      summary: {
        cartCount: cart.items.length,
        wishlistCount: cart.wishlistItems.length,
      },
    });
  } catch (error) {
    console.error('Get cart summary error:', error);
    return AppError(res, 'Failed to fetch cart summary', 500);
  }
};

export  {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  moveToWishlist,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  moveToCart,
  getCartSummary,
};