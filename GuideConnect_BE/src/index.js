import express from 'express';
import socketIo from 'socket.io';
import chatService from './apis/chat/chat.service';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import router from './apis/index';
import db from './database/database.config';

const app = express();
const port = process.env.PORT || 3000;

const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:5501", "http://127.0.0.1:5500", "https://51.79.173.117:3000"], // Thêm cả hai origin
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


// Kết nối database
db.connect();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ verify: (req, res, buf) => req.rawBody = buf.toString() }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

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
      console.error('Error sending message:', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use('/apis', router);

// Chạy server trên cổng đã chỉ định
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
