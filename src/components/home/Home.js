// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadCollection} from '../../actions';

import Dashboard from '../dashboard/Dashboard';

class Home extends Component {
  componentWillMount() {
    this.props.loadCollection();
  }

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

const mapDispatchToProps = dispatch => {
  return {
    loadCollection: () => {
      dispatch(loadCollection());
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
