import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { TemporaryDrawer } from './leftDrawer.js'

export default class header extends Component {
  render() {
    return (
      //   <div>
      //     <NavLink to="/">Home</NavLink>

      //     <NavLink to="/playlist">Playlist</NavLink>
      //     <NavLink to="/login">Login</NavLink>
      //     <NavLink to="/signup">Signup</NavLink>
      //     <button onClick={this.props.handleLogout}>Sign out</button>
      //   </div>

      <div>
        <TemporaryDrawer/>
        <NavLink to="/profile">My Profile</NavLink>
        <NavLink to="/">Home</NavLink>
        {this.props.user && this.props.user.token && (
          <>
            <NavLink to="/playlist">Playlists</NavLink>
            <button onClick={this.props.handleLogout}>Sign out</button>
          </>
        )}
        {(!this.props.user || !this.props.user.token) && (
          <>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
    );
  }
}
