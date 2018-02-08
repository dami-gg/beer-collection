// @flow
import type { User } from "../../types/user.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Button from "../common/button/Button";
import Logo from "../common/logo/Logo";
import Spinner from "../common/spinner/Spinner";
import {
  isAuthenticating,
  handleAuthenticationWithGoogle
} from "../../helpers/authentication.helpers";

import "./login.scss";

type Props = {
  user: User,
  match: Object,
  location: Object,
  history: Object,
  authenticating: boolean,
  authenticate: Function
};

export class Login extends Component<Props> {
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
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="login">
        {isAuthenticating() ? (
          <Spinner />
        ) : (
          <div className="login__box">
            <div className="teaser-wrapper">
              <Logo />
            </div>

            <div className="button-wrapper">
              <Button color="blue" onClick={handleAuthenticationWithGoogle}>
                Sign in with Google
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(Login));
