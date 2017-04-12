import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import firebase from 'firebase'

import type {User} from '../../types/types';

import './login.scss';

class Login extends Component {
  props: {
    user: User,
    match: Object,
    location: Object,
    history: Object
  };

  componentWillMount() {
    this.checkIfAuthenticated();
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

    // TODO Show loading icon after pressing button till getting result? (firebase.auth().getRedirectResult())
  }

  render() {
    return (
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.navigation.user
});

export default withRouter(
    connect(mapStateToProps)(Login)
);
