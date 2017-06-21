// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Button from '../common/button/Button';

import logo from '../../assets/images/logo.png';
import './header.scss';

import {logout} from '../../helpers/authentication.helpers';

export class Header extends Component {
  render() {
    return (
        <div className="header">
          <Link to="/" className="logo-container">
            <div className="logo">
              <img src={logo} alt="logo" height="30px" width="25px"/>
            </div>
            <span className="title">Beer collection</span>
          </Link>
          {
            this.props.user &&

            <div className="logout">
              <Button color="red"
                      onClick={logout}>
                Logout
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

export default connect(
    mapStateToProps
)(Header);

