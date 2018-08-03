import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdArrowForward } from 'react-icons/md';
import './Chat.scss';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.text.trim()) {
      this.props.newMessage(this.state.text);
      this.setState({ text: '' });
    }
  }

  render() {
    const { messages, currentUser } = this.props;
    const { text } = this.state;
    return (
      <div className="chat">
        <ul>
          {messages.map((item, i) => (
            <li key={i} className={item.sender.name === currentUser.name ? 'same_user' : ''}>
              <p>
                {item.text}
              </p>
              <span>
                From
                {item.sender.name === currentUser.name ? 'you' : item.sender.name}
              </span>
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit} className="inp_holder">
          <input type="text" value={text} onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit}>
            <MdArrowForward />
          </button>
        </form>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(Object).isRequired,
  currentUser: PropTypes.objectOf(String).isRequired,
  newMessage: PropTypes.func.isRequired,
};

export default Chat;
