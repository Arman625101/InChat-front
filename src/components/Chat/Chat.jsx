import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-array-index-key */
const Chat = ({ users }) => <ul>{users.map((user, index) => <li key={index}>{user.name}</li>)}</ul>;
/* eslint-enable */
Chat.propTypes = {
  users: PropTypes.arrayOf(String).isRequired,
};

export default Chat;
