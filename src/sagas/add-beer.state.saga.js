// @flow
import type { Beer } from "../types/beer.types";
import type { Image } from "../types/image.types";

import { takeEvery, put } from "redux-saga/effects";

import firebase from "firebase";

import { createEventChannel } from "./utils";

import {
  ADD_BEER_TO_STATE,
  ADD_BEER_ERROR
} from "../actions/collection.actions";

import {
  ADD_IMAGE_TO_STATE,
  ADD_IMAGE_ERROR
} from "../actions/gallery.actions";

function* watchAddedBeerInDatabaseSaga(): Generator<any,any,any> {
  const user = firebase.auth().currentUser;

  const updateChannel = createEventChannel(
    `users/${user.uid}/beers`,
    "name",
    "child_added"
  );

  yield takeEvery(updateChannel, addBeerToStateSaga);
}

function* addBeerToStateSaga(beer: Beer): Generator<any,any,any> {
  try {
    yield put({ type: ADD_BEER_TO_STATE, beer });
  } catch (error) {
    yield put({ type: ADD_BEER_ERROR, error: error.message });
  }
  try {
    if (beer && beer.image) {
      const image: Image = {
        id: beer.id,
        url: beer.image
      };

      yield put({ type: ADD_IMAGE_TO_STATE, image });
    }
  } catch (error) {
    yield put({ type: ADD_IMAGE_ERROR, error: error.message });
  }
}

export default watchAddedBeerInDatabaseSaga;
