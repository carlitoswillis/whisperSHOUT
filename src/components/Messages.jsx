const React = require('react');

const Messages = ({ messages }) => (
  <div>
    {messages.map((message) => <li>{message}</li>)}
  </div>
);

export default Messages;
