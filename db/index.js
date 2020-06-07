const { Pool } = require('pg');
const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'production' });

const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'silentshout',
  password: process.env.DB_PASSWORD || 'password',
  port: 5432,
});

pool.query('CREATE TABLE IF NOT EXISTS saved(room text, message text, id serial, time text, username text, primary key(room, id))', (err) => {
  if (err) {
    log.info('error', err);
  } else {
    log.info('table created or exists');
  }
});

const readSavedMessages = (room, callback) => {
  pool.query(`SELECT * FROM saved WHERE room='${room}'`, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const saveMessage = (message, callback) => {
  pool.query(`INSERT INTO saved(room, message, time, username) values('${message.room}', '${message.outgoingMessage}', '${message.time}', '${message.username}')`, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = {
  saveMessage, readSavedMessages,
};
