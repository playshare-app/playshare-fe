import React, { Component } from 'react';
import hash from './hash.js';
export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '39c212be9cbf4cffae633afcac06a90f';
const redirectUri = 'http://localhost:3001/';
const scopes = ['playlist-read-private', 'playlist-read-collaborative'];

export default class Spotify extends Component {
  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      localStorage.setItem('token', _token);
      this.setState({
        token: _token
      });
    }
  }

  render() {
    return (
      <div>
        {
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              '%20'
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        }
      </div>
    );
  }
}
