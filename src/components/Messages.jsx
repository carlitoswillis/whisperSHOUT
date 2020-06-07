import PropTypes from 'prop-types';

const React = require('react');

const Messages = ({ messages, handleClick }) => (
  <div>
    {messages.map((message, idx) => (
      <li id={`message ${idx}`}>
        <p className="message">{`${message.username}: ${message.outgoingMessage}`}</p>
        <p className="time">{`${message.time}`}</p>
        <button
          name={`button ${idx}`}
          type="button"
          onClick={handleClick}
        >
          PIN
        </button>
      </li>
    ))}
  </div>
);
Messages.propTypes = {
  messages: PropTypes.arrayOf('objects').isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Messages;
