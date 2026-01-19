import mongoose from "mongoose";
import fs from "fs";
import {
  Course,
  Enrollment,
  Lecture,
  Section,
} from "../models/course.model.js";
// import { Certificate, progresses } from "../models/course.model.js";
import { Certificate } from "../models/course.model.js";
import { Progress } from "../models/course.model.js";
import AppError from "../utils/user.error.js";
import { isBlank } from "../utils/validate.js";
import { ERROR_MESSAGES } from "../constants/index.js";
import ApiResponse from "../utils/apiResponse.js";
import { Instructor } from "../models/user.model.js";
import User from "../models/user.model.js";
import { generateCertificatePDF } from "../utils/pdf.genreator.js";
import { uploadAttachment } from "../services/s3.js";

import {
  deleteImage,
  deleteVideo,
  uploadImage,
  uploadVideo,
} from "../services/s3.js";

// createCourse
const createCourse = async (req, res, next) => {
  let uploadedThumbnail = null;
  let uploadedPromoVideo = null;

  const localThumbnailPath = req.files?.thumbnail?.[0]?.path;
  const localPromoVideoPath = req.files?.promoVideo?.[0]?.path;

  try {
    const { id } = req.user;
    if (!id) return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 401, req.files);

    const instructor = await Instructor.findOne({ user: id });
    if (!instructor) {
      return AppError(res, "Instructor does not exist", 404, req.files);
    }

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
      status,
    } = req.body;
    if (isBlank(title))
      return AppError(res, "Course title cannot be blank", 400, req.files);
    if (isBlank(subtitle))
      return AppError(res, "Course subtitle cannot be blank", 400, req.files);
    if (isBlank(description))
      return AppError(
        res,
        "Course description cannot be blank",
        400,
        req.files
      );

    if (!Array.isArray(category) || !category.length) {
      return AppError(res, "At least one category required", 400, req.files);
    }
    if (!Array.isArray(whatYouWillLearn) || !whatYouWillLearn.length) {
      return AppError(
        res,
        "At least one learning outcome required",
        400,
        req.files
      );
    }

    if (!Array.isArray(requirements) || !requirements.length) {
      return AppError(res, "At least one requirement required", 400, req.files);
    }

    if (!Array.isArray(category) || !category.length) {
      return AppError(res, "At least one category required", 400, req.files);
    }

    if (!isFree && (!price || price < 0)) {
      return AppError(res, "Invalid course price", 400, req.files);
    }

    if (Number(discountPrice) > Number(price)) {
      console.log(discountPrice, price);
      return AppError(
        res,
        "Discount price cannot exceed price",
        400,
        req.files
      );
    }

    if (localThumbnailPath) {
      uploadedThumbnail = await uploadImage(localThumbnailPath);
    }

    if (localPromoVideoPath) {
      uploadedPromoVideo = await uploadVideo(localPromoVideoPath);
    }
    const course = await Course.create({
      title,
      subtitle,
      description,
      whatYouWillLearn,
      requirements,
      instructor: instructor._id,
      category,
      price: isFree ? 0 : price,
      discountPrice: isFree ? 0 : discountPrice,
      currency: isFree ? "INR" : currency,
      isFree,
      status: status || "draft",
      thumbnail: {
        publicId: uploadedThumbnail?.publicId || "",
        secureUrl: uploadedThumbnail?.secureUrl || "",
      },
      promoVideo: {
        publicId: uploadedPromoVideo?.publicId || "",
        secureUrl: uploadedPromoVideo?.secureUrl || "",
      },
    });

    return ApiResponse(res, {
      statusCode: 201,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error(error);
    if (uploadedThumbnail?.publicId) {
      await deleteImage(uploadedThumbnail.publicId);
    }
    if (uploadedPromoVideo?.publicId) {
      await deleteVideo(uploadedPromoVideo.publicId);
    }
    return AppError(res, error.message, 500, req.files);
  }
};

//update course
const updateCourse = async (req, res) => {
  let newThumbnail = null;
  let newPromoVideo = null;

  const localThumbnailPath = req.files?.thumbnail?.[0]?.path;
  const localPromoVideoPath = req.files?.promoVideo?.[0]?.path;

  try {
    const { id } = req.user;
    const { courseId } = req.params;

    if (!id)
      return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 401, null, req.files);
    if (!courseId)
      return AppError(res, "Course ID is required", 400, null, req.files);

    const instructor = await Instructor.findOne({ user: id });
    if (!instructor) {
      return AppError(res, "Instructor does not exist", 404, null, req.files);
    }

    const course = await Course.findOne({
      _id: courseId,
      instructor: instructor._id,
    });

    if (!course) {
      return AppError(res, "Course not found", 404, null, req.files);
    }

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
      status,
    } = req.body;

    if (isBlank(title))
      return AppError(res, "Title required", 400, null, req.files);
    if (isBlank(subtitle))
      return AppError(res, "Subtitle required", 400, null, req.files);
    if (isBlank(description))
      return AppError(res, "Description required", 400, null, req.files);

    if (!Array.isArray(category) || !category.length) {
      return AppError(res, "Category required", 400, null, req.files);
    }
    if (!Array.isArray(whatYouWillLearn) || !whatYouWillLearn.length) {
      return AppError(res, "Learning outcomes required", 400, null, req.files);
    }
    if (!Array.isArray(requirements) || !requirements.length) {
      return AppError(res, "Requirements required", 400, null, req.files);
    }

    if (!isFree && (!price || price < 0)) {
      return AppError(res, "Invalid price", 400, null, req.files);
    }
    if (Number(discountPrice) > Number(price)) {
      return AppError(res, "Discount exceeds price", 400, null, req.files);
    }

    if (localThumbnailPath) {
      newThumbnail = await uploadImage(localThumbnailPath);
    }

    if (localPromoVideoPath) {
      newPromoVideo = await uploadVideo(localPromoVideoPath);
    }
    if (newThumbnail && course.thumbnail?.publicId) {
      await deleteImage(course.thumbnail.publicId);
    }
    if (newPromoVideo && course.promoVideo?.publicId) {
      await deleteVideo(course.promoVideo.publicId);
    }

    course.title = title;
    course.subtitle = subtitle;
    course.description = description;
    course.whatYouWillLearn = whatYouWillLearn;
    course.requirements = requirements;
    course.category = category;
    course.price = isFree ? 0 : price;
    course.discountPrice = isFree ? 0 : discountPrice;
    course.currency = isFree ? "INR" : currency;
    course.isFree = isFree;
    course.status = status || course.status;

    if (newThumbnail) course.thumbnail = newThumbnail;
    if (newPromoVideo) course.promoVideo = newPromoVideo;

    await course.save();

    return ApiResponse(res, {
      statusCode: 200,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    if (newThumbnail?.publicId) await deleteImage(newThumbnail.publicId);
    if (newPromoVideo?.publicId) await deleteVideo(newPromoVideo.publicId);

    return AppError(res, error.message, 500, error, req.files);
  }
};

// getCourseById
const getCourseById = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    if (!courseId || !new mongoose.Types.ObjectId.isValid(courseId)) {
      return AppError(res, "Invalid Course ID", 400);
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const course = await Course.aggregate([
      {
        $match: {
          _id: courseObjectId,
          isArchived: { $ne: true },
        },
      },
      {
        $lookup: {
          from: "instructors",
          localField: "instructor",
          foreignField: "_id",
          as: "instructor",
        },
      },
      { $unwind: { path: "$instructor", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "instructor.user",
          foreignField: "_id",
          as: "instructorUser",
        },
      },
      {
        $unwind: { path: "$instructorUser", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "course",
          as: "reviews",
        },
      },
      {
        $addFields: {
          reviewCount: { $size: "$reviews" },
          averageRating: {
            $ifNull: [{ $avg: "$reviews.rating" }, 0],
          },
        },
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
              avatar: "$instructorUser.avatar",
            },
          },
        },
      },
    ]);

    return ApiResponse(res, {
      statusCode: 200,
      message: "Course Data fetched",
      data: course,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};
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
        { description: { $regex: searchText, $options: "i" } },
      ];
    }
    query.status = "published";

    const courseStats = await Course.aggregate([
      { $match: query },

      /* ---------------- LOOKUPS ---------------- */

      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "course",
          as: "enrollments",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "course",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "instructors",
          localField: "instructor",
          foreignField: "_id",
          as: "instructorData",
        },
      },
      {
        $unwind: {
          path: "$instructorData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "instructorData.user",
          foreignField: "_id",
          as: "instructorUser",
        },
      },
      {
        $unwind: {
          path: "$instructorUser",
          preserveNullAndEmptyArrays: true,
        },
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
                cond: { $eq: ["$$e.isCompleted", true] },
              },
            },
          },

          approvedReviews: {
            $filter: {
              input: "$reviews",
              as: "r",
              cond: { $eq: ["$$r.isApproved", true] },
            },
          },
        },
      },
      {
        $addFields: {
          averageRating: {
            $ifNull: [{ $avg: "$approvedReviews.rating" }, 0],
          },
          completionRate: {
            $cond: {
              if: { $gt: ["$enrollmentCount", 0] },
              then: {
                $multiply: [
                  { $divide: ["$completedEnrollments", "$enrollmentCount"] },
                  100,
                ],
              },
              else: 0,
            },
          },
        },
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
              avatar: "$instructorUser.avatar",
            },
          },
        },
      },

      /* ---------------- SORT + PAGINATION ---------------- */

      { $sort: { enrollmentCount: -1 } },

      {
        $facet: {
          data: [{ $skip: (pageNum - 1) * limitNum }, { $limit: limitNum }],
          meta: [{ $count: "total" }],
        },
      },
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
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};
//get Course By instructor
const getCoursesByInstructor = async (req, res, next) => {
  try {
    const { pageNum = 1, limitNum = 10 } = req.query;
    const { instructorId } = req.params;
    const courses = await Course.aggregate([
      {
        $match: {
          instructor: new mongoose.Types.ObjectId(instructorId),
          status: "published",
        },
      },

      /* ---------------- LOOKUPS ---------------- */

      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "course",
          as: "enrollments",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "course",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "instructors",
          localField: "instructor",
          foreignField: "_id",
          as: "instructorData",
        },
      },
      {
        $unwind: {
          path: "$instructorData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "instructorData.user",
          foreignField: "_id",
          as: "instructorUser",
        },
      },
      {
        $unwind: {
          path: "$instructorUser",
          preserveNullAndEmptyArrays: true,
        },
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
                cond: { $eq: ["$$e.isCompleted", true] },
              },
            },
          },

          approvedReviews: {
            $filter: {
              input: "$reviews",
              as: "r",
              cond: { $eq: ["$$r.isApproved", true] },
            },
          },
        },
      },
      {
        $addFields: {
          averageRating: {
            $ifNull: [{ $avg: "$approvedReviews.rating" }, 0],
          },
          completionRate: {
            $cond: {
              if: { $gt: ["$enrollmentCount", 0] },
              then: {
                $multiply: [
                  { $divide: ["$completedEnrollments", "$enrollmentCount"] },
                  100,
                ],
              },
              else: 0,
            },
          },
        },
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
              avatar: "$instructorUser.avatar",
            },
          },
        },
      },

      /* ---------------- SORT + PAGINATION ---------------- */

      { $sort: { enrollmentCount: -1 } },

      {
        $facet: {
          data: [{ $skip: (pageNum - 1) * limitNum }, { $limit: limitNum }],
          meta: [{ $count: "total" }],
        },
      },
    ]);
    return ApiResponse(res, {
      statusCode: 200,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};
// publishCourse
const publishCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { status: "published", publishedAt: new Date() },
      { new: true }
    );
    if (!course) {
      return AppError(res, "Course not found", 404);
    }
    return ApiResponse(res, {
      statusCode: 200,
      message: "Course published successfully",
      data: course,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};
// getFeaturedCourses
const getFeaturedCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({
      isFeatured: true,
      isArchived: { $ne: true },
    }).limit(10);
    return ApiResponse(res, {
      statusCode: 200,
      message: "Featured courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};

//delete course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.user;
    const { courseId } = req.params;

    if (!id) {
      return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 401);
    }

    if (!courseId) {
      return AppError(res, "Course ID is required", 400);
    }
    const instructor = await Instructor.findOne({ user: id });
    if (!instructor) {
      return AppError(res, "Instructor does not exist", 404);
    }
    const course = await Course.findOne({
      _id: courseId,
      instructor: instructor._id,
    });

    if (!course) {
      return AppError(res, "Course not found", 404);
    }
    const enrollmentsCount = await Enrollment.countDocuments({
      course: course._id,
    });

    if (enrollmentsCount > 0) {
      return AppError(
        res,
        "Course cannot be deleted because it has enrollments",
        409
      );
    }
    const sectionsCount = await Section.countDocuments({
      course: course._id,
    });

    if (sectionsCount > 0) {
      return AppError(
        res,
        "Course cannot be deleted because it has sections",
        409
      );
    }
    if (course.thumbnail?.publicId) {
      await deleteImage(course.thumbnail.publicId);
    }

    if (course.promoVideo?.publicId) {
      await deleteVideo(course.promoVideo.publicId);
    }
    await Course.findByIdAndDelete(course._id);

    return ApiResponse(res, {
      statusCode: 200,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500, error);
  }
};

//update pricing
const updatePricing = async (req, res, next) => {
  try {
    //Validate user || Authenticate and verify instructor role
    const { id } = req.user;
    if (!id) {
      return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 404);
    }
    const instructor = await Instructor.find({
      user: new mongoose.Types.ObjectId(id),
    });
    if (!instructor) {
      return AppError(res, "Instructor doesnot exist", 404);
    }
    //Validate courseId parameter
    const { courseId } = req.params;
    if (!courseId) {
      return AppError(res, ERROR_MESSAGES.REQUIRED_FIELD, 404);
    }
    //  Fetch course and verify ownership
    const course = await Course.find({
      _id: new mongoose.Types.ObjectId(courseId),
      instructor: instructor._id,
    });
    if (!course) {
      return AppError(res, "Course did'nt exist", 404);
    }
    // Validate pricing data(price, discountPrice, currency, isFree)
    let { price, discountPrice, currency = "INR", isFree } = req.body;
    if (isBlank(price) || isBlank(discountPrice) || isBlank(isFree)) {
      return AppError(res, "Missing Required Field", 404);
    }
    // If isFree is true, ensure price and discountPrice are 0 or null
    if (isNaN(price) || isNaN(discountPrice)) {
      return AppError(res, "Invalid pricing or discount pricing", 404);
    }
    if (isFree === true && (price > 0 || discountPrice > 0)) {
      req.body.price = 0;
      req.body.discountPrice = 0;
      req.body.currency = "INR";
    }
    // If paid, validate price  0 and currency is valid
    if (isFree !== true && (isNaN(price) || price < 0)) {
      return AppError(res, "Invalid pricing", 404);
    }
    //Validate discountPrice < price if provided
    if (isFree !== true && price < discountPrice) {
      return AppError(res, "Invalid discount pricing", 404);
    }
    // Update pricing fields
    course.price = price;
    course.discountPrice = discountPrice;
    course.isFree = isFree;
    // Save course
    await course.save();
    // Return updated pricing data
    return ApiResponse(res, {
      statusCode: 200,
      message: "Course updated Successfully",
      data: course,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};

// Archive/Unarchive Course
const archiveCourse = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 404);
    }
    const instructor = await Instructor.find({
      user: new mongoose.Types.ObjectId(id),
    });
    if (!instructor) {
      return AppError(res, "Instructor doesnot exist", 404);
    }
    //Validate courseId parameter
    const { courseId } = req.params;
    if (!courseId) {
      return AppError(res, ERROR_MESSAGES.REQUIRED_FIELD, 404);
    }
    //  Fetch course and verify ownership
    const course = await Course.find({
      _id: new mongoose.Types.ObjectId(courseId),
      instructor: instructor._id,
    });
    if (!course) {
      return AppError(res, "Course did'nt exist", 404);
    }
    // Check current archive status
    const isCurrentlyArchived = course.isArchived;
    if (!isCurrentlyArchived) {
      //  Set archivedAt date if archiving, null if unarchiving
      course.status = "published";
      course.isArchived = false;
      course.archivedAt = null;
    } else {
      // If archiving, unpublish course(set status to 'draft')
      course.status = "draft";
      course.isArchived = true;
      course.archivedAt = new Date();
    }
    // Save course
    await course.save();
    //  Return updated archive status
    return ApiResponse(res, {
      statusCode: 200,
      message: isCurrentlyArchived
        ? "Course unarchived successfully"
        : "Course archived successfully",
      data: course,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};

// generate certficate
const generateCertificate = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { courseId } = req.params;
    if (!id) {
      return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 404);
    }
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!user) {
      return AppError(res, "User doesnot exist", 404);
    }
    if (!courseId) {
      return AppError(res, ERROR_MESSAGES.REQUIRED_FIELD, 404);
    }
    //  Fetch course and verify ownership
    const course = await Course.findOne({
      _id: new mongoose.Types.ObjectId(courseId),
      status: "published",
    });
    if (!course) {
      return AppError(res, "Course did'nt exist", 404);
    }
    // verify if user is enrolled in the course
    const enrollment = await Enrollment.findOne({
      user: user._id,
      course: course._id,
    });
    if (!enrollment) {
      return AppError(res, "User did'nt enroll in the course", 404);
    }
    // Check the progress of the user in the course
    const progress = await Progress.findOne({
      user: user._id,
      course: course._id,
    });
    // Check if user has completed the course
    if (!progress.isCompleted) {
      return AppError(res, "User did'nt complete the course", 404);
    }
    // Generate certificate
    const certificateId = uuidv4();
    // Generate certificate PDF
    const pdfPath = await generateCertificatePDF({
      studentName: user.name,
      courseTitle: course.title,
      certificateId,
    });
    // Upload PDF to cloud storage
    const { publicId, secureUrl } = await uploadAttachment(pdfPath);

    const certificate = await Certificate.create({
      user: user._id,
      course: course._id,
      issueDate: new Date(),
      certificateId,
      publicId,
      secureUrl,
    });
    // Return certificate
    return ApiResponse(res, {
      statusCode: 200,
      message: "Certificate generated successfully",
      data: certificate,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};

// verify certificate
const verifyCertificate = async (req, res, next) => {
  try {
    const { certificateId } = req.params;
    if (!certificateId) {
      return AppError(res, ERROR_MESSAGES.REQUIRED_FIELD, 404);
    }
    //  Fetch certificate and verify ownership
    const certificate = await Certificate.findOne({
      certificateId,
    });
    if (!certificate) {
      return AppError(res, "Certificate did'nt exist", 404);
    }
    // Return certificate
    return ApiResponse(res, {
      statusCode: 200,
      message: "Certificate verified successfully",
      data: certificate,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};

const getCoursesByStudent = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      return AppError(res, ERROR_MESSAGES.UNAUTHORIZED, 404);
    }
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!user) {
      return AppError(res, "User doesnot exist", 404);
    }
    //  Fetch courses and verify ownership
    const courses = await Course.find({
      status: "published",
    });
    if (!courses) {
      return AppError(res, "Courses did'nt exist", 404);
    }
    // Return courses
    return ApiResponse(res, {
      statusCode: 200,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};
export {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
  getCoursesByInstructor,
  getFeaturedCourses,
  publishCourse,
  updatePricing,
  archiveCourse,
  generateCertificate,
  verifyCertificate,
  getCoursesByStudent,
};
