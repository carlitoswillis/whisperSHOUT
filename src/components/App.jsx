import styled from 'styled-components';
import Chat from './Chat';

const React = require('react');

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  display: grid;
  padding: 4em;
  background: papayawhip;
  font-family: 'Roboto', sans-serif;
  align-content: center;
`;

const Input = styled.input`
  display: grid;
  text-align: center;
  align: center;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(e) {
    const { key, target } = e;
    const { name, value } = target;
    if (key === 'Enter' && value !== '') {
      if (!(target === 'username') && !(value === 'system')) {
        this.setState({
          [name]: value,
        });
      }
    }
  }

  render() {
    const { username, room } = this.state;
    return (
      <Wrapper>
        <Title>silentSHOUT</Title>
        {username
          ? <div /> : <Input onKeyPress={this.handleChange.bind(this)} type="text" name="username" placeholder="username" />}
        {room
          ? <div /> : <Input onKeyPress={this.handleChange.bind(this)} type="text" name="room" placeholder="room name" />}
        {username && room ? <Chat username={username} room={room} /> : <div />}
      </Wrapper>
    );
  }
}

export default App;
