import React, {Component} from 'react';
import {Router, Route, hashHistory} from 'react-router';

import Home from '../home/Home';
import Beer from '../beer/Beer';

const NotFound = () => (
    <h1>404: This page could not be found!</h1>
);

class RouteHandler extends Component {
  render() {
    return (
        <Router history={hashHistory}>
          <Route path='/' component={Home}/>
          <Route path="/beer/:mode" component={Beer} />
          <Route path='*' component={NotFound}/>
        </Router>
    );
  }
}

export default RouteHandler;
