import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Form from '../Form';
import Chat from '../Chat';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      users: [],
      addedUser: false,
      currentUser: null,
    };

    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
    this.socket = io('http://localhost:3000');
  }
  componentDidMount() {
    const getMessage = (data) => {
      this.setState({
        messages: [...this.state.messages, { text: data.text, sender: data.sender }],
      });
    };
    const getUsers = (data) => {
      this.setState({ users: data });
    };

    this.socket.on('get_messages', (data) => {
      getMessage(data);
    });

    this.socket.on('get_users', (data) => {
      getUsers(data);
    });
  }

  newUser(name) {
    this.setState({ currentUser: { name } }, () => {
      this.socket.emit('add_user', name);
      this.setState({ addedUser: true });
    });
  }
  newMessage(text) {
    this.socket.emit('send_message', { text, sender: this.state.currentUser });
  }

  render() {
    const { users, messages, currentUser } = this.state;
    return (
      <div>
        {this.state.addedUser ? (
          <Chat
            users={users}
            currentUser={currentUser}
            messages={messages}
            onMessage={this.newMessage}
          />
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
