// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dashboard from '../dashboard/Dashboard';

class Home extends Component {
  render() {
    return (
        <div>
          <Dashboard />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  collection: state.collection
});

export default connect(
    mapStateToProps
)(Home);
