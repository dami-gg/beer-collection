import { takeEvery, put } from "redux-saga/effects";

import firebase from "firebase";

import { createEventChannel } from "./utils";

import {
  UPDATE_BEER_IN_STATE,
  UPDATE_BEER_ERROR
} from "../actions/collection.actions";

function* watchUpdatedBeerInDatabaseSaga(): Generator<any,any,any> {
  const user = firebase.auth().currentUser;

  const updateChannel = createEventChannel(
    `users/${user.uid}/beers`,
    "name",
    "child_changed"
  );

  yield takeEvery(updateChannel, updateBeerInStateSaga);
}

function* updateBeerInStateSaga(beer): Generator<any,any,any> {
  try {
    yield put({ type: UPDATE_BEER_IN_STATE, beer: beer });
  } catch (error) {
    yield put({ type: UPDATE_BEER_ERROR, error: error.message });
  }
}

export default watchUpdatedBeerInDatabaseSaga;
