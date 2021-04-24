import React, { Component } from 'react';
import { TemporaryDrawer } from './leftDrawer.js'

// seems like you could have added a div to your Drawer component instead of having this Header passthrough component
export default class Header extends Component {
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
