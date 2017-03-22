// @flow

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class DashboardOption extends Component {
  props:{
    url: string,
    image: string,
    title: string
  };

  render() {
    return (
        <div className="dashboard__option">
          <Link to={this.props.url}>
            <img src={this.props.image} className="dashboard__option__image" alt="logo"/>
            <p className="dashboard__option__title">{this.props.title}</p>
          </Link>
        </div>
    );
  }
}

export default DashboardOption;
