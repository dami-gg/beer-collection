import {takeEvery, call, put} from 'redux-saga/effects';
import firebase from 'firebase';

import * as types from '../constants';

function* watchUpdatedBeerInApplicationSaga() {
  yield takeEvery(types.UPDATE_BEER_IN_DATABASE, updateBeerInDatabaseSaga);
}

function* updateBeerInDatabaseSaga(action) {
  try {
    yield call(putBeerToDatabase, action.beer);
  }
  catch (error) {
    yield put({type: types.UPDATE_BEER_ERROR, error: error.message});
  }
}

function putBeerToDatabase(beer) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`beers/${beer.id}`)
        .update({
          id: beer.id,
          name: beer.name,
          type: beer.type,
          origin: beer.origin,
          image: beer.image,
          rating: beer.rating
        })
        .then(() => resolve())
        .catch(error => reject(error));
  });
}

export default watchUpdatedBeerInApplicationSaga;
