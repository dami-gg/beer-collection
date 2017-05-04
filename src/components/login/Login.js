import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {reduxForm} from 'redux-form';
import firebase from 'firebase'

import Button from '../button/Button';
import FormField from '../form-field/FormField';
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
                    <FormField
                        name="username"
                        placeholder="Username">
                    </FormField>
                    <FormField
                        name="password"
                        placeholder="Password">
                    </FormField>
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

export default withRouter(connect(mapStateToProps)(reduxForm({form: 'login'})(Login)));
