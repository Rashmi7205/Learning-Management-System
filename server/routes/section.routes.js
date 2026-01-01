import { Router } from "express";
import { createSection, deleteSection, getCourseSections, reorderSections, updateSection } from "../controller/section.controller.js";
import isLoggedIn, { isInstructor } from "../middlewares/auth.user.js";
const sectionRouter = Router({ mergeParams: true });


//create section
sectionRouter.post("/", isLoggedIn, isInstructor, createSection);
//upadte section
sectionRouter.put("/:sectionId", isLoggedIn, isInstructor, updateSection);
//delete section
sectionRouter.delete("/:sectionId", isLoggedIn, isInstructor, deleteSection);
//reorder
sectionRouter.put("/:sectionId/reorder",isLoggedIn, reorderSections);
//get all sections
sectionRouter.get("/", getCourseSections);

export default sectionRouter;