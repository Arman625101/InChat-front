import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import Form from '../Form';
import Chat from '../Chat';

const socket = io('http://localhost:3000');

class Root extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.newUser = this.newUser.bind(this);
  }
  newUser(name) {
    socket.emit('user', name, { for: 'everyone' });
    socket.on('user', this.setState({ users: [...this.state.users, { name }] }));
  }
  render() {
    return (
      <div>
        {this.state.users.length ? (
          <Chat users={this.state.users} />
        ) : (
          <Form onNewUser={this.newUser} />
        )}
      </div>
    );
  }
}

export default hot(module)(Root);
