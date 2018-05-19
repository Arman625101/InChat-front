import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Chat.scss';

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
    if (event.key === 'Enter' && this.state.text.trim()) {
      this.props.newMessage(this.state.text);
      this.setState({ text: '' });
    }
  }
  render() {
    return (
      <div className="chat">
        <ul>
          {this.props.messages.map((item, i) => (
            <li
              key={i}
              className={item.sender.name === this.props.currentUser.name ? 'same_user' : ''}
            >
              <p>{item.text}</p>
              <span>
                From {item.sender.name === this.props.currentUser.name ? 'you' : item.sender.name}
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyPress={this.handleSubmit}
          value={this.state.text}
          onChange={this.handleChange}
        />
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
