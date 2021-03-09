import React, { Component } from 'react';
// import hash from "./hash";
// import Playlist from './Playlist'
import { getPlaylists } from './api-utils';
import './App.css';
import SpotifyPlayer from 'react-spotify-player';
import {  addPublicPlaylist, getPublicPlaylists } from './api-utils.js';
import {  getUserFromLocalStorage} from './local-storage-utils.js';


export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '39c212be9cbf4cffae633afcac06a90f';
const redirectUri = 'http://localhost:3001/';
const scopes = ['playlist-read-private', 'playlist-read-collaborative'];
// Get the hash of the url
export const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    
    return initial;
  }, {});
window.location.hash = '';

class home extends Component {
  state = {
    token: '',
    user: getUserFromLocalStorage(),
    name: ' ',
    uri: ' ',
    playlist_id: ' ',
    owner_name: ' ',
    playlist:[]
  };

  fetchPlaylist = async () => {
    const playlist = await getPlaylists(hash.access_token);
    // console.log(playlist);
    // console.log(playlist.items, 'PLAYLIST')
    const playListItems = playlist.items;
    this.setState({ playlist: playListItems });
    console.log(playlist);
}

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      //setting local storage token
      localStorage.setItem('token', _token);
      // Set token
      this.setState({
        token: _token
      });
      //this is where playlist GET would be
      this.fetchPlaylist();
      
    }
  }

//   handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       await addPublicPlaylist(  
//       {
//         name: this.state.playlist.name,
//         uri: this.state.playlist.uri,
//         playlist_id: this.state.playlist.id,
//         owner_name: this.state.playlist.owner.display_name,
//       }, this.user.token)
//     } catch(e) { 
//         this.setState({ error: 'Uh oh, please login to add this to your favorites.' })
//     }

// }

publicPlaylistFetch = async () => {
  const publicPlaylist = await getPublicPlaylists(this.user.token);

  this.setState({ publicPlaylist })
}

handleSubmit = async (e) => {
  e.preventDefault()
  await addPublicPlaylist(  
          {
            name: this.state.songList.name,
            uri: this.state.songList.uri,
            playlist_id: this.state.songList.id,
            owner_name: this.state.songList.display_name,
          }, this.state.user.token)
          console.log(this.state.songList.name);
  await this.publicPlaylistFetch();

}



  render() {
    const size = {
      width: '100%',
      height: 300,
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'


    return (
      <div className="App">
        <header className="App-header">
         
        
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
        
          {this.state.token && (
        // Spotify Player Will Go Here In the Next Step
        this.state.playlist.map( songList =>
          <div>
            <div>{songList.name}</div>
                  <SpotifyPlayer
                    uri={songList.uri}
                    size={size}
                    view={view}
                    theme={theme}
                  />
                  <button onClick={ this.handleSubmit }>Share!</button>
          </div>) 
      )}
        </header>
      </div>
    );
  }
}
export default home;

// http://localhost:3001/#access_token=BQDcmvoHRrwu56WFP5Ste7RUV0hnpVsZf6SYo3kRJcO6_gJ6EDHTFqqGdvgDUro9RF0DbAkqw6_HQ4UVgrrH9BYx2-1U_MrVbEGbk_ORAK2AxdpIGO6p5F1CXb6icgiFrUakNO_teTV1DBtr&token_type=Bearer&expires_in=3600
//              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
