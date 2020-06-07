import PropTypes from 'prop-types';
import styled from 'styled-components';

const React = require('react');

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Pinned = styled.div`
  background: orange;
  display: grid;
`;

const NotPinned = styled.div`
  background: teal;
  display: grid;
`;

const MessageDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
`;

const Button = styled.button`
  display: grid;
  justify-self: right;
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
            <Pinned>
              <MessageDetails>
                <p className="user">{`${message.username}`}</p>
                <p className="content">{`${message.outgoingMessage}`}</p>
                <p />
                <p className="time">{`${message.time}`}</p>
              </MessageDetails>
              <Button
                name={`button ${idx}`}
                type="button"
                onClick={handleClick}
              >
                REMOVE
              </Button>
            </Pinned>
          )
          : (
            <NotPinned>
              <MessageDetails>
                <p className="user">{`${message.username}`}</p>
                <p className="content">{`${message.outgoingMessage}`}</p>
                <p />
                <p className="time">{`${message.time}`}</p>
              </MessageDetails>
              <Button
                name={`button ${idx}`}
                type="button"
                onClick={handleClick}
              >
                SAVE
              </Button>
            </NotPinned>
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
