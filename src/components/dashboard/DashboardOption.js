import React, {Component} from 'react';
import {Link} from 'react-router';
import {Col} from 'react-bootstrap';

import logo from '../../assets/images/logo.svg';

class DashboardOption extends Component {
  render() {
    return (
        <Link to={this.props.url}>
          <Col className="dashboard__option"
               xs={12} sm={6} md={3}>
            <img src={logo} className="dashboard__option__image" alt="logo"/>
            <p className="dashboard__option__title">{this.props.title}</p>
          </Col>
        </Link>
    );
  }
}

export default DashboardOption;
