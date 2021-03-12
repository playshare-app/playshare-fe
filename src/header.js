import React, { Component } from 'react';
import { TemporaryDrawer } from './leftDrawer.js'

export default class header extends Component {
  render() {
    
    return (

      <div>
        <TemporaryDrawer
        handleLogout={this.props.handleLogout}
        redirectHome={this.props.redirectHome}
        redirectMyProfile={this.props.redirectMyProfile}
        redirectPlaylists={this.props.redirectPlaylists}
        redirectToSignUp={this.props.redirectToSignUp}
        redirectToAboutUs={this.props.redirectToAboutUs}
        />
      </div>
    );
  }
}
