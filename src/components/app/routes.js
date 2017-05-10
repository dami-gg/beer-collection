import React from 'react';
import {Route, Switch} from 'react-router-dom';
import requiresAuth from './authentication/AuthenticatedComponent';

import Dashboard from '../dashboard/Dashboard';
import Login from '../login/Login';
import Add from '../beer-pages/crud/Add';
import Edit from '../beer-pages/crud/Edit';
import View from '../beer-pages/crud/View';
import Collection from '../collection/Collection';

export const routes = (
    <Switch>
      <Route exact path="/" component={requiresAuth(Dashboard)}/>
      <Route path="/beer/add" component={requiresAuth(Add)}/>
      <Route path="/beer/edit/:beerId" component={requiresAuth(Edit)}/>
      <Route path="/beer/view/:beerId" component={requiresAuth(View)}/>
      <Route path="/collection" component={requiresAuth(Collection)}/>
      <Route path="/login" component={Login}/>
      <Route render={() => <h1>404: This page could not be found!</h1>}/>
    </Switch>
);
