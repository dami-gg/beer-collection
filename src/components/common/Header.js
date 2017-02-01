import React, {Component} from 'react';
import {hashHistory} from 'react-router';

import './header.scss';
import logo from '../../assets/images/logo.png';

class Header extends Component {
  navigateToHome() {
    hashHistory.push('/');
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
        </div>
    );
  }
}

export default Header;
