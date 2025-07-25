import express from "express";
import { signup, signin, signout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/auth.middleware.js";
import authLimiter from "../middleware/ratelimiter.middleware.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post("/signin", authLimiter, signin);
router.post('/signout', protectRoute, signout);
router.put('/update-profile', protectRoute, updateProfile);
router.get('/check', protectRoute, checkAuth);

export default router;