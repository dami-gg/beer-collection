import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import requiresAuth from '../authentication/AuthenticatedComponent';

import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../login/Login';
import BeerAdd from '../beer/beer-pages/BeerAdd';
import BeerEdit from '../beer/beer-pages/BeerEdit';
import BeerView from '../beer/beer-pages/BeerView';
import Collection from '../collection/Collection';

import './app.scss';

class App extends Component {
  props: {
    match: Object,
    location: Object,
    history: Object
  };

  getRoutes() {
    return (
        <div>
          <Switch>
            <Route exact path="/" component={requiresAuth(Home)}/>
            <Route path="/beer/add" component={requiresAuth(BeerAdd)}/>
            <Route path="/beer/edit/:beerId" component={requiresAuth(BeerEdit)}/>
            <Route path="/beer/view/:beerId" component={requiresAuth(BeerView)}/>
            <Route path="/collection" component={requiresAuth(Collection)}/>
            <Route path="/login" component={Login}/>
            <Route render={() => <h1>404: This page could not be found!</h1>}/>
          </Switch>
        </div>
    );
  }

  render() {
    return (
        <Router>
          <div className="app">
            <Header />
            {this.getRoutes()}
          </div>
        </Router>
    );
  }
}

export default App;

