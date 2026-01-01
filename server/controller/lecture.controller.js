import mongoose from "mongoose";
import Lecture from "../models/lecture.model.js";
import Section from "../models/section.model.js";
import Course from "../models/course.model.js";
import Instructor from "../models/instructor.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/user.error.js";
import { uploadVideo } from "../services/s3.js";

export const createLecture = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { sectionId } = req.params;

    if (!userId) {
      return AppError(res, "Unauthorized", 401);
    }
    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return AppError(res, "Invalid section ID", 400);
    }

    const section = await Section.findById(sectionId).populate("course");
    if (!section) {
      return AppError(res, "Section not found", 404);
    }

    const course = section.course;
    if (!course) {
      return AppError(res, "Course not found", 404);
    }

    const instructor = await Instructor.findOne({
      user: userId,
      _id: course.instructor,
    });

    if (!instructor) {
      return AppError(res, "Not authorized to add lecture", 403);
    }

    const {
      title,
      description,
      isPreview = false,
      isDownloadable = false,
    } = req.body;

    if (!title || !description) {
      return AppError(
        res,
        "Title and description are required",
        400
      );
    }

    const lastLecture = await Lecture.findOne({ section: sectionId })
      .sort({ order: -1 })
      .select("order");

    const nextOrder = lastLecture ? lastLecture.order + 1 : 1;
    const lecture = await Lecture.create({
      section: sectionId,
      title,
      description,
      isPreview,
      isDownloadable,
      order: nextOrder,
    });

    section.totalLectures = (section.totalLectures || 0) + 1;
    await section.save();

    course.totalLectures = (course.totalLectures || 0) + 1;
    await course.save();

    return ApiResponse(res, {
      statusCode: 201,
      message: "Lecture created successfully",
      data: lecture,
    });

  } catch (error) {
    return AppError(res, error.message, 500);
  }
};


export const getSectionLectures = async (req, res) => {
  try {
    const { sectionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return AppError(res, "Invalid section ID", 400);
    }

    const section = await Section.findById(sectionId)
      .populate("course", "_id status");

    if (!section) {
      return AppError(res, "Section not found", 404);
    }

    const lectureQuery = {
      section: sectionId
    };


    const lectures = await Lecture.find(lectureQuery)
      .sort({ order: 1 })
      .select(
        "title description videoUrl duration isPreview isDownloadable order createdAt"
      );

    return ApiResponse(res, {
      statusCode: 200,
      message: "Section lectures fetched successfully",
      data: {
        section: {
          _id: section._id,
          title: section.title,
          totalLectures: section.totalLectures,
          totalDuration: section.totalDuration,
          isFreePreview: section.isFreePreview
        },
        isEnrolled,
        lectures
      }
    });

  } catch (error) {
    return AppError(res, "Failed to fetch section lectures", 500);
  }
};
export const updateLecture = async (req, res) => {
  try {
    const userId = req.user?.id;

    const { lectureId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(lectureId)) {
      return AppError(res, "Invalid lecture ID", 400);
    }

    const lecture = await Lecture.findById(lectureId)
      .populate({
        path: "section",
        populate: {
          path: "course",
          select: "_id instructor totalDuration totalLectures"
        }
      });

    if (!lecture) {
      return AppError(res, "Lecture not found", 404);
    }

    const section = lecture.section;
    const course = section.course;

    const instructor = await Instructor.findOne({
      user: userId,
      _id: course.instructor
    });

    if (!instructor) {
      return AppError(res, "Unauthorized access", 403);
    }

    const {
      title,
      description,
      videoUrl,
      videoProvider,
      duration,
      isPreview,
      isDownloadable
    } = req.body;

    if (title !== undefined && !title.trim()) {
      return AppError(res, "Lecture title cannot be empty", 400);
    }

    if (duration !== undefined && Number(duration) <= 0) {
      return AppError(res, "Duration must be greater than 0", 400);
    }

    const allowedProviders = ["youtube", "vimeo", "s3"];
    if (
      videoProvider !== undefined &&
      !allowedProviders.includes(videoProvider)
    ) {
      return AppError(res, "Invalid video provider", 400);
    }
    const oldDuration = lecture.duration || 0;
    const newDuration =
      duration !== undefined ? Number(duration) : oldDuration;

    const durationDiff = newDuration - oldDuration;
    if (title !== undefined) lecture.title = title;
    if (description !== undefined) lecture.description = description;
    if (videoUrl !== undefined) lecture.videoUrl = videoUrl;
    if (videoProvider !== undefined) lecture.videoProvider = videoProvider;
    if (duration !== undefined) lecture.duration = newDuration;
    if (isPreview !== undefined) lecture.isPreview = isPreview;
    if (isDownloadable !== undefined)
      lecture.isDownloadable = isDownloadable;

    await lecture.save();
    if (durationDiff !== 0) {
      section.totalDuration =
        (section.totalDuration || 0) + durationDiff;

      course.totalDuration =
        (course.totalDuration || 0) + durationDiff;

      await section.save();
      await course.save();
    }

    return ApiResponse(res, {
      statusCode: 200,
      message: "Lecture updated successfully",
      data: lecture
    });

  } catch (error) {
    return AppError(res, "Failed to update lecture", 500);
  }
};


export const deleteLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(lectureId)) {
      return AppError(res, "Invalid lecture ID", 400);
    }

    const instructor = await Instructor.findOne({ user: userId });
    if (!instructor) {
      return AppError(res, "Instructor not found", 403);
    }

    const lecture = await Lecture.findById(lectureId)
      .populate({
        path: "section",
        populate: {
          path: "course",
          select: "_id instructor totalLectures totalDuration"
        }
      });

    if (!lecture) {
      return AppError(res, "Lecture not found", 404);
    }

    const section = lecture.section;
    const course = section.course;

    if (course.instructor.toString() !== instructor._id.toString()) {
      return AppError(res, "Unauthorized access", 403);
    }

    const lectureDuration = lecture.duration || 0;
    await Lecture.findByIdAndDelete(lectureId);

    section.totalLectures = Math.max(0, section.totalLectures - 1);
    section.totalDuration = Math.max(
      0,
      section.totalDuration - lectureDuration
    );
    await section.save();
    course.totalLectures = Math.max(0, course.totalLectures - 1);
    course.totalDuration = Math.max(
      0,
      course.totalDuration - lectureDuration
    );
    await course.save();
    const remainingLectures = await Lecture.find({ section: section._id })
      .sort({ order: 1 });

    for (let i = 0; i < remainingLectures.length; i++) {
      remainingLectures[i].order = i + 1;
      await remainingLectures[i].save();
    }

    return ApiResponse(res, {
      statusCode: 200,
      message: "Lecture deleted successfully",
    });

  } catch (error) {
    return AppError(res, "Failed to delete lecture", 500);
  }
};


export const uploadLectureVideo = async (req, res) => {
  let uploadedVideo = null;

  try {
    const { lectureId } = req.params;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(lectureId)) {
      return AppError(res, "Invalid lecture ID", 400);
    }

    const instructor = await Instructor.findOne({ user: userId });
    if (!instructor) {
      return AppError(res, "Instructor not found", 403);
    }


    const lecture = await Lecture.findById(lectureId).populate({
      path: "section",
      populate: {
        path: "course",
        select: "_id instructor totalDuration totalLectures"
      }
    });

    if (!lecture) {
      return AppError(res, "Lecture not found", 404);
    }

    const section = lecture.section;
    const course = section.course;

    if (course.instructor.toString() !== instructor._id.toString()) {
      return AppError(res, "Unauthorized access", 403);
    }

    if (!req.file) {
      return AppError(res, "No video file uploaded", 400);
    }
    if(req.file){
        try {
          const {publicId, secureUrl} = await uploadVideo(req.file.path);
          uploadedVideo = { publicId, secureUrl };
        } catch (error) {
          return AppError(res, "Failed to upload video to storage", 500,req.file);
        }
    }

    const newDuration = Number(req.body.duration);
    if (!newDuration || newDuration <= 0) {
      await deleteVideo(uploadedVideo.publicId);
      return AppError(res, "Invalid video duration", 400);
    }

    const oldDuration = lecture.duration || 0;
    const durationDiff = newDuration - oldDuration;

    section.totalDuration += durationDiff;
    course.totalDuration += durationDiff;

    lecture.videoUrl = uploadedVideo.secureUrl;
    lecture.videoProvider = "s3";
    lecture.duration = newDuration;

    await lecture.save();
    await section.save();
    await course.save();

    return ApiResponse(res, {
      statusCode: 200,
      message: "Lecture video uploaded successfully",
      data: {
        videoUrl: lecture.videoUrl,
        duration: lecture.duration,
        provider: lecture.videoProvider,
      },
    });

  } catch (error) {
    console.error(error);

    if (uploadedVideo?.publicId) {
      await deleteVideo(uploadedVideo.publicId);
    }

    if (req.file?.path) {
      fs.existsSync(req.file.path) && fs.rmSync(req.file.path);
    }

    return AppError(res, "Video upload failed", 500);
  }
};