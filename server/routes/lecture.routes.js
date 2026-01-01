import {Router} from "express";
import { createLecture, deleteLecture, getSectionLectures, updateLecture } from "../controller/lecture.controller.js";
import isLoggedIn, { isInstructor } from "../middlewares/auth.user.js";


const lectureRouter = Router({mergeParams:true});

lectureRouter.get("/:sectionId", getSectionLectures);
lectureRouter.post("/:sectionId",isLoggedIn,isInstructor, createLecture);
lectureRouter.put("/:sectionId/:lectureId", isLoggedIn, isInstructor,updateLecture);
lectureRouter.delete("/:sectionId/:lectureId", isLoggedIn, isInstructor, deleteLecture);

export default lectureRouter;