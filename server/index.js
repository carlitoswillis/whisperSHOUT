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
// app.get('/', (req, res) => {
//   res
// });

const server = app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    log.info(`listening at http://${os.networkInterfaces().lo0[0].address}:${port}`);
  }
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  log.info('user connected');
  socket.emit('message', 'user connected');
  socket.on('another event', (data) => {
    log.info(data);
  });
});
