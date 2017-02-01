import React, {Component} from 'react';
import {Router, Route, hashHistory} from 'react-router';

import Home from '../home/Home';
import BeerAdd from '../beer/BeerAdd';
import BeerEdit from '../beer/BeerEdit';
import Collection from '../collection/Collection';

const NotFound = () => (
    <h1>404: This page could not be found!</h1>
);

class RouteHandler extends Component {
  render() {
    return (
        <Router history={hashHistory}>
          <Route path='/' component={Home}/>
          <Route path="/beer/add" component={BeerAdd} />
          <Route path="/beer/edit/:beerId" component={BeerEdit} />
          <Route path="/collection" component={Collection} />
          <Route path='*' component={NotFound}/>
        </Router>
    );
  }
}

export default RouteHandler;
