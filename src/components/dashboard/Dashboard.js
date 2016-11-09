import React, {Component} from 'react';
import './dashboard.scss';
import DashboardOption from './DashboardOption';

class Dashboard extends Component {
  render() {
    return (
        <div className="dashboard">
          <DashboardOption title="Add beer to the list" url="/beer/add"/>
          <DashboardOption title="See list of beers" url="/beer/list"/>
        </div>
    );
  }
}

export default Dashboard;
