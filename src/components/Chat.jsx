import Messages from './Messages';

const React = require('react');
const io = require('socket.io-client');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { username } = this.props;
    this.state = {
      messages: [],
      socket: io.connect(window.location.origin),
      username,
    };
  }

  componentDidMount() {
    const { socket, messages } = this.state;
    const newMessages = [...messages];
    socket.on('message', (message) => {
      newMessages.push(message);
      this.setState(
        { messages: newMessages },
      );
    });
  }

  handleSubmit() {
    const {
      socket, username, outgoingMessage, messages,
    } = this.state;
    const newMessages = [...messages, { username, outgoingMessage }];
    socket.emit('message', { username, outgoingMessage });
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
  // onChange={this.handleTyping.bind(this)}

  render() {
    const { messages } = this.state;
    return (
      <div>
        <ul>
          <Messages messages={messages} />
        </ul>
        <input onKeyPress={this.handleTyping.bind(this)} id="outgoingMessage" type="text" name="outgoingMessage" placeholder="send a message" />
      </div>
    );
  }
}

export default Chat;
