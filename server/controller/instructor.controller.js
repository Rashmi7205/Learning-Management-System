import User, { Instructor } from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import AppError from "../utils/user.error.js";
import { isBlank } from "../utils/validate.js";


const createInstructorProfile = async (req, res) => {
  try {
    const { userId, title, expertise, yearsOfExperience, education, certifications, website, linkedin, twitter, youtube } = req.body;

    if (!userId) {
      return AppError(res, "User ID is required", 400);
    }
    const user = await User.findById(userId);
    if (!user) {
      return AppError(res, "User not found", 404);
    }

    const exists = await Instructor.findOne({ user: userId });
    if (exists) {
      return AppError(res, "Instructor profile already exists", 400);
    }
    if (!title || !Array.isArray(expertise) || expertise.length === 0) {
      return AppError(res, "Title and expertise are required", 400);
    }
    if (certifications && !Array.isArray(certifications)) {
      return AppError(res, "Certifications must be an array", 400);
    }
    if (yearsOfExperience !== undefined && (isNaN(yearsOfExperience) || yearsOfExperience < 0)) {
      return AppError(res, "Years of experience must be a non-negative number", 400);
    }
    if (website && isBlank(website)) {
      return AppError(res, "Website cannot be blank", 400);
    }
    if (linkedin && isBlank(linkedin)) {
      return AppError(res, "LinkedIn cannot be blank", 400);
    }
    if (twitter && isBlank(twitter)) {
      return AppError(res, "Twitter cannot be blank", 400);
    }
    if (youtube && isBlank(youtube)) {
      return AppError(res, "YouTube cannot be blank", 400);
    }

    const instructor = await Instructor.create({
      user: userId,
      title,
      expertise,
      yearsOfExperience,
      education,
      certifications,
      website,
      linkedin,
      twitter,
      youtube,
      agreementAcceptedAt: new Date(),
    });

    user.role = "instructor";
    await user.save();

    return ApiResponse(res, {
      statusCode: 201,
      message: "Instructor profile created",
      data: instructor,
    });
  } catch (err) {
    return AppError(res, "Failed to create instructor profile", 500);
  }
};

const getMyInstructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ user: req.user.id })
      .populate("user", "firstName lastName email avatar");

    if (!instructor) {
      return AppError(res, "Instructor profile not found", 404);
    }

    return ApiResponse(res, { statusCode: 200, data: instructor });
  } catch {
    return AppError(res, "Failed to fetch profile", 500);
  }
};
const updateInstructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ user: req.user.id });
    if (!instructor) {
      return AppError(res, "Instructor profile not found", 404);
    }

    const allowedFields = [
      "title",
      "expertise",
      "yearsOfExperience",
      "education",
      "certifications",
      "website",
      "linkedin",
      "twitter",
      "youtube",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        instructor[field] = req.body[field];
      }
    });

    await instructor.save();

    return ApiResponse(res, {
      statusCode: 200,
      message: "Profile updated",
      data: instructor,
    });
  } catch {
    return AppError(res, "Profile update failed", 500);
  }
};
const getPublicInstructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id)
      .populate("user", "firstName lastName avatar")
      .select("-payoutDetails -taxId -totalEarnings -pendingPayout -suspensionReason -isSuspended -isFeatured -isVerified -agreementAcceptedAt -identityVerified -suspensionReason");

    if (!instructor || instructor.isSuspended) {
      return AppError(res, "Instructor not available", 404);
    }

    return ApiResponse(res, { statusCode: 200, data: instructor });
  } catch {
    return AppError(res, "Failed to fetch instructor", 500);
  }
};
const getInstructorDashboardStats = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ user: req.user.id });
    if (!instructor) return AppError(res, "Instructor not found", 404);

    return ApiResponse(res, {
      statusCode: 200,
      data: {
        totalStudents: instructor.totalStudents,
        totalCourses: instructor.totalCourses,
        rating: instructor.rating,
        earnings: instructor.totalEarnings,
      },
    });
  } catch {
    return AppError(res, "Failed to load dashboard", 500);
  }
};
const getInstructorPerformance = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ user: req.user.id });
    if (!instructor) return AppError(res, "Instructor not found", 404);

    const avgEarningPerStudent =
      instructor.totalStudents > 0
        ? instructor.totalEarnings / instructor.totalStudents
        : 0;

    return ApiResponse(res, {
      statusCode: 200,
      data: {
        rating: instructor.rating,
        avgEarningPerStudent,
      },
    });
  } catch {
    return AppError(res, "Failed to calculate performance", 500);
  }
};
const getEarningsOverview = async (req, res) => {
  const instructor = await Instructor.findOne({ user: req.user.id });
  if (!instructor) return AppError(res, "Instructor not found", 404);

  return ApiResponse(res, {
    statusCode: 200,
    data: {
      totalEarnings: instructor.totalEarnings,
      pendingPayout: instructor.pendingPayout,
    },
  });
};
const setupPayoutMethod = async (req, res) => {
  const { payoutMethod, payoutDetails } = req.body;

  if (!payoutMethod || !payoutDetails) {
    return AppError(res, "Payout info required", 400);
  }

  const instructor = await Instructor.findOne({ user: req.user.id });
  instructor.payoutMethod = payoutMethod;
  instructor.payoutDetails = payoutDetails;

  await instructor.save();

  return ApiResponse(res, { statusCode: 200, message: "Payout method saved" });
};
const requestPayout = async (req, res) => {
  const { amount } = req.body;

  const instructor = await Instructor.findOne({ user: req.user.id });
  if (amount <= 0 || amount > instructor.pendingPayout) {
    return AppError(res, "Invalid payout amount", 400);
  }

  instructor.pendingPayout -= amount;
  await instructor.save();

  return ApiResponse(res, { statusCode: 200, message: "Payout requested" });
};
const updateTaxInfo = async (req, res) => {
  const { taxId } = req.body;
  if (!taxId) return AppError(res, "Tax ID required", 400);

  const instructor = await Instructor.findOne({ user: req.user.id });
  instructor.taxId = taxId;

  await instructor.save();

  return ApiResponse(res, { statusCode: 200, message: "Tax info updated" });
};

const getRatingsBreakdown = async (req, res) => {
  const instructor = await Instructor.findOne({ user: req.user.id });

  return ApiResponse(res, {
    statusCode: 200,
    data: {
      rating: instructor.rating,
      totalReviews: instructor.totalReviews,
    },
  });
};
const getVerificationStatus = async (req, res) => {
  const instructor = await Instructor.findOne({ user: req.user.id });

  return ApiResponse(res, {
    statusCode: 200,
    data: {
      identityVerified: instructor.identityVerified,
      agreementAccepted: !!instructor.agreementAcceptedAt,
      eligible:
        instructor.identityVerified && instructor.agreementAcceptedAt,
    },
  });
};
const getAllInstructors = async (req, res) => {
  const { page = 1, limit = 10, expertise, rating } = req.query;

  const query = { isSuspended: false };
  if (expertise) query.expertise = expertise;
  if (rating) query.rating = { $gte: Number(rating) };

  const instructors = await Instructor.find(query)
    .populate("user", "firstName lastName avatar")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ rating: -1 });

  return ApiResponse(res, { statusCode: 200, data: instructors });
};

const searchInstructors = async (req, res) => {
  const { q } = req.query;

  const instructors = await Instructor.find({
    isSuspended: false,
    $or: [
      { title: new RegExp(q, "i") },
      { expertise: new RegExp(q, "i") },
    ],
  });

  return ApiResponse(res, { statusCode: 200, data: instructors });
};

//ADmin
const adminVerifyInstructor = async (req, res) => {
  await Instructor.findByIdAndUpdate(req.params.id, {
    identityVerified: true,
  });

  return ApiResponse(res, { statusCode: 200, message: "Verified" });
};
const toggleFeaturedInstructor = async (req, res) => {
  const instructor = await Instructor.findById(req.params.id);
  instructor.isFeatured = !instructor.isFeatured;
  await instructor.save();

  return ApiResponse(res, { statusCode: 200, message: "Feature status updated" });
};

const suspendInstructor = async (req, res) => {
  const { reason } = req.body;

  await Instructor.findByIdAndUpdate(req.params.id, {
    isSuspended: true,
    suspensionReason: reason,
  });

  return ApiResponse(res, { statusCode: 200, message: "Instructor suspended" });
};

const unsuspendInstructor = async (req, res) => {
  await Instructor.findByIdAndUpdate(req.params.id, {
    isSuspended: false,
    suspensionReason: null,
  });

  return ApiResponse(res, { statusCode: 200, message: "Instructor restored" });
};

export {
  createInstructorProfile,
  getMyInstructorProfile,
  updateInstructorProfile,
  getPublicInstructorProfile,
  getInstructorDashboardStats,
  getInstructorPerformance,
  getEarningsOverview,
  setupPayoutMethod,
  requestPayout,
  updateTaxInfo,
  getRatingsBreakdown,
  getAllInstructors,
  searchInstructors,
  adminVerifyInstructor,
  toggleFeaturedInstructor,
  suspendInstructor,
  unsuspendInstructor,
  getVerificationStatus,
}
