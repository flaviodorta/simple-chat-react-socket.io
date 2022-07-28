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
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

httpServer.listen(PORT, () => {
  console.log('Server running...');
});
