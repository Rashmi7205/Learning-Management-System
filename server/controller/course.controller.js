import mongoose from "mongoose";
import {
  Course,
  Enrollment,
  Lecture,
  Section,
  Certificate,
  Progress,
} from "../models/course.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/user.error.js";
import { isBlank } from "../utils/validate.js";
import { ERROR_MESSAGES } from "../constants/index.js";
import ApiResponse from "../utils/apiResponse.js";
import { Instructor } from "../models/user.model.js";
import {
  deleteImage,
  deleteVideo,
  uploadImage,
  uploadVideo,
} from "../services/s3.js";
import generateCertificateHTMLPomise from "../utils/certificate.js";
import { v4 as uuidv4 } from "uuid";
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
        req.files,
      );

    if (!Array.isArray(category) || !category.length) {
      return AppError(res, "At least one category required", 400, req.files);
    }
    if (!Array.isArray(whatYouWillLearn) || !whatYouWillLearn.length) {
      return AppError(
        res,
        "At least one learning outcome required",
        400,
        req.files,
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
        req.files,
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
const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
      if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
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
        { $unwind: "$instructor" },
        {
          $lookup: {
            from: "users",
            localField: "instructor.user",
            foreignField: "_id",
            as: "instructorUser",
          },
        },
        { $unwind: "$instructorUser" },
        {
          $lookup: {
            from: "sections",
            localField: "_id",
            foreignField: "course",
            as: "sections",
            pipeline: [
              {
                $lookup: {
                  from: "lectures",
                  localField: "_id",
                  foreignField: "section",
                  as: "lectures",
                  let: { sectionIsFreePreview: "$isFreePreview" },
                  pipeline: [
                    {
                      $sort: { order: 1 },
                    },
                    {
                      $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        duration: 1,
                        order: 1,
                        isDownloadable: 1,
                        attachments: 1,
                        // Show isPreview based on both lecture.isPreview AND section.isFreePreview
                        isPreview: {
                          $and: ["$isPreview", "$$sectionIsFreePreview"],
                        },
                        videoUrl: {
                          $cond: {
                            if: {
                              $and: ["$isPreview", "$$sectionIsFreePreview"],
                            },
                            then: "$videoUrl",
                            else: "$$REMOVE",
                          },
                        },
                        videoProvider: {
                          $cond: {
                            if: {
                              $and: ["$isPreview", "$$sectionIsFreePreview"],
                            },
                            then: "$videoProvider",
                            else: "$$REMOVE",
                          },
                        },
                      },
                    },
                  ],
                },
              },
              {
                $addFields: {
                  totalLectures: { $size: "$lectures" },
                  totalDuration: { $sum: "$lectures.duration" },
                },
              },
              {
                $sort: { order: 1 },
              },
              {
                $project: {
                  _id: 1,
                  title: 1,
                  description: 1,
                  order: 1,
                  isFreePreview: 1,
                  totalLectures: 1,
                  totalDuration: 1,
                  lectures: 1,
                },
              },
            ],
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
          $addFields: {
            reviewCount: { $size: "$reviews" },
            averageRating: {
              $ifNull: [{ $avg: "$reviews.rating" }, 0],
            },
            totalSections: { $size: "$sections" },
            totalLectures: {
              $sum: "$sections.totalLectures",
            },
            totalDuration: {
              $sum: "$sections.totalDuration",
            },
          },
        },
        {
          $project: {
            title: 1,
            subtitle: 1,
            description: 1,
            whatYouWillLearn: 1,
            requirements: 1,
            slug: 1,
            category: 1,

            thumbnail: 1,
            promoVideo: 1,

            price: 1,
            discountPrice: 1,
            currency: 1,
            isFree: 1,

            status: 1,
            isFeatured: 1,
            bestseller: 1,
            publishedAt: 1,
            createdAt: 1,

            totalSections: 1,
            totalLectures: 1,
            totalDuration: 1,

            reviewCount: 1,
            averageRating: 1,

            instructor: {
              _id: "$instructor._id",
              title: "$instructor.title",
              expertise: "$instructor.expertise",
              rating: "$instructor.rating",
              totalStudents: "$instructor.totalStudents",
              totalCourses: "$instructor.totalCourses",
              totalReviews: "$instructor.totalReviews",
              isFeatured: "$instructor.isFeatured",
              bio: "$instructor.bio",
              website: "$instructor.website",
              linkedin: "$instructor.linkedin",
              twitter: "$instructor.twitter",
              youtube: "$instructor.youtube",
              user: {
                _id: "$instructorUser._id",
                firstName: "$instructorUser.firstName",
                lastName: "$instructorUser.lastName",
                avatar: "$instructorUser.avatar",
              },
            },
            sections: 1,
          },
        },
      ]);
      return ApiResponse(res, {
        statusCode: 200,
        message: "Course Data fetched",
        data: course[0],
      });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};

const getCourseAggregationStages = (query) => [
  { $match: query },
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
  { $unwind: { path: "$instructorData", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "users",
      localField: "instructorData.user",
      foreignField: "_id",
      as: "instructorUser",
    },
  },
  { $unwind: { path: "$instructorUser", preserveNullAndEmptyArrays: true } },
  {
    $addFields: {
      enrollmentCount: { $size: "$enrollments" },
      reviewCount: {
        $size: {
          $filter: {
            input: "$reviews",
            as: "r",
            cond: { $eq: ["$$r.isApproved", true] },
          },
        },
      },
      completedEnrollments: {
        $size: {
          $filter: {
            input: "$enrollments",
            as: "e",
            cond: { $eq: ["$$e.isCompleted", true] },
          },
        },
      },
      averageRating: {
        $ifNull: [
          {
            $avg: {
              $map: {
                input: {
                  $filter: {
                    input: "$reviews",
                    as: "r",
                    cond: { $eq: ["$$r.isApproved", true] },
                  },
                },
                as: "rev",
                in: "$$rev.rating",
              },
            },
          },
          0,
        ],
      },
    },
  },
  {
    $addFields: {
      completionRate: {
        $cond: [
          { $gt: ["$enrollmentCount", 0] },
          {
            $multiply: [
              { $divide: ["$completedEnrollments", "$enrollmentCount"] },
              100,
            ],
          },
          0,
        ],
      },
    },
  },
  {
    $project: {
      title: 1,
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
      totalSections: 1,
      totalLectures: 1,
      totalDuration: 1,
      instructor: {
        _id: "$instructorData._id",
        user: {
          firstName: "$instructorUser.firstName",
          lastName: "$instructorUser.lastName",
          avatar: "$instructorUser.avatar",
        },
      },
    },
  },
];
// getCourses
const getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchText, category } = req.query;
    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Number(limit), 50);

    const query = {
      status: "published",
      isArchived: { $ne: true },
    };

    if (category) {
      const categories = Array.isArray(category) ? category : [category];
      query.category = { $in: categories };
    }

    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { subtitle: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ];
    }

    const results = await Course.aggregate([
      ...getCourseAggregationStages(query),
      { $sort: { enrollmentCount: -1 } },
      {
        $facet: {
          data: [{ $skip: (pageNum - 1) * limitNum }, { $limit: limitNum }],
          meta: [{ $count: "total" }],
        },
      },
    ]);

    const courses = results[0]?.data || [];
    const total = results[0]?.meta[0]?.total || 0;

    return ApiResponse(res, {
      statusCode: 200,
      data: {
        courses,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error("getCourses Error:", error);
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
      { new: true },
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
const getFeaturedCourses = async (req, res) => {
  try {
    const limitNum = Math.min(Number(req.query.limit) || 10, 20);

    const query = {
      isFeatured: true,
      status: "published",
      isArchived: { $ne: true },
    };

    const courses = await Course.aggregate([
      { $match: query },
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
        $unwind: { path: "$instructorData", preserveNullAndEmptyArrays: true },
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
        $unwind: { path: "$instructorUser", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          enrollmentCount: { $size: "$enrollments" },
          reviewCount: {
            $size: {
              $filter: {
                input: "$reviews",
                as: "r",
                cond: { $eq: ["$$r.isApproved", true] },
              },
            },
          },
          completedEnrollments: {
            $size: {
              $filter: {
                input: "$enrollments",
                as: "e",
                cond: { $eq: ["$$e.isCompleted", true] },
              },
            },
          },
          averageRating: {
            $ifNull: [
              {
                $avg: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$reviews",
                        as: "r",
                        cond: { $eq: ["$$r.isApproved", true] },
                      },
                    },
                    as: "rev",
                    in: "$$rev.rating",
                  },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          completionRate: {
            $cond: [
              { $gt: ["$enrollmentCount", 0] },
              {
                $multiply: [
                  { $divide: ["$completedEnrollments", "$enrollmentCount"] },
                  100,
                ],
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          title: 1,
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
          totalSections: 1,
          totalLectures: 1,
          totalDuration: 1,
          instructor: {
            _id: "$instructorData._id",
            user: {
              firstName: "$instructorUser.firstName",
              lastName: "$instructorUser.lastName",
              avatar: "$instructorUser.avatar",
            },
          },
        },
      },
      { $sort: { enrollmentCount: -1 } },
      { $limit: limitNum },
    ]);

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
        409,
      );
    }
    const sectionsCount = await Section.countDocuments({
      course: course._id,
    });

    if (sectionsCount > 0) {
      return AppError(
        res,
        "Course cannot be deleted because it has sections",
        409,
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
const updatePricing = async (req, res) => {
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
const archiveCourse = async (req, res) => {
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

//get All categorylist

const getCourseCategories = async (req, res) => {
  try {
    const categories = await Course.aggregate([
      {
        $match: {
          status: "published",
          isArchived: { $ne: true },
        },
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: "$category",
          courseCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$courseCount",
        },
      },
    ]);

    return ApiResponse(res, {
      statusCode: 200,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};
const generateCertificate = async (req, res) => {
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
    // Check if user already generated the certificate
    const certificate = await Certificate.findOne({
      user: user._id,
      course: course._id,
    });
    if (certificate) {
      return ApiResponse(res, {
        statusCode: 200,
        message: "Certificate already generated",
        data: await generateCertificateHTMLPomise({
          studentName: user.name,
          courseTitle: course.title,
          certificateId: certificate.certificateId,
        }),
      });
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
    const newCertificate = new Certificate({
      user: user._id,
      course: course._id,
      certificateId,
      issuedAt: new Date(),
    });
    await newCertificate.save(); // save
    return ApiResponse(res, {
      statusCode: 200,
      message: "Certificate generated successfully",
      data: await generateCertificateHTMLPomise({
        studentName: user.name,
        courseTitle: course.title,
        certificateId,
      }),
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};
const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      status,        // 'all', 'in_progress', 'completed', 'not_started'
      page = 1,
      limit = 10,
      sort = '-enrolledAt',
      search,
    } = req.query;

    // Build enrollment query
    const enrollmentQuery = {
      user: userId,
    };

    // Get enrollments with populated course data
    const allEnrollments = await Enrollment.find(enrollmentQuery)
      .populate({
        path: "course",
        select: "title thumbnail"
      })
      .sort(sort)
      .lean();

    // Filter out null courses
    let validEnrollments = allEnrollments.filter(e => e.course !== null);

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      validEnrollments = validEnrollments.filter(e =>
        e.course.title.toLowerCase().includes(searchLower) ||
        (e.course.subtitle && e.course.subtitle.toLowerCase().includes(searchLower))
      );
    }

    // Get course IDs for progress lookup
    const courseIds = validEnrollments.map(e => e.course._id);

    // Fetch progress data for all courses in one query
    const progresses = await Progress.find({
      user: userId,
      course: { $in: courseIds }
    }).lean();

    // Map enrollments with progress data
    let enrolledData = validEnrollments.map(enrollment => {
      const progress = progresses.find(
        p => p.course.toString() === enrollment.course._id.toString()
      );

      const progressPercentage = progress?.progressPercentage || 0;
      const completedLectures = progress?.completedLectures?.length || 0;

      return {
        enrollmentId: enrollment._id,
        enrolledAt: enrollment.enrolledAt,
        course: {
          _id: enrollment.course._id,
          title: enrollment.course.title,
          subtitle: enrollment.course.subtitle,
          thumbnail: enrollment.course.thumbnail,
        },
        progress: {
          percentage: progressPercentage,
          completedLectures: completedLectures,
          totalWatchTime: progress?.totalWatchTime || 0,
          lastAccessedAt: progress?.lastAccessedAt || progress?.updatedAt,
        },
        // Calculated fields
        status: progressPercentage >= 100
          ? 'completed'
          : (progressPercentage > 0 ? 'in_progress' : 'not_started'),
      };
    });

    // Apply status filter AFTER calculating progress
    if (status === 'completed') {
      enrolledData = enrolledData.filter(e => e.status === 'completed');
    } else if (status === 'in_progress') {
      enrolledData = enrolledData.filter(e => e.status === 'in_progress');
    } else if (status === 'not_started') {
      enrolledData = enrolledData.filter(e => e.status === 'not_started');
    }

    // Calculate pagination
    const total = enrolledData.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);

    // Paginate results
    const paginatedData = enrolledData.slice(startIndex, endIndex);

    return ApiResponse(res, {
      statusCode: 200,
      message: "Enrolled courses retrieved successfully",
      data: paginatedData,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages,
        hasMore: page < pages,
      },
      stats: {
        total: total,
        completed: enrolledData.filter(e => e.status === 'completed').length,
        inProgress: enrolledData.filter(e => e.status === 'in_progress').length,
        notStarted: enrolledData.filter(e => e.status === 'not_started').length,
      }
    });

  } catch (error) {
    return AppError(res, "Failed to fetch enrolled courses", 500);
  }
};

const getCourseContent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    // Validate user ID
    if (!userId) {
      return AppError(res, "User not authenticated", 401);
    }

    // Validate course ID
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return AppError(res, "Invalid Course ID", 400);
    }

    // Check if user is enrolled in the course
    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (!enrollment) {
      return AppError(res, "You are not enrolled in this course", 403);
    }

    // Get user's progress for this course
    const progress = await Progress.findOne({
      user: userId,
      course: courseId,
    }).lean();

    // Create a Set of completed lecture IDs for fast lookup
    const completedLectureIds = new Set(
      (progress?.completedLectures || []).map((cl) =>
        (cl.lectureId || cl).toString()
      )
    );

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
      { $unwind: "$instructor" },
      {
        $lookup: {
          from: "users",
          localField: "instructor.user",
          foreignField: "_id",
          as: "instructorUser",
        },
      },
      { $unwind: "$instructorUser" },
      {
        $lookup: {
          from: "sections",
          localField: "_id",
          foreignField: "course",
          as: "sections",
          pipeline: [
            {
              $lookup: {
                from: "lectures",
                localField: "_id",
                foreignField: "section",
                as: "lectures",
                pipeline: [
                  {
                    $sort: { order: 1 },
                  },
                  {
                    $project: {
                      _id: 1,
                      title: 1,
                      description: 1,
                      duration: 1,
                      order: 1,
                      isDownloadable: 1,
                      attachments: 1,
                      isPreview: 1,
                      videoUrl: 1,
                      videoProvider: 1,
                    },
                  },
                ],
              },
            },
            {
              $addFields: {
                totalLectures: { $size: "$lectures" },
                totalDuration: { $sum: "$lectures.duration" },
              },
            },
            {
              $sort: { order: 1 },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                order: 1,
                isFreePreview: 1,
                totalLectures: 1,
                totalDuration: 1,
                lectures: 1,
              },
            },
          ],
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
        $addFields: {
          reviewCount: { $size: "$reviews" },
          averageRating: {
            $ifNull: [{ $avg: "$reviews.rating" }, 0],
          },
          totalSections: { $size: "$sections" },
          totalLectures: {
            $sum: "$sections.totalLectures",
          },
          totalDuration: {
            $sum: "$sections.totalDuration",
          },
        },
      },
      {
        $project: {
          title: 1,
          subtitle: 1,
          description: 1,
          whatYouWillLearn: 1,
          requirements: 1,
          slug: 1,
          category: 1,

          thumbnail: 1,
          promoVideo: 1,

          price: 1,
          discountPrice: 1,
          currency: 1,
          isFree: 1,

          status: 1,
          isFeatured: 1,
          bestseller: 1,
          publishedAt: 1,
          createdAt: 1,

          totalSections: 1,
          totalLectures: 1,
          totalDuration: 1,

          reviewCount: 1,
          averageRating: 1,

          instructor: {
            _id: "$instructor._id",
            title: "$instructor.title",
            expertise: "$instructor.expertise",
            rating: "$instructor.rating",
            totalStudents: "$instructor.totalStudents",
            totalCourses: "$instructor.totalCourses",
            totalReviews: "$instructor.totalReviews",
            isFeatured: "$instructor.isFeatured",
            bio: "$instructor.bio",
            website: "$instructor.website",
            linkedin: "$instructor.linkedin",
            twitter: "$instructor.twitter",
            youtube: "$instructor.youtube",
            user: {
              _id: "$instructorUser._id",
              firstName: "$instructorUser.firstName",
              lastName: "$instructorUser.lastName",
              avatar: "$instructorUser.avatar",
            },
          },
          sections: 1,
        },
      },
    ]);

    if (!course || course.length === 0) {
      return AppError(res, "Course not found", 404);
    }

    const courseData = course[0];

    // Add completion status to each lecture
    courseData.sections = courseData.sections.map((section) => {
      const lecturesWithStatus = section.lectures.map((lecture) => ({
        ...lecture,
        isCompleted: completedLectureIds.has(lecture._id.toString()),
      }));

      // Calculate section progress
      const completedCount = lecturesWithStatus.filter(
        (l) => l.isCompleted
      ).length;
      const sectionProgress =
        section.totalLectures > 0
          ? Math.round((completedCount / section.totalLectures) * 100)
          : 0;

      return {
        ...section,
        lectures: lecturesWithStatus,
        completedLectures: completedCount,
        progressPercentage: sectionProgress,
      };
    });

    // Find next lecture to watch
    let nextLecture = null;
    let nextLectureSection = null;

    for (const section of courseData.sections) {
      const incompleteLecture = section.lectures.find((l) => !l.isCompleted);
      if (incompleteLecture) {
        nextLecture = incompleteLecture;
        nextLectureSection = {
          _id: section._id,
          title: section.title,
        };
        break;
      }
    }

    // If all lectures completed, set first lecture as "next"
    if (
      !nextLecture &&
      courseData.sections.length > 0 &&
      courseData.sections[0].lectures.length > 0
    ) {
      nextLecture = courseData.sections[0].lectures[0];
      nextLectureSection = {
        _id: courseData.sections[0]._id,
        title: courseData.sections[0].title,
      };
    }

    // Calculate overall progress
    const totalLectures = courseData.totalLectures || 0;
    const completedCount = completedLectureIds.size;
    const overallProgress =
      totalLectures > 0
        ? Math.round((completedCount / totalLectures) * 100)
        : 0;

    return ApiResponse(res, {
      statusCode: 200,
      message: "Course content fetched successfully",
      data: {
        ...courseData,
        enrollment: {
          enrolledAt: enrollment.enrolledAt,
          lastAccessedAt: progress?.lastAccessedAt,
        },
        progress: {
          percentage: overallProgress,
          completedLectures: completedCount,
          totalLectures: totalLectures,
          totalWatchTime: progress?.totalWatchTime || 0,
          lastAccessedLecture: progress?.lastAccessedLecture,
        },
        nextLecture: nextLecture
          ? {
            lecture: nextLecture,
            section: nextLectureSection,
          }
          : null,
      },
    });
  } catch (error) {
    return AppError(res, ERROR_MESSAGES.OPERATION_FAILED, 500);
  }
};
const markLectureComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lectureId } = req.body;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(lectureId)) {
      return AppError(res, "Invalid Course ID or Lecture ID", 400);
    }

    // Check enrollment
    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (!enrollment) {
      return AppError(res, "You are not enrolled in this course", 403);
    }

    // Get or create progress
    let progress = await Progress.findOne({
      user: userId,
      course: courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        user: userId,
        course: courseId,
        completedLectures: [],
        progressPercentage: 0,
        totalWatchTime: 0,
      });
    }

    // Check if lecture already completed (simple ObjectId comparison)
    const alreadyCompleted = progress.completedLectures.some(
      (lectureObjectId) => lectureObjectId.toString() === lectureId.toString()
    );

    if (!alreadyCompleted) {
      // Add lecture ID to completed list (NOT an object, just the ID)
      progress.completedLectures.push(lectureId);

      // Update last accessed lecture
      progress.lastAccessedLecture = lectureId;
      progress.lastAccessedAt = new Date();

      // Get total lectures count
      const course = await Course.findById(courseId).select('totalLectures');
      const totalLectures = course?.totalLectures || 1;

      // Calculate progress percentage
      progress.progressPercentage = Math.round(
        (progress.completedLectures.length / totalLectures) * 100
      );

      await progress.save();

      return ApiResponse(res, {
        statusCode: 200,
        message: "Lecture marked as complete",
        data: {
          progressPercentage: progress.progressPercentage,
          completedLectures: progress.completedLectures.length,
          totalLectures: totalLectures,
        },
      });
    }

    return ApiResponse(res, {
      statusCode: 200,
      message: "Lecture already completed",
      data: {
        progressPercentage: progress.progressPercentage,
        completedLectures: progress.completedLectures.length,
      },
    });

  } catch (error) {
    console.error("Mark lecture complete error:", error);
    return AppError(res, "Failed to mark lecture as complete", 500);
  }
};

// Update last accessed lecture 
const updateLastAccessed = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lectureId } = req.body;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(lectureId)) {
      return AppError(res, "Invalid Course ID or Lecture ID", 400);
    }

    // Update or create progress
    const progress = await Progress.findOneAndUpdate(
      {
        user: userId,
        course: courseId,
      },
      {
        $set: {
          lastAccessedLecture: lectureId,
          lastAccessedAt: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return ApiResponse(res, {
      statusCode: 200,
      message: "Last accessed lecture updated",
      data: {
        lastAccessedLecture: progress.lastAccessedLecture,
        lastAccessedAt: progress.lastAccessedAt,
      },
    });

  } catch (error) {
    return AppError(res, "Failed to update progress", 500);
  }
};

// update the review;
const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, title, comment } = req.body;

    // 1️⃣ Check enrollment
    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "You must be enrolled to review this course",
      });
    }

    // 2️⃣ Create review
    const review = await Review.create({
      user: userId,
      course: courseId,
      rating,
      title,
      comment,
    });

    res.status(201).json({
      message: "Review submitted for approval",
      review,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already reviewed this course",
      });
    }

    return res.status(500).json({
      message: "Failed to submit review",
    });
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
    return ApiResponse(res, {
      statusCode: 200,
      message: "Certificate verified successfully",
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
  getCourseCategories,
  generateCertificate,
  verifyCertificate,
  getEnrolledCourses,
  createReview,
  getCourseContent,
  markLectureComplete,
  updateLastAccessed
};
