import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga  from './sagas';

import App from './components/app/App';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/main.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

