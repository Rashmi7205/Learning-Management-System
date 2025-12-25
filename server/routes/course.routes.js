import {Router} from 'express';
import {getCourses, getCourseById, createCourse, updateCourse, deleteCourse} from '../controller/course.controller.js';

const courseRouter = Router();
courseRouter.post('/', createCourse);
courseRouter.get('/', getCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.put('/:id', updateCourse);
// courseRouter.delete('/:id', deleteCourse);
export default courseRouter;