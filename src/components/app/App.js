import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import firebase from 'firebase'

import Header from '../header/Header';
import {routes} from './routes';
import {logUserIn, logUserOut} from '../../actions/authentication.actions';
import {completeAuthentication} from '../../utils/authentication';

import type {User} from '../../types/user.types';

import './app.scss';

export class App extends Component {
  props: {
    user: User,
    logUserIn: Function,
    logUserOut: Function,
    match: Object,
    location: Object,
    history: Object
  };

  componentWillMount() {
    this.startAuthenticationListener();
  }

  startAuthenticationListener() {
    firebase.auth().onAuthStateChanged(user => user ? this.login(user) : this.logout());
  }

  login(user: User) {
    this.props.logUserIn(user);
    completeAuthentication();
  }

  logout() {
    this.props.logUserOut();
  }

  render() {
    return (
        <Router>
          <div className="app">
            <Header />
            {routes}
          </div>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user
});

const mapDispatchToProps = dispatch => {
  return {
    logUserIn: (user: User) => {
      dispatch(logUserIn(user));
    },
    logUserOut: () => {
      dispatch(logUserOut());
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(App);

