import express from 'express'
import http from 'http';
import socketIo from 'socket.io';
import chatService from './apis/chat/chat.service';
import bodyParser from 'body-parser';
const fs = require('fs');
const app = express()
const port = process.env.PORT || 3000

// Tạo server HTTP và tích hợp Socket.IO
const server = http.createServer(app);
const io = socketIo(server);
import router from'./apis/index';

import db from './database/database.config'
//connect db
db.connect();

app.use(express.urlencoded());
app.use(express.json())

// Middleware để thêm Socket.IO vào req
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Kết nối WebSocket
io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`Client joined chat ${chatId}`);
    });
  
    socket.on('sendMessage', async ({ chatId, senderId, message }) => {
      try {
        const chat = await chatService.sendMessage(io, chatId, senderId, message);
        io.to(chatId).emit('newMessage', chat);
      } catch (error) {
        console.error(error.message);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

app.use('/apis', router)




app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
