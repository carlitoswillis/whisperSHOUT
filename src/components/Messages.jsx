import PropTypes from 'prop-types';

const React = require('react');

const Messages = ({ messages }) => (
  <div>
    {messages.map((message, idx) => (
      <li id={`message ${idx}`}>
        <p className="message">{`${message.username}: ${message.outgoingMessage}`}</p>
        <p className="time">{`${message.time}`}</p>
      </li>
    ))}
  </div>
);
Messages.propTypes = {
  messages: PropTypes.arrayOf('objects').isRequired,
};
export default Messages;
