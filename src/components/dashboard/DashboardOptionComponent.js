import React, {Component} from 'react';
import {Link} from 'react-router';
import logo from '../../logo.svg';

class DashboardOptionComponent extends Component {
  render() {
    return (
        <Link to={this.props.url}>
          <div className="dashboard__option">
            <img src={logo} className="dashboard__option__image" alt="logo"/>
            <p className="dashboard__option__title">{this.props.title}</p>
          </div>
        </Link>
    );
  }
}

export default DashboardOptionComponent;
