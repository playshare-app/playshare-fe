import React, { Component } from 'react';
import { signUpUser } from './api-utils';

export default class login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleEmailChange = (e) => this.setState({ email: e.target.value });

  handlePasswordChange = (e) => this.setState({ password: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = await signUpUser(this.state.email, this.state.password);
      console.log(user);
      this.props.handleUserChange(user);
      this.props.history.push('/spotify');
    } catch (e) {
      this.setState({ error: e.response.body });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type="email"
          ></input>
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type="password"
          ></input>
          <button>Spotify Login</button>
        </form>
      </div>
    );
  }
}
