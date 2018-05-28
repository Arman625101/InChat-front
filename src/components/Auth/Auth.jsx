import React, { Component } from 'react';
import RegForm from './Register';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <RegForm />;
  }
}

export default Auth;
