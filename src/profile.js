import React, { Component } from 'react';
import { getPlaylists } from './api-utils';
import './App.css';
import SpotifyPlayer from 'react-spotify-player';
import { addPublicPlaylist, getPublicPlaylists } from './api-utils.js';
import {
  getUserFromLocalStorage,
  getSpotifyTokenFromLocalStorage
} from './local-storage-utils.js';
import hash from './hash.js';

export default class Profile extends Component {
  state = {
    token: getSpotifyTokenFromLocalStorage(),
    user: getUserFromLocalStorage(),
    name: ' ',
    uri: ' ',
    playlist_id: ' ',
    owner_name: ' ',
    playlist: []
  };

  fetchPlaylist = async () => {
    const playlist = await getPlaylists(this.state.token);
    const playListItems = playlist.items;
    this.setState({ playlist: playListItems });
    console.log(playlist);
  };

  componentDidMount() {

    this.setState({
      token: getSpotifyTokenFromLocalStorage()
    })

    this.fetchPlaylist();
    
  }

  publicPlaylistFetch = async () => {
    const publicPlaylist = await getPublicPlaylists(this.state.user.token);

    this.setState({ publicPlaylist });
  };

  handleSubmit = async (songList) => {
    await addPublicPlaylist(
      {
        name: songList.name,
        uri: songList.uri,
        playlist_id: songList.id,
        owner_name: songList.owner.display_name
      },
      this.state.user.token
    );
    console.log(songList);
    await this.publicPlaylistFetch();
  };

  render() {
    const size = {
      width: '100%',
      height: 300
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'

    return (
      <div className="App">
        <header className="App-header">
          {/* {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                '%20'
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )} */}

          {this.state.token &&
            this.state.playlist.map((songList) => (
              <div key={songList.uri}>
                <div>{songList.name}</div>
                <SpotifyPlayer
                  uri={songList.uri}
                  size={size}
                  view={view}
                  theme={theme}
                />
                <button onClick={() => this.handleSubmit(songList)}>
                  Share!
                </button>
              </div>
            ))}
        </header>
      </div>
    );
  }
}

