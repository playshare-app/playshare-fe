import React, { Component } from 'react'
import { getPlaylists } from './api-utils';
import hash from './home';


export default class Playlist extends Component {

    state = {
        playlist: [],
        token: ''
      };

    componentDidMount(){
        let _token = hash.access_token;
        if (_token) {
            localStorage.setItem('token', _token);
            // Set token
            this.setState({
              token: _token
            });
            console.log(_token, 'TOKEN')
            getPlaylists(_token);
          }
    }

    fetchVideos = async () => {
        const playlist = await getPlaylists(hash.access_token);
        console.log(playlist, 'PLAYLIST')
        this.setState({ playlist });
    }


    render() {
        return (
            <div className="main-image">
                PLAYLIST
            </div>
        )
    }
};
