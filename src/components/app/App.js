import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadCollection} from '../../actions';

import Header from '../common/Header';
import RouteHandler from '../common/RouteHandler';

class App extends Component {
  componentWillMount() {
    this.props.loadCollection();
  }

  render() {
    return (
        <div className="app">
          <Header />
          <RouteHandler />
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collection: state.collection
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadCollection: () => {
      dispatch(loadCollection());
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
