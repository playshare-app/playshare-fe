import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import { getPublicPlaylists } from './api-utils.js';
import { getUserFromLocalStorage } from './local-storage-utils.js';
import { CommentBox } from './leaveComment.js';

export default class Playlist extends Component {
  state = {
    publicPlaylist: [],
    user: getUserFromLocalStorage(),
    comment: '',
  };

  componentDidMount = async () => {
    const publicPlaylist = await getPublicPlaylists(this.state.user.token);

    this.setState({ publicPlaylist });
  };

  render() {
    const size = {
      width: 'small',
      height: 200
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'
    return (
      <div className="public-playlists">
        {this.state.publicPlaylist.map((songList) => (
          <div className="public-playlist-item" key={songList.uri}>
          <div className="playlist-name">{songList.name}</div>
            <div className="owner-name">Posted By: {songList.owner_name}</div>
            <SpotifyPlayer
              uri={songList.uri}
              size={size}
              view={view}
              theme={theme}
              />
              <div>
               <CommentBox />  
               </div>
          </div>
        ))}
      </div>
    );
  }
}
