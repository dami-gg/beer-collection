import { takeEvery, put } from "redux-saga/effects";

import firebase from "firebase";

import { createEventChannel } from "./utils";

import {
  DELETE_BEER_FROM_STATE,
  DELETE_BEER_ERROR
} from "../actions/collection.actions";

function* watchDeletedBeerInDatabaseSaga(): Generator<any,any,any> {
  const user = firebase.auth().currentUser;

  const updateChannel = createEventChannel(
    `users/${user.uid}/beers`,
    "name",
    "child_removed"
  );

  yield takeEvery(updateChannel, deleteBeerInStateSaga);
}

function* deleteBeerInStateSaga(beer): Generator<any,any,any> {
  try {
    yield put({ type: DELETE_BEER_FROM_STATE, beer: beer });
  } catch (error) {
    yield put({ type: DELETE_BEER_ERROR, error: error.message });
  }
}

export default watchDeletedBeerInDatabaseSaga;
