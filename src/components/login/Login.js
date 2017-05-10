// @flow
import type {User} from '../../types/user.types';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {reduxForm} from 'redux-form';

import Button from '../common/button/Button';
import FormField from '../common/form-field/FormField';
import Spinner from '../common/spinner/Spinner';
import {isAuthenticating, handleAuthenticationWithGoogle} from '../../helpers/authentication.helpers';

import './login.scss';

export class Login extends Component {
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
                          onClick={handleAuthenticationWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
          }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(reduxForm({form: 'login'})(Login)));
