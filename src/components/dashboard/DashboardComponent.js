import React, {Component} from 'react';
import './Dashboard.scss';
import DashboardOptionComponent from './DashboardOptionComponent';

class DashboardComponent extends Component {
  render() {
    return (
        <div className="dashboard">
          <DashboardOptionComponent title="Add beer to the list" url="/beer/add"/>
          <DashboardOptionComponent title="See list of beers" url="/beer/list"/>
        </div>
    );
  }
}

export default DashboardComponent;
