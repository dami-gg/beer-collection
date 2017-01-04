import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import App from './components/app/App';
import configureStore from './common/store.config';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/main.scss';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

