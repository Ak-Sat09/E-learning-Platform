import express from "express";
import {
  
  createCourse,
   
 
  getAllCourses,
 
} from "../controllers/courseController.js";
const router = express.Router();

// Get All courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - only admin
router
  .route("/createcourse")
  .post(    createCourse);
 

export default router;
