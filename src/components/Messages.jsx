const React = require('react');

const Messages = ({ messages }) => (
  <div>
    {messages.map((message, idx) => (
      <li id={`message ${idx}`}>
        {`${message.username}: ${message.outgoingMessage}`}
      </li>
    ))}
  </div>
);

export default Messages;
