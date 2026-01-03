import {Router} from "express";
import { createLecture, deleteLecture, deleteLectureAttachment, getSectionLectures, updateLecture, updateLectureVideo, uploadLectureAttachment, uploadLectureVideo } from "../controller/lecture.controller.js";
import isLoggedIn, { isInstructor } from "../middlewares/auth.user.js";
import upload from "../middlewares/multer.middleware.js";


const lectureRouter = Router({mergeParams:true});

lectureRouter.get("/:sectionId", getSectionLectures);
lectureRouter.post("/:sectionId",isLoggedIn,isInstructor, createLecture);
lectureRouter.put("/:sectionId/:lectureId", isLoggedIn, isInstructor,updateLecture);
lectureRouter.delete("/:sectionId/:lectureId", isLoggedIn, isInstructor,deleteLecture);
//upload lecture video
lectureRouter.post("/:lectureId/video/upload", isLoggedIn, isInstructor,upload.single("lectureVideo"),uploadLectureVideo);
//update lecture video
lectureRouter.put("/:lectureId/video/upload", isLoggedIn, isInstructor,upload.single("lectureVideo"),updateLectureVideo);
//upload attachment
lectureRouter.post("/:lectureId/attachment/upload", isLoggedIn, isInstructor,upload.single("lectureAttachment"),uploadLectureAttachment);
//delete attachment
lectureRouter.delete("/:lectureId/attachment/:attachmentId", isLoggedIn, isInstructor,deleteLectureAttachment);

export default lectureRouter;