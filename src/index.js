import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase";
import { AppContainer } from "react-hot-loader";

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./sagas";

import App from "./components/app/App";

import "./assets/styles/main.scss";

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
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./components/app/App", () => {
    const NextApp = require("./components/app/App").default; // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
