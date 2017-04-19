import React from 'react';
import {Route, Switch} from 'react-router-dom';
import requiresAuth from '../components/authentication/AuthenticatedComponent';

import Home from '../components/home/Home';
import Login from '../components/login/Login';
import BeerAdd from '../components/beer/beer-pages/BeerAdd';
import BeerEdit from '../components/beer/beer-pages/BeerEdit';
import BeerView from '../components/beer/beer-pages/BeerView';
import Collection from '../components/collection/Collection';


export const routes = (
    <Switch>
      <Route exact path="/" component={requiresAuth(Home)}/>
      <Route path="/beer/add" component={requiresAuth(BeerAdd)}/>
      <Route path="/beer/edit/:beerId" component={requiresAuth(BeerEdit)}/>
      <Route path="/beer/view/:beerId" component={requiresAuth(BeerView)}/>
      <Route path="/collection" component={requiresAuth(Collection)}/>
      <Route path="/login" component={Login}/>
      <Route render={() => <h1>404: This page could not be found!</h1>}/>
    </Switch>
);
