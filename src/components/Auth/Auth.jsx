import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Auth.scss';
import RegForm from './Register';
import LogForm from './Login';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: 'register',
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleForm = type => () => {
    this.setState({ formType: type });
  };

  handleLogin = email => {
    this.props.login(email);
  };

  render() {
    const { formType } = this.state;
    return (
      /* eslint-disable */
      <div className="auth">
        <ul>
          <li
            className={formType === 'register' ? 'active' : ''}
            onClick={this.handleForm('register')}
          >
            Register
          </li>
          <li
            className={formType === 'login' ? 'active' : ''}
            onClick={this.handleForm('login')}
          >
            Login
          </li>
        </ul>
        {formType === 'register' ? (
          <RegForm login={this.handleLogin} />
        ) : (
          <LogForm login={this.handleLogin} />
        )}
      </div>
      /* eslint-enable */
    );
  }
}

Auth.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Auth;
