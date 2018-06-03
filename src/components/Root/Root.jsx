import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import { Router, Link } from '@reach/router';
import './Root.scss';
import Chat from '../Chat';
import Clients from '../Clients';

import Auth from '../Auth';

class Root extends Component {
  constructor() {
    super();
    this.socket = io('http://localhost:3000');
    this.state = {
      messages: [],
      users: [],
      addedUser: localStorage.getItem('token'),
      currentUser: {},
    };

    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
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
      <main>
        <Router>
          {this.state.addedUser ? (
            <React.Fragment>
              <Clients currentUser={currentUser} users={users} />
              <Chat currentUser={currentUser} messages={messages} newMessage={this.newMessage} />
            </React.Fragment>
          ) : (
            <Auth />
          )}
        </Router>
      </main>
    );
  }
}

export default hot(module)(Root);
