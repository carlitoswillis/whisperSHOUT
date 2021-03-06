const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');
const compression = require('compression');
const bunyan = require('bunyan');
const socketio = require('socket.io');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { saveMessage, readSavedMessages, deleteMessage } = require('../db');

const privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'dotcom', 'private.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '..', '..', 'dotcom', 'www_carlitoswillis_com.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
// const httpApp = express();
// const httpServer = http.createServer(httpApp);
const httpsServer = https.createServer(credentials, app);

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
    saveMessage(req.body, (err, result) => {
      if (err) {
        res.status(404);
        res.end();
        throw err;
      } else {
        res.status(201);
        res.end(JSON.stringify(result));
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

const server = httpsServer.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    let address;
    try {
      address = `https://${os.networkInterfaces().lo0[0].address}:`;
    } catch (e) {
      address = '';
    }
    log.info(`listening at ${address}${port}`);
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
      username: 'system', outgoingMessage: `${socket.handshake.query.username} connected to ${data.room}`, time: new Date().toISOString(), system: true,
    });
  });

  socket.on('message', (data) => {
    io.in(data.room).emit('message', data);
  });
});
