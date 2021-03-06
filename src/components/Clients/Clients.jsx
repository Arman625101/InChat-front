import React from 'react';
import PropTypes from 'prop-types';
import './Clients.scss';

const Clients = ({ users, currentUser }) => (
  <div className="online_users">
    <h1>Online users</h1>
    <ul>
      {users.map((user, i) => (
        <li
          className={user.name === currentUser.username ? 'active' : ''}
          key={i}
        >
          {user.name}
        </li>
      ))}
    </ul>
  </div>
);

Clients.propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
  currentUser: PropTypes.objectOf(String).isRequired,
};

export default Clients;
