import React, {Component} from 'react';
import './dashboard.scss';
import DashboardOption from './DashboardOption';

import crate from '../../assets/images/crate.png';
import tap from '../../assets/images/tap.png';

class Dashboard extends Component {
  render() {
    return (
        <div className="dashboard">
          <DashboardOption
              title="Add beer to the list"
              url="/beer/add"
              image={tap}
          />
          <DashboardOption
              title="See list of beers"
              url="/beer/list"
              image={crate}
          />
        </div>
    );
  }
}

export default Dashboard;
