import mongoose from "mongoose";
import AppError from "../utils/user.error.js";
import { Course, Section, Enrollment, Lecture } from "../models/course.model.js";
import { Instructor } from "../models/user.model.js";
import { isBlank } from "../utils/validate.js";
import ApiResponse from "../utils/apiResponse.js";


export const incrementSectionCount = async (courseId, value = 1) => {
  await Course.findByIdAndUpdate(
    courseId,
    { $inc: { totalSections: value } },
    { new: true }
  );
};

export const createSection = async (req, res) => {
  try {
    const { id } = req.user;
    const { courseId } = req.params;
    const { title, description, order } = req.body;

    if (!title) {
      return AppError(res, "Section title is required", 400);
    }

    const instructor = await Instructor.findOne({ user: id });
    if (!instructor) {
      return AppError(res, "Instructor not found", 403);
    }

    const course = await Course.findOne({
      _id: courseId,
      instructor: instructor._id
    });

    if (!course) {
      return AppError(res, "Course not found or unauthorized", 404);
    }

    const lastSection = await Section.findOne({ course: courseId })
      .sort({ order: -1 });

    const nextOrder = order ?? (lastSection ? lastSection.order + 1 : 1);

    const section = await Section.create({
      course: courseId,
      title,
      description,
      order: nextOrder,
      totalLectures: 0,
      totalDuration: 0,
      isFreePreview: false
    });


    await incrementSectionCount(courseId, 1);

    return ApiResponse(res, {
      statusCode: 201,
      message: "Section created successfully",
      data: section
    });

  } catch (error) {
    return AppError(res, error.message, 500);
  }
};
export const deleteSection = async (req, res) => {
  try {
    const { id } = req.user;
    const { sectionId } = req.params;

    const instructor = await Instructor.findOne({ user: id });
    if (!instructor) {
      return AppError(res, "Instructor not found", 403);
    }

    const section = await Section.findById(sectionId).populate("course");
    if (!section) {
      return AppError(res, "Section not found", 404);
    }

    if (String(section.course.instructor) !== String(instructor._id)) {
      return AppError(res, "Unauthorized", 403);
    }

    const lectureCount = await Lecture.countDocuments({ section: sectionId });
    if (lectureCount > 0) {
      return AppError(res, "Section contains lectures", 400);
    }

    await Section.findByIdAndDelete(sectionId);

    await incrementSectionCount(section.course._id, -1);

    const sections = await Section.find({ course: section.course._id })
      .sort({ order: 1 });

    for (let i = 0; i < sections.length; i++) {
      sections[i].order = i + 1;
      await sections[i].save();
    }

    return ApiResponse(res, {
      statusCode: 200,
      message: "Section deleted successfully"
    });

  } catch (error) {
    return AppError(res, error.message, 500);
  }
};

export const updateSection = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { sectionId } = req.params;


    if (!userId) {
      return AppError(res, "Unauthorized", 401);
    }

    const instructor = await Instructor.findOne({ user: userId });
    if (!instructor) {
      return AppError(res, "Instructor not found", 403);
    }

    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return AppError(res, "Invalid section id", 400);
    }

    const section = await Section.findById(sectionId).populate("course");
    if (!section) {
      return AppError(res, "Section not found", 404);
    }

    if (section.course.instructor.toString() !== instructor._id.toString()) {
      return AppError(res, "Not authorized to update this section", 403);
    }

    const { title, description, isFreePreview } = req.body;

    if (title !== undefined && isBlank(title)) {
      return AppError(res, "Section title cannot be blank", 400);
    }

    if (
      isFreePreview !== undefined &&
      typeof isFreePreview !== "boolean"
    ) {
      return AppError(res, "isFreePreview must be boolean", 400);
    }

    if (title !== undefined) section.title = title;
    if (description !== undefined) section.description = description;
    if (isFreePreview !== undefined) section.isFreePreview = isFreePreview;

    await section.save();

    return ApiResponse(res, {
      statusCode: 200,
      message: "Section updated successfully",
      data: section
    });

  } catch (error) {
    console.log(error);
    return AppError(res, error.message, 500);
  }
};

export const reorderSections = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { courseId } = req.params;
    const { sections } = req.body;

    // Authenticate & verify instructor
    if (!userId) {
      return AppError(res, "Unauthorized", 401);
    }

    const instructor = await Instructor.findOne({ user: userId });
    if (!instructor) {
      return AppError(res, "Instructor not found", 403);
    }

    // Validate courseId & payload
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return AppError(res, "Invalid course id", 400);
    }

    if (!Array.isArray(sections) || sections.length === 0) {
      return AppError(res, "Sections order array is required", 400);
    }

    // Validate all section IDs
    for (const sectionId of sections) {
      if (!mongoose.Types.ObjectId.isValid(sectionId)) {
        return AppError(res, `Invalid section id: ${sectionId}`, 400);
      }
    }

    // Fetch course & verify ownership
    const course = await Course.findOne({
      _id: courseId,
      instructor: instructor._id
    });

    if (!course) {
      return AppError(res, "Course not found or unauthorized", 404);
    }

    //Validate all sections belong to this course
    const courseSections = await Section.find({ course: courseId });

    if (courseSections.length !== sections.length) {
      return AppError(
        res,
        "Section list does not match course sections",
        400
      );
    }

    const courseSectionIds = courseSections.map(s =>
      s._id.toString()
    );

    for (const sectionId of sections) {
      if (!courseSectionIds.includes(sectionId)) {
        return AppError(
          res,
          "One or more sections do not belong to this course",
          403
        );
      }
    }

    // Update order field
    const bulkOps = sections.map((sectionId, index) => ({
      updateOne: {
        filter: { _id: sectionId },
        update: { order: index + 1 }
      }
    }));

    // Save all sections
    await Section.bulkWrite(bulkOps);

    // Return updated order
    const updatedSections = await Section.find({ course: courseId })
      .sort({ order: 1 })
      .select("_id title order");

    return ApiResponse(res, {
      statusCode: 200,
      message: "Sections reordered successfully",
      data: updatedSections
    });

  } catch (error) {
    return AppError(res, error.message, 500);
  }
};
export const getCourseSections = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return AppError(res, "Invalid course id", 400);
    }

    const course = await Course.findById(courseId).select(
      "_id status instructor isFree"
    );

    if (!course) {
      return AppError(res, "Course not found", 404);
    }

    let isEnrolled = false;

    let sections = await Section.find({ course: courseId })
      .sort({ order: 1 })
      .lean();



    const sectionIds = sections.map(s => s._id);

    const lectureCounts = await Lecture.aggregate([
      { $match: { section: { $in: sectionIds } } },
      { $group: { _id: "$section", count: { $sum: 1 } } }
    ]);

    const lectureCountMap = {};
    lectureCounts.forEach(lc => {
      lectureCountMap[lc._id.toString()] = lc.count;
    });

    sections = sections.map(section => ({
      ...section,
      totalLectures: lectureCountMap[section._id.toString()] || 0
    }));

    return ApiResponse(res, {
      statusCode: 200,
      message: "Course sections fetched successfully",
      data: {
        courseId,
        isEnrolled,
        totalSections: sections.length,
        sections
      }
    });

  } catch (error) {
    return AppError(res, error.message, 500);
  }
};
