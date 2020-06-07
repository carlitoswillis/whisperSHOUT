import Chat from './Chat';

const React = require('react');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(e) {
    const { key, target } = e;
    const { name, value } = target;
    if (key === 'Enter' && value !== '') {
      this.setState({
        [name]: value,
      });
    }
  }

  render() {
    const { username, room } = this.state;
    return (
      <div>
        <h1>silentSHOUT</h1>
        {username
          ? <div /> : <input onKeyPress={this.handleChange.bind(this)} type="text" name="username" placeholder="username" />}
        {room
          ? <div /> : <input onKeyPress={this.handleChange.bind(this)} type="text" name="room" placeholder="room name" />}
        {username && room ? <Chat username={username} room={room} /> : <div />}
      </div>
    );
  }
}

export default App;
