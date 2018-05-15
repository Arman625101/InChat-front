import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Chat.scss';

/* eslint-disable react/no-array-index-key */
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
      this.props.onMessage(this.state.text);
      this.setState({ text: '' });
    }
  }
  render() {
    return (
      <div className="chat_holder">
        <div className="online_users">
          <h1>Online users</h1>
          <ul>{this.props.users.map((user, i) => <li key={i}>{user.name}</li>)}</ul>
        </div>
        <div className="chat">
          <ul>{this.props.messages.map((item, i) => <li key={i}>{item}</li>)}</ul>
          <input
            onKeyPress={this.handleSubmit}
            value={this.state.text}
            type="text"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
/* eslint-enable */
Chat.propTypes = {
  messages: PropTypes.arrayOf(Object).isRequired,
  users: PropTypes.arrayOf(Object).isRequired,
  onMessage: PropTypes.func.isRequired,
};

export default Chat;
