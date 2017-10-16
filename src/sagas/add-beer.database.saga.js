import { takeEvery, call, put } from "redux-saga/effects";
import firebase from "firebase";

import { v4 } from "node-uuid";

import {
  ADD_BEER_TO_DATABASE,
  ADD_BEER_ERROR
} from "../actions/collection.actions";

function* watchAddedBeerInApplicationSaga(): Generator<any,any,any> {
  yield takeEvery(ADD_BEER_TO_DATABASE, addBeerToDatabase);
}

function* addBeerToDatabase(action): Generator<any,any,any> {
  try {
    yield call(postBeerToDatabase, action.beer);
  } catch (error) {
    yield put({ type: ADD_BEER_ERROR, error: error.message });
  }
}

function postBeerToDatabase(beer) {
  const user = firebase.auth().currentUser;
  beer.id = v4();

  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`users/${user.uid}/beers/${beer.id}`)
      .set({
        id: beer.id,
        name: beer.name || "Beer without name",
        type: beer.type || "",
        origin: beer.origin || "",
        rating: beer.rating || "",
        image: beer.image || ""
      })
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

export default watchAddedBeerInApplicationSaga;
