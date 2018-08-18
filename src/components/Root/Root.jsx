import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
// import { Router, Link } from '@reach/router';
import './Root.scss';
import jwt from 'jsonwebtoken';
import Chat from '../Chat';
import Clients from '../Clients';
import fetchApi from '../../utils/fetchApi';

import Auth from '../Auth';

class Root extends Component {
  constructor() {
    super();
    const url =
      location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://inchat-back.herokuapp.com';
    this.socket = io(url, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
    this.state = {
      messages: [],
      users: [],
      addedUser: localStorage.getItem('token'),
      currentUser: {},
    };

    this.newMessage = this.newMessage.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    const getMessage = data => {
      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          { text: data.text, sender: data.sender },
        ],
      }));
    };
    const getUsers = data => {
      this.setState({ users: data });
    };

    this.socket.on('get_messages', data => {
      getMessage(data);
    });

    this.socket.on('get_users', data => {
      getUsers(data);
    });

    if (this.state.addedUser) {
      console.log('A');
      this.getCurrentUser().then(res =>
        this.setState(
          { addedUser: true, currentUser: { username: res.username } },
          () => {
            this.socket.emit('add_user', res.email);
          },
        ),
      );
    }
  }

  componentWillUnmount() {}

  getCurrentUser(email) {
    const result = {};
    const decoded = jwt.decode(this.state.addedUser);
    result.email = email || decoded.email;
    return fetchApi(`${url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });
  }

  login = email => {
    this.getCurrentUser(email).then(res =>
      this.setState(
        { addedUser: true, currentUser: { username: res.username } },
        () => {
          this.socket.emit('add_user', email);
        },
      ),
    );
  };

  newMessage(text) {
    this.socket.emit('send_message', { text, sender: this.state.currentUser });
  }

  render() {
    const { users, messages, currentUser, addedUser } = this.state;
    return (
      <main>
        {addedUser ? (
          <React.Fragment>
            <Clients currentUser={currentUser} users={users} />
            <Chat
              currentUser={currentUser}
              messages={messages}
              newMessage={this.newMessage}
            />
          </React.Fragment>
        ) : (
          <Auth login={this.login} />
        )}
      </main>
    );
  }
}

export default hot(module)(Root);
