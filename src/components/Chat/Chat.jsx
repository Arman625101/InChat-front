import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-array-index-key */
const Chat = ({ users }) => <ul>{users.map((user, i) => <li key={i}>{user}</li>)}</ul>;
/* eslint-enable */
Chat.propTypes = {
  users: PropTypes.arrayOf(String).isRequired,
};

export default Chat;
