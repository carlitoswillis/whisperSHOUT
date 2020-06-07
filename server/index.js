const express = require('express');
const os = require('os');
const compression = require('compression');
const bunyan = require('bunyan');
const socketio = require('socket.io');
const { saveMessage, readSavedMessages, deleteMessage } = require('../db');

const app = express();
const log = bunyan.createLogger({ name: 'production' });
log.info('starting up');
const port = process.env.PORT || 3000;

app.use(compression());
app.use(express.json());
app.use(express.static('public'));

app.get('/save/', (req, res) => {
  readSavedMessages(req.body.room, (err, result) => {
    if (err) {
      res.status(404);
      res.end();
      throw err;
    } else {
      res.status(200);
      res.send(result.rows);
    }
  });
});

app.post('/save/', (req, res) => {
  if (req.body.room) {
    saveMessage(req.body, (err) => {
      if (err) {
        res.status(404);
        res.end();
        throw err;
      } else {
        res.status(201);
        res.end();
      }
    });
  } else {
    res.status(404).end();
  }
});

app.delete('/save/', (req, res) => {
  if (req.body.room) {
    deleteMessage(req.body, (err) => {
      if (err) {
        res.status(404);
        res.end();
        throw err;
      } else {
        res.status(201);
        res.end();
      }
    });
  } else {
    res.status(404).end();
  }
});

const server = app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    log.info(`listening at http://${os.networkInterfaces().lo0[0].address}:${port}`);
  }
});

const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room);
    readSavedMessages(data.room, (err, result) => {
      if (err) {
        log.error(err);
      } else {
        const messages = result.rows.map((entry) => ({
          username: entry.username,
          time: entry.time,
          room: entry.room,
          outgoingMessage: entry.message,
          id: entry.id,
          pinned: true,
        }));
        io.emit('loadinitialmessages', { messages });
      }
    });
    io.in(data.room).emit('message', {
      username: 'system', outgoingMessage: `${socket.handshake.query.username} connected to ${data.room} at`, time: new Date(), system: true,
    });
  });

  socket.on('message', (data) => {
    io.in(data.room).emit('message', data);
  });
});
