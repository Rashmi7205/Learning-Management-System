import { Course } from "../models/course.model.js";
import AppError from "../utils/user.error.js";
import { isBlank } from "../utils/validate.js";
import { ERROR_MESSAGES } from "../constants/index.js";

// createCourse
const createCourse = async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      description,
      whatYouWillLearn,
      requirements,
      category,
      price,
      discountPrice,
      currency,
      isFree,
      subscriptionIncluded,
      status,
    } = req.body;

    // Basic Validations
    if (isBlank(title)) {
      return next(AppError("Course title cannot be blank", 400));
    }
    if (isBlank(subtitle)) {
      return next(AppError("Course subtitle cannot be blank", 400));
    }
    if (isBlank(description)) {
      return next(AppError("Course description cannot be blank", 400));
    }
    if (isBlank(whatYouWillLearn)) {
      return next(
        AppError("At least one learning outcome must be specified", 400)
      );
    }
    if (isBlank(requirements)) {
      return next(
        AppError("At least one course requirement must be specified", 400)
      );
    }
    if (
      isBlank(category) ||
      !Array.isArray(category) ||
      category.length === 0
    ) {
      return next(
        AppError("At least one course category must be specified", 400)
      );
    }

    if (!price || isNaN(price) || price < 0) {
      return next(
        AppError("Course price must be a valid non-negative number", 400)
      );
    }
    if (isNaN(discountPrice) || discountPrice < 0) {
      return next(
        AppError("Discount price must be a valid non-negative number", 400)
      );
    }
    if (discountPrice > price) {
      return next(
        AppError("Discount price cannot be greater than the course price", 400)
      );
    }
    if (isBlank(currency)) {
      return next(AppError("Currency cannot be blank", 400));
    }
    if (isFree === true) {
      req.body.price = 0;
      req.body.discountPrice = 0;
      req.body.currency = "INR";
    }

    // Create Course Logic Here
    const course = await Course.create({
      title,
      subtitle,
      description,
      whatYouWillLearn,
      requirements,
      category,
      price,
      discountPrice,
      currency,
      isFree,
      subscriptionIncluded: subscriptionIncluded || false,
      status: status || "draft",
    });
  } catch (error) {
    return next(AppError(error.message, 500));
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      subtitle,
      description,
      whatYouWillLearn,
      requirements,
      category,
      price,
      discountPrice,
      currency,
      isFree,
      subscriptionIncluded,
      status,
    } = req.body;
    // Basic Validations
    if (isBlank(title)) {
      return next(AppError("Course title cannot be blank", 400));
    }
    if (isBlank(subtitle)) {
      return next(AppError("Course subtitle cannot be blank", 400));
    }
    if (isBlank(description)) {
      return next(AppError("Course description cannot be blank", 400));
    }
    if (isBlank(whatYouWillLearn)) {
      return next(
        AppError("At least one learning outcome must be specified", 400)
      );
    }
    if (isBlank(requirements)) {
      return next(
        AppError("At least one course requirement must be specified", 400)
      );
    }
    if (
      isBlank(category) ||
      !Array.isArray(category) ||
      category.length === 0
    ) {
      return next(
        AppError("At least one course category must be specified", 400)
      );
    }
    if (!price || isNaN(price) || price < 0) {
      return next(
        AppError("Course price must be a valid non-negative number", 400)
      );
    }
    if (isNaN(discountPrice) || discountPrice < 0) {
      return next(
        AppError("Discount price must be a valid non-negative number", 400)
      );
    }
    if (discountPrice > price) {
      return next(
        AppError("Discount price cannot be greater than the course price", 400)
      );
    }
    if (isBlank(currency)) {
      return next(AppError("Currency cannot be blank", 400));
    }
    if (isFree === true) {
      req.body.price = 0;
      req.body.discountPrice = 0;
      req.body.currency = "INR";
    }
    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return next(AppError("Course not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    return next(AppError(error.message, 500));
  }
};
// updateCourse
const updateCourse = async (req, res, next) => {
  try {

  } catch (error) {
      return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// getCourseById
const getCourseById = async (req, res, next) => {
  try {

  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// getCourses
const getCourses = async (req, res, next) => {
  try {

  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// publishCourse
const publishCourse = async (req, res, next) => {
  try {

  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// getFeaturedCourses
const getFeaturedCourses = async (req, res, next) => {
  try {

  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// deleteCourse

//update course c
