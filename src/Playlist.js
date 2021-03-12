
import React, {Component} from 'react';
import SpotifyPlayer from 'react-spotify-player';

import {getPublicPlaylists, postComment, getPublicComments} from './api-utils.js';
import {getUserFromLocalStorage} from './local-storage-utils.js';

export default class Playlist extends Component {
  state = {
    publicPlaylist: [],
    user: getUserFromLocalStorage(),
    comments: [],
    comment_test: '',
    user_email: '',
    playlistid: '',


  };

  componentDidMount = async () => {
    const publicPlaylist = await getPublicPlaylists(this.state.user.token);

    this.setState({publicPlaylist});
    console.log(publicPlaylist, 'PUBLICCCC PLAYLIST ARRAY')

    this.publicCommentsFetch();
  };

  
  publicCommentsFetch = async () => {
    const comments = await getPublicComments(this.state.user.token);
    console.log(comments, 'PUBLICCCC COMMENTS ARRAY')


    this.setState({comments});
  };

  
  handleSubmit = async e => {
    e.preventDefault();

    await postComment(
      {
        comment_test: this.state.comment_test,
        user_email: this.state.user.email,
        playlistid: this.state.playlistid,
      }
    );
    await this.publicCommentsFetch();

    this.setState({comment_test: '', user_email: '', playlistid: '', })
  };

  render () {
    const size = {
      width: 'small',
      height: 200
    };
    const view = 'list'; 
    const theme = 'black'; 
    return (
      <div>
      <div className="title">
        <img src="https://fontmeme.com/permalink/210312/6847b66bfa54400b4f3bf65788732566.png" alt="mexcellent-font" border="0"/>
       </div>
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
          </div>

        ))}   

        
      </div>
      </div>
    );
  }
}
