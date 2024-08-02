import express from "express";
import {
  contact,
  courseRequest, 
} from "../controllers/otherController.js";
 

const router = express.Router();

// contact form
router.route("/contact").post(contact);

// Request form
router.route("/courserequest").post(courseRequest);
 
export default router;
