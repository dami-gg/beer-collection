// @flow

import React, {PureComponent} from 'react';
import Option from './option/Option';

import './dashboard.scss';

import crate from '../../assets/images/crate.png';
import tap from '../../assets/images/tap.png';
import statistics from '../../assets/images/statistics.png';
import globe from '../../assets/images/globe.png';

class Dashboard extends PureComponent {
  render() {
    return (
        <div className="dashboard">
          <Option
              title="Add a new beer"
              url="/beer/add"
              image={tap}/>

          <Option
              title="See your collection"
              url="/collection"
              image={crate}/>

          <Option
              title="See statistics"
              url="/statistics"
              image={statistics}/>

          <Option
              title="Beer map"
              url="/map"
              image={globe}/>
        </div>
    );
  }
}

export default Dashboard;
