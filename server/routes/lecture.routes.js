import {Router} from "express";
import { getSectionLectures } from "../controller/lecture.controller.js";


const lectureRouter = Router();

lectureRouter.get("/sections/:sectionId/lectures",getSectionLectures);



export default lectureRouter;