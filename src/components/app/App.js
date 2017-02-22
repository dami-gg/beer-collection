import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

import Header from '../common/Header';
import RouteHandler from '../common/RouteHandler';
import Login from '../login/Login';

import {logUserIn, logUserOut} from '../../actions';

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.logUserIn(user);
      }
      else {
        this.props.logUserOut();
      }
    });
  }

  handleAccess() {
    return (this.props.user)
        ? (<RouteHandler />)
        : (<Login />);
  }

  render() {
    return (
        <div className="app">
          <Header />
          {this.handleAccess()}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.navigation.user
});

const mapDispatchToProps = dispatch => {
  return {
    logUserIn: (user) => {
      dispatch(logUserIn(user));
    },
    logUserOut: () => {
      dispatch(logUserOut());
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

