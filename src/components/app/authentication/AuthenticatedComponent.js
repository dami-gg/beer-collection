// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import type { User } from "../../../types/user.types";

type Props = {
  user: User,
  match: Object,
  location: Object,
  history: Object
};

export default function Authenticated(OriginalComponent: any) {
  class AuthenticatedComponent extends Component<Props> {
    componentWillMount() {
      this.checkIfUnauthenticated();
    }

    componentDidUpdate() {
      this.checkIfUnauthenticated();
    }

    checkIfUnauthenticated() {
      if (!this.props.user) {
        this.redirectHome();
      }
    }

    redirectHome() {
      this.props.history.push("/login");
    }

    render() {
      return (
        <div>{this.props.user && <OriginalComponent {...this.props} />}</div>
      );
    }
  }

  const mapStateToProps = state => ({
    user: state.authentication.user
  });

  return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
}
