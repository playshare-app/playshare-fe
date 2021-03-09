import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';

import { getPublicPlaylists } from './api-utils.js';
import { getUserFromLocalStorage } from './local-storage-utils.js';

export default class Playlist extends Component {
  state = {
    publicPlaylist: [],
    user: getUserFromLocalStorage()
  };

  componentDidMount = async () => {
    const publicPlaylist = await getPublicPlaylists(this.state.user.token);

    this.setState({ publicPlaylist });
  };

  render() {
    const size = {
      width: '100%',
      height: 300
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'
    return (
      <div className="main-image">
        {this.state.publicPlaylist.map((songList) => (
          <div key={songList.uri}>
            <div>{songList.name}</div>
            <SpotifyPlayer
              uri={songList.uri}
              size={size}
              view={view}
              theme={theme}
            />
          </div>
        ))}
      </div>
    );
  }
}
