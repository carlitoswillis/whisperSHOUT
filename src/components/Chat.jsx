/* eslint-disable react/jsx-no-bind */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Messages from './Messages';

const React = require('react');
const io = require('socket.io-client');
const $ = require('jquery');

const Wrapper = styled.section`
  display: grid;
  padding: 4em;
  /* background: papayawhip; */
  font-family: 'Roboto', sans-serif;
  align-items: center;
`;

const Input = styled.input`
  /* display: grid; */
  text-align: center;
  /* position: fixed; */
  margin-bottom: 10px;
  width: 100%;
  border: 0px solid grey;
  border-radius: 5px;
  padding: 10px;
`;

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
    let { messages, username } = this.state;
    messages = [...messages];
    const message = messages[index];
    if (message.username === username) {
      message.pinned = !message.pinned;
    }
    const settings = {
      url: '/save/',
      method: message.pinned ? 'POST' : 'DELETE',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(message),
    };
    $.ajax(settings).done((response) => {
      if (message.pinned) {
        message.id = JSON.parse(response).id;
      }
      this.setState(
        { messages },
      );
    });
  }

  handleEdit() {
    const settings = {
      url: 'http://127.0.0.1:3000/save/',
      method: message.pinned ? 'POST' : 'DELETE',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(message),
    };
    $.ajax(settings).done((response) => {
      if (message.pinned) {
        message.id = JSON.parse(response).id;
      }
      this.setState(
        { messages },
      );
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <Wrapper>
        <Input onKeyPress={this.handleTyping.bind(this)} id="outgoingMessage" type="text" name="outgoingMessage" placeholder="send a message... type and hit enter" />
        <ul>
          <Messages messages={messages} handleEdit={this.handleEdit.bind(this)} handleClick={this.handleClick.bind(this)} />
        </ul>
      </Wrapper>
    );
  }
}
Chat.propTypes = {
  username: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default Chat;
