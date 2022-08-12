const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
require('./socket').socketIoListen(httpServer);

app.use(express.json());
app.use(express.urlencoded());

const PORT = 8000;

httpServer.listen(PORT, () => {
  console.log('Server running...');
});
