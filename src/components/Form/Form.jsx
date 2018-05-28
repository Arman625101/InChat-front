import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import './Form.scss';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.trim()) {
      this.props.newUser(this.state.name.trim());
      this.setState({ name: '' });
    }
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inp_holder">
          <input
            value={this.state.name}
            type="text"
            placeholder="username"
            onChange={this.handleChange}
          />
          <button onSubmit={this.handleSubmit}>
            <MdArrowForward />
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  newUser: PropTypes.func.isRequired,
};

export default Form;
