import Messages from './Messages';

const React = require('react');
const io = require('socket.io-client');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], socket: io.connect(window.location.origin) };
  }

  componentDidMount() {
    const { socket, messages } = this.state;
    socket.on('message', (message) => {
      this.setState(
        { messages: [...messages, message] },
      );
    });
  }

  handleSubmit() {
    const {
      socket, user, outgoingMessage, messages,
    } = this.state;
    socket.emit('message', { user, outgoingMessage }, (message) => {
      this.setState(
        { messages: [...messages, message] },
      );
    });
  }

  handleTyping(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div>
        <ul>
          <Messages messages={messages} />
        </ul>
      </div>
    );
  }
}

export default Chat;
