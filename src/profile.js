import React, { Component } from 'react';
import { getPlaylists } from './api-utils';
import './App.css';
import SpotifyPlayer from 'react-spotify-player';
import { addPublicPlaylist, getPublicPlaylists, deletePublicPlaylist, getPublicPlaylistPersonal } from './api-utils.js';
import {
  getUserFromLocalStorage,
  getSpotifyTokenFromLocalStorage
} from './local-storage-utils.js';

export default class Profile extends Component {
  state = {
    token: getSpotifyTokenFromLocalStorage(),
    user: getUserFromLocalStorage(),
    playlist: [], 
    publicPlaylist: [], 
    personalPublic: [], 
  };

  fetchSpotifyPlaylist = async () => {
    const playlist = await getPlaylists(this.state.token);
    const playListItems = playlist.items;
    this.setState({ playlist: playListItems });
    console.log(playlist, 'PLAYLISTTTT')
  };

  componentDidMount() {
    this.setState({
      token: getSpotifyTokenFromLocalStorage()
    });
    
    this.fetchSpotifyPlaylist();
    this.personalPlaylistFetch();
    this.publicPlaylistFetch();
  }

  personalPlaylistFetch = async () => {
    const personalPublic = await getPublicPlaylistPersonal(this.state.user.token);

    this.setState({ personalPublic });
  };

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

    await this.publicPlaylistFetch();
    await this.personalPlaylistFetch();
    
  };


  handleDelete = async (id) => {
    await deletePublicPlaylist(id, this.state.user.token);
    await this.publicPlaylistFetch();
    await this.personalPlaylistFetch();
  };

  isAlreadyShared = (booger) => {
    console.log(this.state.personalPublic, 'PUBLIC')
    const isIsShared = this.state.personalPublic.find(test => test.playlist_id === booger.id);

    return Boolean(isIsShared);
}

  render() {
    const size = {
      width: 'small',
      height: 200
    };
    const view = 'list'; 
    const theme = 'black'; 

    return (
      <div className="App">
        <header className="wrapper">
          <div className="title">
            <img src="https://fontmeme.com/permalink/210312/360b60a659383c9af8f4b5295e92415c.png" alt="mexcellent-font" border="0"/>
            </div>
          <div className = "playlists">
          {this.state.token &&
            this.state.playlist.map((songList) => (
              <div className="playlist-item" key={songList.uri}>
                <div className="playlist-name">{songList.name}</div>
                <SpotifyPlayer
                  uri={songList.uri}
                  size={size}
                  view={view}
                  theme={theme}
                />

                        <p>{
                        this.isAlreadyShared(songList) 
                            ? '🎸  Already Shared  🎸 ' 
                            : <button className= "btn-secondary" onClick={() => this.handleSubmit(songList)}><img src="https://fontmeme.com/permalink/210311/59137af53d9aa87d6ca48a739f509f63.png" alt="mexcellent-font" border="0"/></button>
                        }</p>
              </div>
            ))} </div>


            <div className = "public">
            {this.state.personalPublic.map((songList) => (
              <div className="shared-playlist-item" key={songList.name}>
                <div className="playlist-name">{songList.name}</div>
                <SpotifyPlayer 
                  uri={songList.uri}
                  size={size}
                  view={view}
                  theme={theme}
                /> 
                <div className="button-wrapper">
                  <button className="btn-secondary" onClick={() => this.handleDelete(songList.id)}>
                      <img src="https://fontmeme.com/permalink/210311/c284f126afe899f80c59bcb7f8e1193f.png" alt="mexcellent-font" border="0"/>
                  </button>
                </div>
              </div>
            ))}  </div>
        </header>
      </div>
    );
  }
}
