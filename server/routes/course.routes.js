import { Router } from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getFeaturedCourses,
  getCoursesByInstructor,
  publishCourse,
  updatePricing,
  archiveCourse,
  getCourseCategories,
  createReview,
  generateCertificate,
  verifyCertificate,
  getEnrolledCourses,
  getCourseContent,
  markLectureComplete,
  updateLastAccessed,
} from "../controller/course.controller.js";
import isLoggedIn, {
  isAdmin,
  isAdminOrInstructor,
  isInstructor,
} from "../middlewares/auth.user.js";
import upload from "../middlewares/multer.middleware.js";
import { Progress } from "../models/course.model.js";

const courseRouter = Router();
// createCourse
courseRouter.post(
  "/",
  isLoggedIn,
  isInstructor,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "promoVideo", maxCount: 1 },
  ]),
  createCourse,
);
//   getCourses
courseRouter.get("/", getCourses);
//   getCourseById

//   updateCourse,
courseRouter.put(
  "/:courseId",
  isLoggedIn,
  isAdminOrInstructor,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "promoVideo", maxCount: 1 },
  ]),
  updateCourse,
);
//   deleteCourse,
courseRouter.delete(
  "/:courseId",
  isLoggedIn,
  isAdminOrInstructor,
  deleteCourse,
);
//   getFeaturedCourses,
courseRouter.get("/featured", getFeaturedCourses);
courseRouter.get("/categories", getCourseCategories);
courseRouter.get("/enrolled", isLoggedIn, getEnrolledCourses);

//   getCoursesByInstructor,
courseRouter.get(
  "/instructor/:instructorId",
  isLoggedIn,
  getCoursesByInstructor,
);
//   publishCourse,
courseRouter.put("/publish/:courseId", isLoggedIn, isInstructor, publishCourse);
//   updatePricing
courseRouter.put("/pricing/:courseId", isLoggedIn, isInstructor, updatePricing);
// archive course
courseRouter.put("/:courseId/archive", isLoggedIn, isInstructor, archiveCourse);
courseRouter.get('/:courseId/content', isLoggedIn, getCourseContent);
courseRouter.post('/lecture/complete', isLoggedIn, markLectureComplete);
courseRouter.post('/lecture/access', isLoggedIn, updateLastAccessed);
// verify certificate
courseRouter.post("/:courseId/verify", isLoggedIn, verifyCertificate);
// create review
courseRouter.post("/:courseId/review", isLoggedIn, createReview);

// generate certificate
courseRouter.post("/:courseId/certificate", isLoggedIn, generateCertificate);
//verify certificate
courseRouter.post("/:courseId/verify", isLoggedIn, verifyCertificate);
courseRouter.get("/:courseId", getCourseById);

export default courseRouter;
