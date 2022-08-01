import { JOIN_ROOM, USER_JOINED_ROOM } from './utils/constants';

const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const socketIo = require('socket.io');

app.use(express.json());
app.use(express.urlencoded());

const io = socketIo(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = 8000;

io.on('connection', (socket) => {
  console.log(`A user ${socket.id} connected`);

  // socket.broadcast.emit('user join', `User ${socket.id} enter in the room`);

  socket.on(JOIN_ROOM, ({ username, roomId }) => {
    console.log('cu');
    socket.join(roomId);
    io.to(roomId).emit(USER_JOINED_ROOM, `${username} joined in the room`);
  });

  // socket.on('chat message', (msg) => {
  //   io.emit('chat message', `[Server] Message from User ${socket.id}: ${msg}`);
  // });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

httpServer.listen(PORT, () => {
  console.log('Server running...');
});
