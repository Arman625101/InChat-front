import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import Form from '../Form';
import Chat from '../Chat';

const socket = io('http://localhost:3000');

class Root extends Component {
  constructor() {
    super();
    this.state = { users: [], addedUser: false };
    this.newUser = this.newUser.bind(this);
  }
  newUser(username) {
    socket.emit('add user', username);
    socket.on('add user', this.setState({ addedUser: true }));
    socket.on('users', (users) => {
      this.setState({ users }, () => console.log(this.state.users));
    });
  }
  render() {
    return (
      <div>
        {this.state.addedUser ? (
          <Chat users={this.state.users} />
        ) : (
          <Form onNewUser={this.newUser} />
        )}
      </div>
    );
  }
}

export default hot(module)(Root);
