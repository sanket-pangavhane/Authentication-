import express from "express";
import { getUserData } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";


const router = express.Router()

router.get('/get-user-data',isAuthenticated,getUserData)

export default router;
