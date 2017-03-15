// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import './header.scss';
import {Button} from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

class Header extends Component {
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
              <Button bsStyle="danger"
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
  user: state.navigation.user
});

export default connect(
    mapStateToProps
)(Header);

