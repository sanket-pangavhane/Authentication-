import express from "express";
import {
  registerUser,
  loginUser,
  sendVerificationOTP,
  verifyEmail,
  resetPassword,
  logoutUser,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);

router.post("/send-verification-otp", isAuthenticated, sendVerificationOTP);
router.post("/verify-email", isAuthenticated, verifyEmail);

router.post("/reset-password", isAuthenticated, resetPassword);

export default router;
