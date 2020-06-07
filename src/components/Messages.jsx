import PropTypes from 'prop-types';
import styled from 'styled-components';

const React = require('react');

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  display: grid;
  padding: 4em;
  background: white;
  font-family: 'Roboto', sans-serif;
  align-items: center;
`;

const Message = styled.div`
  display: grid;
  background-color: ${({ message }) => (message.pinned ? 'rgba(250, 220, 48, 0.536)' : 'rgba(67, 185, 235, 0.605)')};
  border-radius: 20px;
  margin: 5px;

`;

// const NotPinned = styled.div`
//   background: ;
//   display: grid;
// `;

const MessageDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  margin: 2em 2em 2em 2em;
`;

const Button = styled.button`
  display: grid;
  justify-self: right;
`;

const User = styled.p`
  color: grey;
  margin-right: 2em;
`;

// Use Title and Wrapper like any other React component – except they're styled!
// render(
//   <Wrapper>
//     <Title>
//       Hello World!
//     </Title>
//   </Wrapper>
// );

const Messages = ({ messages, handleClick }) => (
  <Wrapper>
    {messages.map((message, idx) => (
      <li id={`message ${idx}`}>
        {message.pinned
          ? (
            <Message message={message}>
              <MessageDetails>
                <User>{`${message.username}`}</User>
                <p className="content">{`${message.outgoingMessage}`}</p>
                <p />
                {/* <p className="time">{`${message.time}`}</p> */}
              </MessageDetails>
              <Button
                name={`button ${idx}`}
                type="button"
                onClick={handleClick}
              >
                REMOVE
              </Button>
            </Message>
          )
          : (
            <Message message={message}>
              <MessageDetails>
                <User>{`${message.username}`}</User>
                <p className="content">{`${message.outgoingMessage}`}</p>
                <p />
                {/* <p className="time">{`${message.time}`}</p> */}
              </MessageDetails>
              <Button
                name={`button ${idx}`}
                type="button"
                onClick={handleClick}
              >
                SAVE
              </Button>
            </Message>
          )}
      </li>
    ))}
  </Wrapper>
);
Messages.propTypes = {
  messages: PropTypes.arrayOf('objects').isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Messages;
