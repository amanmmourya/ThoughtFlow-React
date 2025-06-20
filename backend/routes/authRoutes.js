import { login } from "../controllers/authController.js";
import { signup } from "../controllers/authController.js";
import { getAllUsers } from "../controllers/authController.js";
import express from "express";
const router = express.Router();
// Define the login route
router.post("/login", login);
router.post("/signup",signup)
router.post("/getAllUsers", getAllUsers)
export default router;