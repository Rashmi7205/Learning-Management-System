import { Course } from "../models/course.model.js";
import AppError from "../utils/user.error.js";
import { isBlank } from "../utils/validate.js";
import { ERROR_MESSAGES } from "../constants/index.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

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
    return ApiResponse(res,{
      statusCode:201,
      message:"Course created sucessfully",
      data:course
    });
  } catch (error) {
    return next(AppError(error.message, 500));
  }
};
const updateCourse = async (req, res, next) => {
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
    return ApiResponse(res,{
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    return next(AppError(error.message, 500));
  }
};
// getCourseById
const getCourseById = async (req, res, next) => {
  try {
    const { id: courseId } = req.params;

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return AppError(res, "Invalid Course ID", 400);
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const course = await Course.aggregate([
      {
        $match: {
          _id: courseObjectId,
          isArchived: { $ne: true }
        }
      },
      {
        $lookup: {
          from: "instructors",
          localField: "instructor",
          foreignField: "_id",
          as: "instructor"
        }
      },
      { $unwind: { path: "$instructor", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "instructor.user",
          foreignField: "_id",
          as: "instructorUser"
        }
      },
      { $unwind: { path: "$instructorUser", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "course",
          as: "reviews"
        }
      },
      {
        $addFields: {
          reviewCount: { $size: "$reviews" },
          averageRating: {
            $ifNull: [{ $avg: "$reviews.rating" }, 0]
          }
        }
      },
      {
        $project: {
          title: 1,
          subtitle: 1,
          description: 1,
          slug: 1,
          category: 1,
          thumbnail: 1,
          price: 1,
          discountPrice: 1,
          currency: 1,
          isFree: 1,
          status: 1,
          isFeatured: 1,
          bestseller: 1,
          publishedAt: 1,
          createdAt: 1,

          reviewCount: 1,
          averageRating: 1,

          instructor: {
            _id: "$instructor._id",
            title: "$instructor.title",
            expertise: "$instructor.expertise",
            rating: "$instructor.rating",
            totalStudents: "$instructor.totalStudents",
            totalCourses: "$instructor.totalCourses",
            isFeatured: "$instructor.isFeatured",
            user: {
              _id: "$instructorUser._id",
              firstName: "$instructorUser.firstName",
              lastName: "$instructorUser.lastName",
              avatar: "$instructorUser.avatar"
            }
          }
        }
      }
    ]);

    return ApiResponse(res, {
      statusCode: 200,
      message: "Course Data fetched",
      data: course
    })
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// getCourses
const getCourses = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, searchText, category } = req.query;
    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Number(limit), 50);

    if (category) {
      const categories = Array.isArray(category) ? category : [category];
      query.category = { $in: categories };
    }
    const query = { isArchived: { $ne: true } };
    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { subtitle: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } }
      ];
    }

    const courseStats = await Course.aggregate([
      { $match: query },

      /* ---------------- LOOKUPS ---------------- */

      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "course",
          as: "enrollments"
        }
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "course",
          as: "reviews"
        }
      },
      {
        $lookup: {
          from: "instructors",
          localField: "instructor",
          foreignField: "_id",
          as: "instructorData"
        }
      },
      {
        $unwind: {
          path: "$instructorData",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "instructorData.user",
          foreignField: "_id",
          as: "instructorUser"
        }
      },
      {
        $unwind: {
          path: "$instructorUser",
          preserveNullAndEmptyArrays: true
        }
      },

      /* ---------------- COMPUTED FIELDS ---------------- */

      {
        $addFields: {
          enrollmentCount: { $size: "$enrollments" },
          reviewCount: { $size: "$reviews" },

          completedEnrollments: {
            $size: {
              $filter: {
                input: "$enrollments",
                as: "e",
                cond: { $eq: ["$$e.isCompleted", true] }
              }
            }
          },

          approvedReviews: {
            $filter: {
              input: "$reviews",
              as: "r",
              cond: { $eq: ["$$r.isApproved", true] }
            }
          }
        }
      },
      {
        $addFields: {
          averageRating: {
            $ifNull: [
              { $avg: "$approvedReviews.rating" },
              0
            ]
          },
          completionRate: {
            $cond: {
              if: { $gt: ["$enrollmentCount", 0] },
              then: {
                $multiply: [
                  { $divide: ["$completedEnrollments", "$enrollmentCount"] },
                  100
                ]
              },
              else: 0
            }
          }
        }
      },

      /* ---------------- PROJECTION ---------------- */

      {
        $project: {
          title: 1,
          subtitle: 1,
          description: 1,
          slug: 1,
          category: 1,
          thumbnail: 1,
          price: 1,
          discountPrice: 1,
          currency: 1,
          isFree: 1,
          status: 1,
          isFeatured: 1,
          bestseller: 1,
          publishedAt: 1,
          createdAt: 1,

          enrollmentCount: 1,
          reviewCount: 1,
          averageRating: 1,
          completionRate: 1,

          instructor: {
            _id: "$instructorData._id",
            title: "$instructorData.title",
            expertise: "$instructorData.expertise",
            rating: "$instructorData.rating",
            totalStudents: "$instructorData.totalStudents",
            totalCourses: "$instructorData.totalCourses",
            isFeatured: "$instructorData.isFeatured",
            user: {
              firstName: "$instructorUser.firstName",
              lastName: "$instructorUser.lastName",
              avatar: "$instructorUser.avatar"
            }
          }
        }
      },

      /* ---------------- SORT + PAGINATION ---------------- */

      { $sort: { enrollmentCount: -1 } },

      {
        $facet: {
          data: [
            { $skip: (pageNum - 1) * limitNum },
            { $limit: limitNum }
          ],
          meta: [
            { $count: "total" }
          ]
        }
      }
    ]);

    const courses = courseStats[0].data;
    const total = courseStats[0].meta[0]?.total || 0;

    return ApiResponse(res, {
      statusCode: 200,
      data: courses,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });


  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
//get Course By instructor
const getCoursesByInstructor = async (req, res, next) => {
  try {
    const { instructorId } = req.params;
    const courses = await Course.find({ instructor: instructorId });
    return ApiResponse(res, {
      statusCode: 200,
      message: "Courses fetched successfully",
      data: courses
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// publishCourse
const publishCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, { status: "published", publishedAt: new Date() }, { new: true });
    if (!course) {
      return AppError(res, "Course not found", 404);
    }
    return ApiResponse(res, {
      statusCode: 200,
      message: "Course published successfully",
      data: course
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// getFeaturedCourses
const getFeaturedCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isFeatured: true, isArchived: { $ne: true } }).limit(10);
    return ApiResponse(res, {
      statusCode: 200,
      message: "Featured courses fetched successfully",
      data: courses
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}
// TODO deleteCourse
const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    //delete sections and lectures associated with the course
    const courseExist = await Course.findById(id);
    if (!courseExist) {
      return AppError(res, "Course not found", 404);
    }
    //remove the lecture files from storage as well

    await Lecture.deleteMany({ course: id });
    await Section.deleteMany({ course: id });

    //remove the storage items

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return AppError(res, "Course not found", 404);
    }
    return ApiResponse(res, {
      statusCode: 200,
      message: "Course deleted successfully",
      data: course
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
}

// TODO : get courses by instructor




export {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse
}