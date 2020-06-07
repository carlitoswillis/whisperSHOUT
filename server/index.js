const express = require('express');
const os = require('os');
const compression = require('compression');
const bunyan = require('bunyan');

const app = express();
const log = bunyan.createLogger({ name: 'production' });
log.info('starting up');
const port = process.env.PORT || 3000;

app.use(compression());
app.use(express.json());
app.use(express.static('public'));

app.post('/save/', (req, res) => {
  // save here
  const data = req.body;
  res.end();
});

const server = app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    log.info(`listening at http://${os.networkInterfaces().lo0[0].address}:${port}`);
  }
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room);
    io.in(data.room).emit('message', { username: 'system', outgoingMessage: `${socket.handshake.query.username} connected to ${data.room}`, system: true });
  });

  socket.on('message', (data) => {
    io.in(data.room).emit('message', data);
  });
});
