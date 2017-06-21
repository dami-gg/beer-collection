// @flow
import React from "react";
import { Route, Switch } from "react-router-dom";
import Authenticated from "./authentication/AuthenticatedComponent";
import Async from "./async/AsyncComponent";

const homeAsyncLoader = () => import("../home/Home");
const loginAsyncLoader = () => import("../login/Login");
const collectionAsyncLoader = () => import("../collection/Collection");
const addPageAsyncLoader = () => import("../beer-pages/crud/Add");
const editPageAsyncLoader = () => import("../beer-pages/crud/Edit");
const viewPageAsyncLoader = () => import("../beer-pages/crud/View");
const multiEditAsyncLoader = () => import("../collection/multi-edit/MultiEdit");
const statisticsAsyncLoader = () => import("../statistics/Statistics");
const ratingAsyncLoader = () => import("../statistics/graphs/Rating");
const originAsyncLoader = () => import("../statistics/graphs/Origin");
const errorAsyncLoader = () => import("../error/Error");

export const routes = (
  <Switch>
    <Route exact path="/" component={Authenticated(Async(homeAsyncLoader))} />
    <Route
      path="/beer/add"
      component={Authenticated(Async(addPageAsyncLoader))}
    />
    <Route
      path="/beer/edit/:beerId"
      component={Authenticated(Async(editPageAsyncLoader))}
    />
    <Route
      path="/beer/view/:beerId"
      component={Authenticated(Async(viewPageAsyncLoader))}
    />
    <Route
      exact
      path="/collection"
      component={Authenticated(Async(collectionAsyncLoader))}
    />
    <Route
      exact
      path="/collection/manage"
      component={Authenticated(Async(multiEditAsyncLoader))}
    />
    <Route
      path="/statistics"
      component={Authenticated(Async(statisticsAsyncLoader))}
    />
    <Route
      path="/ratings"
      component={Authenticated(Async(ratingAsyncLoader))}
    />
    <Route path="/origin" component={Authenticated(Async(originAsyncLoader))} />
    <Route path="/login" component={Async(loginAsyncLoader)} />
    <Route component={Async(errorAsyncLoader)} />
  </Switch>
);
