const socketIoListen = require('socket.io');
const Redis = require('ioredis');
const redis = new Redis({
  port: 6379,
  host: 'localhost',
  username: 'default',
  db: 0,
});

const usersRoomString = (roomId: string) => `room_${roomId}_users`;
const messagesRoomString = (roomId: string) => `room_${roomId}_messages`;

module.exports.socketIoListen = (httpServer) => {
  const io = socketIoListen(httpServer, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user ${socket.id} connected`);

    socket.on('user join room', async ({ roomId }) => {
      socket.join(roomId);

      const allUsersStringified = await redis.lrange(
        usersRoomString(roomId),
        0,
        -1
      );
      const allMessagesStringified = await redis.lrange(
        messagesRoomString(roomId),
        0,
        -1
      );

      const allUsers = allUsersStringified.map((user) => JSON.parse(user));
      const allMessages = allMessagesStringified.map((message) =>
        JSON.parse(message)
      );

      socket.emit('send all users', { allUsers });
      socket.emit('send all messages', { allMessages });
    });

    socket.on('user joined room', async ({ roomId, avatarUrl, username }) => {
      io.in(roomId).emit('user joined room', { avatarUrl, username });
      const newUser = { avatarUrl, username };
      await redis.lpush(usersRoomString(roomId), JSON.stringify(newUser));
    });

    socket.on(
      'user send message',
      async ({ roomId, avatarUrl, username, messageContent }) => {
        io.to(roomId).emit('user send message', {
          avatarUrl,
          username,
          messageContent,
        });
        const newMessage = { avatarUrl, username, messageContent };
        await redis.lpush(
          messagesRoomString(roomId),
          JSON.stringify(newMessage)
        );
      }
    );
  });
};
