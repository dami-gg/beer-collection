import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import firebase from 'firebase'

import Button from '../button/Button';
import Spinner from '../spinner/Spinner';
import type {User} from '../../types';
import {startAuthentication, isAuthenticating} from '../../utils';

import './login.scss';

class Login extends Component {
  props: {
    user: User,
    match: Object,
    location: Object,
    history: Object,
    authenticating: boolean,
    authenticate: Function
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

    startAuthentication();

    firebase.auth().signInWithRedirect(provider);
  }

  render() {
    return (
        <div className="login">
          {
            isAuthenticating() ? <Spinner></Spinner> :

                <div className="login__box">
                  <form className="login__form">
                    <p className="login__form__title">Please sign in</p>
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/>
                    <Button color="green"
                            classes="button--sign-in"
                            type="submit">
                      Sign in
                    </Button>
                  </form>

                  <Button color="blue"
                          onClick={this.handleAuthenticationWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
          }
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
