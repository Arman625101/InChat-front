import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <ul>{this.props.messages.map((item, i) => <li key={i}>{item}</li>)}</ul>
        <input
          onKeyPress={this.handleSubmit}
          value={this.state.text}
          type="text"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
/* eslint-enable */
Chat.propTypes = {
  messages: PropTypes.arrayOf(String).isRequired,
  onMessage: PropTypes.func.isRequired,
};

export default Chat;
