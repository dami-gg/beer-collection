import React from "react";
import { Route, Switch } from "react-router-dom";
import requiresAuth from "./authentication/AuthenticatedComponent";

import Home from "../home/Home";
import Login from "../login/Login";
import Add from "../beer-pages/crud/Add";
import Edit from "../beer-pages/crud/Edit";
import View from "../beer-pages/crud/View";
import Collection from "../collection/Collection";
import MultiEdit from "../collection/multi-edit/MultiEdit";
import Statistics from "../statistics/Statistics";
import Rating from '../statistics/graphs/Rating';
import Origin from '../statistics/graphs/Origin';

export const routes = (
  <Switch>
    <Route exact path="/" component={requiresAuth(Home)} />
    <Route path="/beer/add" component={requiresAuth(Add)} />
    <Route path="/beer/edit/:beerId" component={requiresAuth(Edit)} />
    <Route path="/beer/view/:beerId" component={requiresAuth(View)} />
    <Route exact path="/collection" component={requiresAuth(Collection)} />
    <Route exact path="/collection/manage" component={requiresAuth(MultiEdit)} />
    <Route path="/statistics" component={requiresAuth(Statistics)} />
    <Route path="/ratings" component={requiresAuth(Rating)} />
    <Route path="/origin" component={requiresAuth(Origin)} />
    <Route path="/login" component={Login} />
    <Route render={() => <h1>404: This page could not be found!</h1>} />
  </Switch>
);
