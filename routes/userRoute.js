import express from "express";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

// GET user profile with reviews
router.get("/:userId", getUserProfile);

export default router;
