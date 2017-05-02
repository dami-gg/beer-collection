// @flow

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './dashboard-option.scss';

class DashboardOption extends Component {
  props: {
    title: string,
    url: string,
    image: string
  };

  render() {
    return (
        <div className="dashboard__option">
          <Link className="dashboard__option__card" to={this.props.url}>
            <div className="dashboard__option__image-wrapper">
              <img src={this.props.image} className="dashboard__option__image" alt="logo"/>
            </div>
            <div className="dashboard__option__title-wrapper">
              <p className="dashboard__option__title">{this.props.title}</p>
            </div>
          </Link>
        </div>
    );
  }
}

export default DashboardOption;
