import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Form from '../Form';
import Chat from '../Chat';

class Root extends Component {
  constructor() {
    super();
    this.state = { messages: [], users: [], addedUser: false };

    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
    this.socket = io('http://localhost:3000');
  }
  componentDidMount() {
    const getMessage = (text) => {
      this.setState({ messages: [...this.state.messages, text] });
    };
    const getUsers = (data) => {
      this.setState({ users: data });
    };

    this.socket.on('get_messages', (text) => {
      getMessage(text);
    });

    this.socket.on('get_users', (data) => {
      getUsers(data);
    });
  }

  newUser(user) {
    this.socket.emit('add_user', user);
    this.setState({ addedUser: true });
  }
  newMessage(text) {
    this.socket.emit('send_message', text);
  }

  render() {
    const { users, messages } = this.state;
    return (
      <div>
        {this.state.addedUser ? (
          <Chat users={users} messages={messages} onMessage={this.newMessage} />
        ) : (
          <Form onUser={this.newUser} />
        )}
      </div>
    );
  }
}

Root.propTypes = {
  // users: PropTypes.arrayOf(Object).isRequired,
  // messages: PropTypes.arrayOf(Object).isRequired,
};

export default hot(module)(Root);
