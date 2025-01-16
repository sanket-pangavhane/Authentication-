import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { transporter } from "../config/emailConfig.js";

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Registration successful. Please log in." });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful.", user: { id: user._id, isVerified: user.isVerified } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error });
  }
};

// Send OTP for Email Verification
export const sendVerificationOTP = async (req, res) => {
  const { email, type } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

  const otpMessages = {
    "email-verification": {
      subject: "Email Verification OTP",
      text: (otp) => `Your OTP for email verification is: ${otp}`,
    },
    "password-reset": {
      subject: "Password Reset OTP",
      text: (otp) => `Your OTP to reset your password is: ${otp}`,
    },
  };

  try {
    const user = await User.findOneAndUpdate({ email }, { otp, otpExpire }, { new: true });

    if (!user) return res.status(400).json({ message: "User not found." });

    const otpDetails = otpMessages[type];
    if (!otpDetails) {
      return res.status(400).json({ message: "Invalid OTP request type." });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: otpDetails.subject,
      text: otpDetails.text(otp),
    });

    res.json({ message: "OTP sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP.", error });
  }
};

// Verify Email with OTP
export const verifyEmail = async (req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    res.json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying email.", error });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const userId = req.user.id;
  const { otp, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    res.json({ message: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password.", error });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully." });
};
