const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const socketIo = require('socket.io');

app.use(express.json());
app.use(express.urlencoded());

const io = socketIo(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
  },
});

const PORT = 8000;

io.on('connection', (socket) => {
  console.log(`A user ${socket.id} connected`);

  socket.on('user join room', ({ roomId, avatarUrl, username }) => {
    socket.join(roomId);
  });

  socket.on('user joined room', ({ roomId, avatarUrl, username }) => {
    // console.log(`username: ${username}`);

    // const chatIdx = chats.findIndex((chat) => chat.roomId === roomId);
    // chats[chatIdx].users.push({ roomId, avatarUrl, username });

    io.in(roomId).emit('user joined room', { avatarUrl, username });
  });

  socket.on(
    'user send message',
    ({ roomId, avatarUrl, username, messageContent }) => {
      // console.log(`${avatarUrl} ${username} ${messageContent}`);

      socket.to(roomId).emit('user send message', {
        avatarUrl,
        username,
        messageContent,
      });
    }
  );
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

httpServer.listen(PORT, () => {
  console.log('Server running...');
});

// interface User {
//   roomId: string;
//   avatarUrl: string;
//   username: string;
// }

// interface Chat {
//   roomId: string;
//   users: User[];
// }

// const chats: Chat[] = [];

// let chatIdx = chats.findIndex((chat) => chat.roomId === roomId);
// console.log(chatIdx);

// if (chatIdx === -1) {
//   chats.push({ roomId, users: [{ roomId, avatarUrl, username }] });
// }

// chatIdx = chats.findIndex((chat) => chat.roomId === roomId);

// const users = chats[chatIdx].users;
// console.log(users);

// users.push({ roomId, avatarUrl, username });

// socket.emit('users in the room', users);

// console.log(chats[0].users);
