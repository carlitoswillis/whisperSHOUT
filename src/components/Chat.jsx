import PropTypes from 'prop-types';
import Messages from './Messages';

const React = require('react');
const io = require('socket.io-client');
const $ = require('jquery');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { username, room } = this.props;
    this.state = {
      messages: [],
      socket: io.connect(window.location.origin, { query: `username=${username}` }),
      username,
      room,
    };
  }

  componentDidMount() {
    const { socket, messages, room } = this.state;
    let newMessages = [...messages];

    socket.on('connect', () => {
      socket.emit('join', { room });
    });

    socket.on('message', (message) => {
      newMessages = [message, ...newMessages];
      this.setState(
        { messages: newMessages },
      );
    });

    socket.on('loadinitialmessages', (data) => {
      newMessages = [...data.messages, ...newMessages];
      this.setState(
        { messages: newMessages },
      );
    });
  }

  handleSubmit() {
    const {
      socket, username, outgoingMessage, messages, room,
    } = this.state;
    const newMessage = {
      username, room, outgoingMessage, time: new Date(),
    };
    const newMessages = [newMessage].concat(messages);
    socket.emit('message', newMessage);
    this.setState(
      { messages: newMessages }, () => {
        document.getElementById('outgoingMessage').value = '';
      },
    );
  }

  handleTyping(e) {
    const { key, target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      if (key === 'Enter') {
        this.handleSubmit();
      }
    });
  }

  handleClick(e) {
    const index = e.target.name.split(' ')[1];
    const { messages } = this.state;
    const message = messages[index];
    const settings = {
      url: 'http://127.0.0.1:3000/save/',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(message),
    };

    $.ajax(settings).done((response) => {
      console.log(response);
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div>
        <input onKeyPress={this.handleTyping.bind(this)} id="outgoingMessage" type="text" name="outgoingMessage" placeholder="send a message" />
        <ul>
          <Messages messages={messages} handleClick={this.handleClick.bind(this)} />
        </ul>
      </div>
    );
  }
}
Chat.propTypes = {
  username: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default Chat;
