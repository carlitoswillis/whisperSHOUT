const express = require('express');
const os = require('os');
const compression = require('compression');
const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'production' });
log.info('starting up');

const port = process.env.PORT || 3000;

const app = express();

app.use(compression());

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
  socket.emit('message', { username: 'system', outgoingMessage: 'someone connected', system: true });
  socket.on('message', (data) => {
    io.emit('message', data);
  });
});
