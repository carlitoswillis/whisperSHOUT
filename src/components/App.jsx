/* eslint-disable react/jsx-no-bind */
import styled from 'styled-components';
import Chat from './Chat';

const React = require('react');

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
`;

const Center = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.section`
  display: grid;
  padding: 4em;
  background: palevioletred;
  font-family: 'Roboto', sans-serif;
  align-content: center;
  justify-content: center;
`;

const Input = styled.input`
  display: grid;
  text-align: center;
  /* position: fixed; */
  margin-bottom: 3px;
  margin-top: 3px;
  width: 100%;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
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

  reset() {
    this.setState({
      username: '', room: '',
    });
  }

  render() {
    const { username, room } = this.state;
    // const username = 'carlitos';
    // const room = 'roomy';
    return (
      <Wrapper>
        <Title onClick={this.reset.bind(this)}>silentSHOUT</Title>
        <Center>
          {username
            ? <div /> : <Input onKeyPress={this.handleChange.bind(this)} type="text" name="username" placeholder="username" />}
          {room
            ? <div /> : <Input onKeyPress={this.handleChange.bind(this)} type="text" name="room" placeholder="room name" />}
        </Center>
        {username && room ? <Chat username={username} room={room} /> : <div />}
      </Wrapper>
    );
  }
}

export default App;
