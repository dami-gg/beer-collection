import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import App from './App';
import AddBeerComponent from './components/beer/AddBeerComponent';
import './index.css';

const NotFound = () => (
    <h1>404: This page could not be found!</h1>
);

ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={App} />
      <Route path="/beer/add" component={AddBeerComponent} />
      <Route path='*' component={NotFound} />
    </Router>,
  document.getElementById('root')
);

