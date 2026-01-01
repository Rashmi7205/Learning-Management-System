import {Router} from 'express';
import {getCourses, getCourseById, createCourse, updateCourse, deleteCourse, getFeaturedCourses, getCoursesByInstructor, publishCourse, updatePricing, archiveCourse} from '../controller/course.controller.js';
import isLoggedIn, { isAdmin, isAdminOrInstructor, isInstructor } from '../middlewares/auth.user.js';
import upload from '../middlewares/multer.middleware.js';

const courseRouter = Router();
// createCourse
courseRouter.post("/", isLoggedIn, isInstructor,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "promoVideo", maxCount: 1 },
  ]
  ),
  createCourse);
//   getCourses
courseRouter.get("/",isLoggedIn,getCourses);
//   updateCourse,
courseRouter.put("/:courseId", isLoggedIn, isAdminOrInstructor, upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "promoVideo", maxCount: 1 },
]
) ,updateCourse);
//   deleteCourse,
courseRouter.delete("/:courseId", isLoggedIn, isAdminOrInstructor, deleteCourse);
//   getFeaturedCourses,
courseRouter.get("/featured",getFeaturedCourses);
//   getCoursesByInstructor,
courseRouter.get("/instructor/:instructorId",isLoggedIn,getCoursesByInstructor);
//   publishCourse,
courseRouter.put("/publish/:courseId", isLoggedIn, isInstructor,publishCourse);
//   updatePricing
courseRouter.put("/pricing/:courseId", isLoggedIn, isInstructor, updatePricing);
// archive course
courseRouter.put("/:courseId/archive", isLoggedIn, isInstructor, archiveCourse);
//   getCourseById
courseRouter.get("/:courseId",isLoggedIn,getCourseById);
export default courseRouter;