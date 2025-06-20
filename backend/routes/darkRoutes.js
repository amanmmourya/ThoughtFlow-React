import { createdark, enterdark } from "../controllers/darkController.js";
import express from "express";
import { getMessages } from "../controllers/darkController.js";
const router = express.Router();
router.post("/createdark", createdark);
router.post("/enterdark",enterdark);
router.post("/getMessages",getMessages);
export default router;