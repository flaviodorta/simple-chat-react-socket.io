const socketIoListen = require('socket.io');

module.exports.socketIoListen = (httpServer) => {
  const io = socketIoListen(httpServer, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`A user ${socket.id} connected`);

    socket.on('user join room', ({ roomId, avatarUrl, username }) => {
      socket.join(roomId);
    });

    socket.on('user joined room', ({ roomId, avatarUrl, username }) => {
      io.in(roomId).emit('user joined room', { avatarUrl, username });
    });

    socket.on(
      'user send message',
      ({ roomId, avatarUrl, username, messageContent }) => {
        socket.to(roomId).emit('user send message', {
          avatarUrl,
          username,
          messageContent,
        });
      }
    );
  });

  return io;
};
