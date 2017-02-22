import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import firebase from 'firebase';

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga  from './sagas';

import App from './components/app/App';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/main.scss';

const config = {
  apiKey: "AIzaSyAxomPcdjUYjos_6-Vcjj07sazCVpoQBHE",
  authDomain: "beer-collection.firebaseapp.com",
  databaseURL: "https://beer-collection.firebaseio.com",
  storageBucket: "beer-collection.appspot.com",
  messagingSenderId: "549305960758"
};

firebase.initializeApp(config);

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

