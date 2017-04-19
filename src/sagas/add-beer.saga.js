import {takeEvery, call, put} from 'redux-saga/effects';
import firebase from 'firebase';

import * as types from '../constants';

function* watchAddBeerSaga() {
  yield takeEvery(types.ADD_BEER, addBeerSaga);
}

function* addBeerSaga(action) {
  try {
    yield call(postBeerToDB, action.beer);
    yield put({type: types.ADD_BEER_SUCCESS, beer: action.beer});
  }
  catch (error) {
    yield put({type: types.ADD_BEER_ERROR, error: error.message});
  }
}

function postBeerToDB(beer) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`beers/${beer.id}`)
        .set({
          id: beer.id,
          name: beer.name,
          type: beer.type,
          origin: beer.origin,
          image: beer.image
        })
        .then(() => resolve())
        .catch((error) => reject(error));
  });
}

export default watchAddBeerSaga;
