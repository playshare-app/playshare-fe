import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './login.js';
import Signup from './signup.js';
import Home from './home.js';
// import Plants from './Search/plants.js';
// import Favorites from './Favorites/favoriteList.js';
import Header from './header.js';
// import PrivateRoute from './Components/private-route.js';
// import {
//   getUserFromLocalStorage,
//   putUserInLocalStorage
// } from './local-storage-utils';

export default class App extends React.Component {
  state = {
    user: ''
  };

  // handleUserChange = (user) => {
  //   this.setState({ user });

  //   putUserInLocalStorage(user);
  // };

  // handleUserLogout = () => {
  //   this.handleUserChange();
  // };

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
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
