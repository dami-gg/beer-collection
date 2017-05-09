// @flow

import React, {Component} from 'react';
import DashboardOption from './option/Option';

import './dashboard.scss';

import crate from '../../assets/images/crate.png';
import tap from '../../assets/images/tap.png';
import statistics from '../../assets/images/statistics.png';
import globe from '../../assets/images/globe.png';

class Dashboard extends Component {
  render() {
    return (
        <div className="dashboard">
          <DashboardOption
              title="Add a new beer"
              url="/beer/add"
              image={tap}/>

          <DashboardOption
              title="See your collection"
              url="/collection"
              image={crate}/>

          <DashboardOption
              title="See statistics"
              url="/statistics"
              image={statistics}/>

          <DashboardOption
              title="Beer map"
              url="/map"
              image={globe}/>
        </div>
    );
  }
}

export default Dashboard;
