import { createGroup, entergroup } from "../controllers/groupController.js";
import express from "express";
import { getMessages } from "../controllers/groupController.js";
const router = express.Router();
router.post("/creategroup", createGroup);
router.post("/entergroup",entergroup)
router.post("/getMessages",getMessages)
export default router;