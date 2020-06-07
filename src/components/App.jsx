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
    const { username } = this.state;
    return (
      <div>
        <h1>silentSHOUT</h1>
        {username ? <Chat username={username} /> : <input onKeyPress={this.handleChange.bind(this)} type="text" name="username" placeholder="username" />}
      </div>
    );
  }
}

export default App;
