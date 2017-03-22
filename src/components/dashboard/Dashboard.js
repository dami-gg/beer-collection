// @flow

import React, {Component} from 'react';
import DashboardOption from './dashboard-option/DashboardOption';

import './dashboard.scss';

import crate from '../../assets/images/crate.png';
import tap from '../../assets/images/tap.png';

class Dashboard extends Component {
  render() {
    return (
        <div className="dashboard">
          <DashboardOption
              title="Add beer to your collection"
              url="/beer/add"
              image={tap}/>

          <DashboardOption
              title="See your collection"
              url="/collection"
              image={crate}/>
        </div>
    );
  }
}

export default Dashboard;
