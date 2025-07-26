import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/all-tasks", protectRoute, getTasks);
router.post("/create-task", protectRoute, createTask);
router.put("/update-task/:id", protectRoute, updateTask);
router.delete("/delete-task/:id", protectRoute, deleteTask);

export default router;
