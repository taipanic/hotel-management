import React, {useState, useEffect} from 'react';

export default function User({currentUser, updateCurrentUser}) {
  console.log(currentUser);
  return (
    <div>
      <ul className="navbar-nav">
      {currentUser?
      <span>
        <li>
          <button>Logout</button>
        </li>
      </span>:
      <span>
        <li className="nav-item active">
          <button>Login</button>
        </li>
        <li className="nav-item">
          <button>Signup</button>
        </li>
      </span>
      }
      </ul>
    </div>
  );
}