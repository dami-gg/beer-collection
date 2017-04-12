import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import firebase from 'firebase'

import type {User} from '../../types/types';
import {logUserIn} from '../../actions';

import './login.scss';

class Login extends Component {
  props: {
    user: User,
    logUserIn: Function,
    match: Object,
    location: Object,
    history: Object
  };

  componentWillMount() {
    this.checkIfAuthenticated();
  }

  componentDidMount() {
    this.startAuthenticationListener();
  }

  componentDidUpdate() {
    this.checkIfAuthenticated();
  }

  checkIfAuthenticated() {
    if (this.props.user) {
      this.redirectHome();
    }
  }

  redirectHome() {
    this.props.history.push('/');
  }

  handleAuthenticationWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);
  }

  login(user: User) {
    this.props.logUserIn(user);
  }

  startAuthenticationListener() {
    firebase.auth().onAuthStateChanged(user => (user) ? this.login(user) : null);
  }

  render() {
    return (
        <div>
          {
            !this.props.user &&

            <div className="login">
              <div className="login__box">
                <form className="login__form">
                  <p className="login__form__title">Please sign in</p>
                  <input type="text" placeholder="Username"/>
                  <input type="password" placeholder="Password"/>
                  <input type="submit" value="Sign in"
                         className="btn btn-success btn--sign-in"/>
                </form>

                <div className="btn btn-primary"
                     onClick={this.handleAuthenticationWithGoogle}>
                  Sign in with Google
                </div>
              </div>
            </div>
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.navigation.user
});

const mapDispatchToProps = dispatch => {
  return {
    logUserIn: (user: User) => {
      dispatch(logUserIn(user));
    },
  }
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);
