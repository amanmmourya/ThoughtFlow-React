import express from 'express';
import {getMessages,getRecentChats } from '../controllers/messageController.js';
const router = express.Router();

// Define the route to get messages
router.post('/getMessages', getMessages);
router.post('/getRecentChats', getRecentChats);
export default router;