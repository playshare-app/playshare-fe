import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Login } from './login.js';
import { Signup } from './signup.js';
import Profile from './profile.js';
import Playlist from './Playlist.js';
import About from './AboutUs.js';
import Spotify from './spotify.js';
// import Plants from './Search/plants.js';
// import Favorites from './Favorites/favoriteList.js';
import Home from './home.js';
import Header from './header.js';
import PrivateRoute from './PrivateRoute.js';
import { TemporaryDrawer } from './leftDrawer.js'


import {
  getUserFromLocalStorage,
  putUserInLocalStorage
} from './local-storage-utils';

export default class App extends React.Component {
  state = {
    user: getUserFromLocalStorage()
  };

  handleUserChange = (user) => {
    this.setState({ user });

    putUserInLocalStorage(user);
  };

  handleLogout = () => {
    this.handleUserChange();

    localStorage.clear();

    window.location.replace('/login');
  };

   // seems like these redirects could have been defined in the components instead of being passed down, since there's no dependence on parent state in these functions

  redirectHome = () => { 
    window.location.replace('/')
  }

  redirectMyProfile = () => { 
    window.location.replace('/profile')
  }

  redirectPlaylists = () => { 
    window.location.replace('/playlist')
  }

  redirectToSignUp = () => { 
    window.location.replace('/signup')
  }

  redirectToAboutUs = () => { 
    window.location.replace('/about')
  }

  render() {
    const { user } = this.state;
    return (
      <div className="all-pages">
        <Router>
          <Header user={this.state.user} 
           handleLogout={this.handleLogout}
           redirectHome={this.redirectHome}
           redirectMyProfile={this.redirectMyProfile}
           redirectPlaylists={this.redirectPlaylists}
           redirectToSignUp={this.redirectToSignUp}
           redirectToAboutUs={this.redirectToAboutUs}
         />
          <Switch>
            <PrivateRoute
              path="/profile"
              exact
              token={user && user.token}
              render={(routerProps) => <Profile {...routerProps}
              handleLogout={this.handleLogout}
              redirectHome={this.redirectHome}
              redirectMyProfile={this.redirectMyProfile}
              redirectPlaylists={this.redirectPlaylists}
              redirectToAboutUs={this.redirectToAboutUs} />}
            />
             <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
              <Route
              path="/left"
              exact
              render={(routerProps) => <TemporaryDrawer {...routerProps}
              // seems like these redirects could have been defined in the components instead of being passed down, since there's no dependence on parent state in these functions
              handleLogout={this.handleLogout}
              redirectHome={this.redirectHome}
              redirectMyProfile={this.redirectMyProfile}
              redirectPlaylists={this.redirectPlaylists}
              redirectToSignUp={this.redirectToSignUp}
              redirectToAboutUs={this.redirectToAboutUs}
             />}
            />
            <Route
              path="/spotify"
              exact
              render={(routerProps) => <Spotify {...routerProps} />}
            />
            <PrivateRoute
              path="/playlist"
              exact
              token={user && user.token}
              render={(routerProps) => <Playlist {...routerProps} />}
              user={this.state.user}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) => (
                <Login
                  handleUserChange={this.handleUserChange}
                  {...routerProps}
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={(routerProps) => (
                <Signup
                  handleUserChange={this.handleUserChange}
                  {...routerProps}
                />
              )}
            />
            <Route
              path="/about"
              exact
              render={(routerProps) => (
                <About
                  handleUserChange={this.handleUserChange}
                  {...routerProps}
                />
              )}
            />
          </Switch>
        </Router>
        <footer></footer>
      </div>
    );
  }
}
