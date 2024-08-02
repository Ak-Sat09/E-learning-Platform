import express from "express";
import {
  changePassword,
  deleteUser,
  forgetPassword,
  getAllUsers,
  login,
  register,
  resetPassword, 
  updateUserRole,
} from "../controllers/userController.js";
import {   isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);
 
// ChangePassword
router.route("/changepassword").put(isAuthenticated, changePassword);
 
// ForgetPassword
router.route("/forgetpassword").post(forgetPassword);
// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);
 
// Admin Routes
router.route("/users").get( getAllUsers);

router
  .route("/admin/user/:id")
  .put(  updateUserRole)
  .delete( deleteUser);

export default router;
