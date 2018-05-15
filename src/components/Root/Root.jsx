import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import Form from '../Form';
import Chat from '../Chat';

class Root extends Component {
  constructor() {
    super();
    this.state = { messages: [] };
    this.newMessage = this.newMessage.bind(this);
    this.socket = io('http://localhost:3000');
  }
  componentDidMount() {
    const getMessage = (text) => {
      this.setState({ messages: [...this.state.messages, text] });
    };

    this.socket.on('get_message', (text) => {
      getMessage(text);
    });
  }

  newMessage(text) {
    this.socket.emit('send_message', text);
  }

  render() {
    return (
      <div>
        <Chat messages={this.state.messages} onMessage={this.newMessage} />
      </div>
    );
  }
}

export default hot(module)(Root);
