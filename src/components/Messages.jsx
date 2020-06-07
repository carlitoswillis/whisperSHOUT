import PropTypes from 'prop-types';

const React = require('react');

const Messages = ({ messages, handleClick }) => (
  <div>
    {messages.map((message, idx) => (
      <li id={`message ${idx}`}>
        {message.pinned
          ? (
            <div className="message pinned">
              <p className="content">{`${message.username}: ${message.outgoingMessage}`}</p>
              <p className="time">{`${message.time}`}</p>
              <button
                name={`button ${idx}`}
                type="button"
                onClick={handleClick}
              >
                REMOVE
              </button>
            </div>
          )
          : (
            <div className="message pinned">
              <p className="content">{`${message.username}: ${message.outgoingMessage}`}</p>
              <p className="time">{`${message.time}`}</p>
              <button
                name={`button ${idx}`}
                type="button"
                onClick={handleClick}
              >
                SAVE
              </button>
            </div>
          )}
      </li>
    ))}
  </div>
);
Messages.propTypes = {
  messages: PropTypes.arrayOf('objects').isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Messages;
