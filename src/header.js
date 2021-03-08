import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class header extends Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <button>Sign Out</button>
      </div>
    );
  }
}
