const React = require('react');

const Messages = ({ messages }) => (
  <div>
    {messages.map((message) => (
      <li>
        {`${message.username}: ${message.outgoingMessage}`}
      </li>
    ))}
  </div>
);

export default Messages;
