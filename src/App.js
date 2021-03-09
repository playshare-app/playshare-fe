import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './login.js';
import Signup from './signup.js';
import Home from './home.js';
import Playlist from './Playlist.js';
// import Plants from './Search/plants.js';
// import Favorites from './Favorites/favoriteList.js';
import Header from './header.js';
// import PrivateRoute from './Components/private-route.js';
import {
  getUserFromLocalStorage,
  putUserInLocalStorage
} from './local-storage-utils';

export default class App extends React.Component {
  state = {
    user: getUserFromLocalStorage()
  }

  handleUserChange = (user) => {
    this.setState({ user })
    
    putUserInLocalStorage(user);
  }

  handleLogout = () => {
    this.handleUserChange();
    localStorage.clear();
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Router>
          <Header user={ user } />        
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route 
              path="/playlist"
              exact
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
          </Switch>
        </Router>
        <footer></footer>
      </div>
    );
  }
}
