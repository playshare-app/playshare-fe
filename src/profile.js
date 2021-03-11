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
    playlist: [], //SPOTIFY ARRAY - fetchSpotifyPlaylist
    publicPlaylist: [], //PUBLIC ARRAY - publicPlaylistFetch
    personalPublic: [], //PERSONAL PUBLIC ARRAY - 
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
      width: '100%',
      height: 300
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'

    return (
      <div className="App">
        <header className="App-header">
        <div>SPOTIFY LIST</div>
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

                        <p>{
                        this.isAlreadyShared(songList) 
                            ? '<3' 
                            : <button onClick={() => this.handleSubmit(songList)}>Share!</button>
                        }</p>
              </div>
            ))}


            <div>PRIVATE LIST</div>
            {this.state.personalPublic.map((songList) => (
              <div key={songList.name}>
                <div>{songList.name}</div>
                <button onClick={() => this.handleDelete(songList.id)}>
                  Delete Publicly
                </button>
              </div>
            ))}   
        </header>
      </div>
    );
  }
}
