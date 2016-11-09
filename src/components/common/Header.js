import React, {Component} from 'react';

import logo from '../../assets/images/logo.svg';

class Header extends Component {
  render() {
    return (
        <div className="header">
          <img src={logo} className="logo" alt="logo"/>
          <h2>Beer collection</h2>
        </div>
    );
  }
}

export default Header;
