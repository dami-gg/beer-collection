// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import firebase from 'firebase';

import './header.scss';
import {Button} from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

class Header extends Component {
  navigateToHome():void {
    hashHistory.push('/');
  }

  logout():void {
    firebase.auth().signOut()
        .then(() => hashHistory.push('/'))
        .catch();
  }

  render() {
    return (
        <div className="header">
          <div className="logo-container" onClick={this.navigateToHome}>
            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>
            <span className="title">Beer collection</span>
          </div>
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

