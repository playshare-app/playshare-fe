import { AddComment } from '@material-ui/icons';
import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';

import { getPublicPlaylists, postComment, getPublicComments } from './api-utils.js';
import { getUserFromLocalStorage } from './local-storage-utils.js';

export default class Playlist extends Component {
  state = {
    publicPlaylist: [],
    user: getUserFromLocalStorage(),
    comments: [],
    comment_test:'',
    user_email: '',
    playlistid:'',


  };

  componentDidMount = async () => {
    const publicPlaylist = await getPublicPlaylists(this.state.user.token);

    this.setState({ publicPlaylist });
    console.log(publicPlaylist, 'PUBLICCCC PLAYLIST ARRAY')

    this.publicCommentsFetch();
  };

  //COMMENTS =====
  publicCommentsFetch = async () => {
    const comments = await getPublicComments(this.state.user.token);
    console.log(comments, 'PUBLICCCC COMMENTS ARRAY')


    this.setState({ comments });
  };

  //comment_test, user_email, playlistid
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

    this.setState({ comment_test: '', user_email: '', playlistid: '', })
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
{/* <input> </input> */} 
{/* .filter for comments that match the playlist ID
          chain together filters and maps 
    //filter  */}

    <div style={{color: 'white'}}>COMMENTS:</div> 
            {this.state.comments.map( booger => 
              <p 
              key={`${booger.comment_test}-${booger.id}`} 
              onClick={() => this.handleSubmit(booger.id)} style={{color: 'white'}}>    
              {booger.comment_test}
          </p>
            )}   

            {/* <div>COMMENTS</div>
            {this.state.comments.map((booger) => (
              <div key={booger.playlistid}>
                <div style={{color: 'white'}}>{booger.comment_test}</div>
                <button onClick={() => this.handleSubmit(booger)}>
                  submit comment
                </button>
              </div>
            ))}  */}
      </div>
    );
  }
}
