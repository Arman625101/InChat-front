import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
// import { Router, Link } from '@reach/router';
import './Root.scss';
import Chat from '../Chat';
import Clients from '../Clients';
import fetchApi from '../../utils/fetchApi';

import Auth from '../Auth';

class Root extends Component {
  constructor() {
    super();
    this.socket = io('http://localhost:3000');
    this.state = {
      messages: [],
      users: [],
      addedUser: !!localStorage.getItem('token'),
      currentUser: {},
    };

    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    const getMessage = (data) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, { text: data.text, sender: data.sender }],
      }));
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
    this.counter = 0;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  newUser = (email) => {
    fetchApi(`${url}/user/${email}`).then(res => console.log(res));
    setTimeout(() => {
      this.setState({ addedUser: true, currentUser: { email } }, () => {
        this.socket.emit('add_user', email);
      });
    }, 1);
  };

  newMessage(text) {
    this.socket.emit('send_message', { text, sender: this.state.currentUser });
  }

  render() {
    const {
      users, messages, currentUser, addedUser,
    } = this.state;
    return (
      <main>
        {addedUser && (
          <React.Fragment>
            <Clients currentUser={currentUser} users={users} />
            <Chat currentUser={currentUser} messages={messages} newMessage={this.newMessage} />
          </React.Fragment>
        )}
        {!addedUser && <Auth newUser={this.newUser} />}
      </main>
    );
  }
}

export default hot(module)(Root);
