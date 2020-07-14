const { Pool } = require('pg');
const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'production' });

const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  // database: 'silentshout',
  password: process.env.POSTGRES_PASSWORD || 'password',
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
  let query = '';
  pool.query(`SELECT * FROM saved WHERE id='${message.id}'`, (err) => {
    if (err) {
      query = `INSERT INTO saved(room, message, time, username) values('${message.room}', '${message.outgoingMessage}', '${message.time}', '${message.username}') RETURNING *`;
    } else {
      query = `INSERT INTO saved(room, message, time, username, id) values('${message.room}', '${message.outgoingMessage}', '${message.time}', '${message.username}', ${message.id}) ON CONFLICT DO NOTHING RETURNING *`;
    }
    pool.query(query, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(null, result.rows[0]);
      }
    });
  });
};

const deleteMessage = (message, callback) => {
  pool.query(`DELETE FROM saved WHERE id=${message.id}`, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

// DELETE FROM reviews WHERE id = '${id}'

module.exports = {
  saveMessage, readSavedMessages, deleteMessage,
};
