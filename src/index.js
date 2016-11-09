import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';

import App from './components/app/App';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/main.scss';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

