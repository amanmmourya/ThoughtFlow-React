// create a server using express
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js'; 
import messageRoutes from './routes/messageRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import darkRoutes from './routes/darkRoutes.js'; 
import dotenv from 'dotenv';
dotenv.config(); 
import connectDB from './db/db.js'; 
await connectDB(); // Connect to MongoDB
const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// socket setup
import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(app);
const io = new Server(server,{cors: {
    origin: '*',
    methods: ['GET', 'POST','PUT', 'DELETE'],
  }
});
import socketHandler from './socket/socket.js';
socketHandler(io);

// all routes
app.use('/api/auth',authRoutes);
app.use('/api/msg',messageRoutes);
app.use('/api/group',groupRoutes);
app.use('/api/dark',darkRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
})
  
