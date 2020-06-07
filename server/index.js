const express = require('express');
const os = require('os');
const compression = require('compression');
const bunyan = require('bunyan');
const bodyParser = require('body-parser');

const log = bunyan.createLogger({ name: 'production' });
log.info('starting up');

const port = process.env.PORT || 3000;

const app = express();

app.use(compression());
app.use(bodyParser());

app.use(express.static('public'));

const server = app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    log.info(`listening at http://${os.networkInterfaces().lo0[0].address}:${port}`);
  }
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  // console.log(socket.client.jeader);
  // console.log(socket.client.connection);
  // console.log(socket.client.request._query);
  socket.broadcast.emit('message', { username: 'system', outgoingMessage: `${socket.handshake.query.username} connected`, system: true });
  socket.on('message', (data) => {
    io.emit('message', data);
  });
});
