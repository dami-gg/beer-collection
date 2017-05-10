// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import Button from '../common/button/Button';

import logo from '../../assets/images/logo.png';
import './header.scss';

export class Header extends Component {
  logout():void {
    firebase.auth().signOut();
  }

  render() {
    return (
        <div className="header">
          <Link to="/" className="logo-container">
            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>
            <span className="title">Beer collection</span>
          </Link>
          {
            this.props.user &&

            <div className="logout">
              <Button color="red"
                      onClick={this.logout}>
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

