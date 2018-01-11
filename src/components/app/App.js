// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "../header/Header";
import { routes } from "./routes";
import { logUserIn, logUserOut } from "../../actions/authentication.actions";
import {
  completeAuthentication,
  startAuthenticationListener
} from "../../helpers/authentication.helpers";

import type { User } from "../../types/user.types";

import "./app.scss";

type Props = {
  user: User,
  logUserIn: Function,
  logUserOut: Function,
  match: Object,
  location: Object,
  history: Object
};

export class App extends Component<Props> {
  login: Function;
  logout: Function;

  constructor(props: Object) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    startAuthenticationListener(this.login, this.logout);
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
