// @flow
import type { User } from "../../types/user.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../common/button/Button";

import Logo from "../common/logo/Logo";
import { logout } from "../../helpers/authentication.helpers";

import "./header.scss";

type Props = {
  user: User
};

export class Header extends Component<Props> {
  render() {
    return (
      <div className="header">
        <Link to="/" className="logo-container">
          <Logo collapsed={true} />
        </Link>
        {this.props.user && (
          <div className="logout">
            <Button color="red" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(Header);
