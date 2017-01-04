import React, {Component} from 'react';

import './header.scss';
import logo from '../../assets/images/logo.png';

class Header extends Component {
  render() {
    return (
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
          <span className="title">Beer<br/>collection</span>
        </div>
    );
  }
}

export default Header;
