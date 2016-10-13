import React, {Component} from 'react';
import {Router, Route, hashHistory} from 'react-router';

import Home from '../home/HomeComponent';
import AddBeerComponent from '../beer/AddBeerComponent';

const NotFound = () => (
    <h1>404: This page could not be found!</h1>
);

class RouteHandler extends Component {
  render() {
    return (
        <Router history={hashHistory}>
          <Route path='/' component={Home}/>
          <Route path="/beer/add" component={AddBeerComponent}/>
          <Route path='*' component={NotFound}/>
        </Router>
    );
  }
}

export default RouteHandler;
