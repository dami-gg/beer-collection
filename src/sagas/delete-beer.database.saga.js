import {takeEvery, call, put} from 'redux-saga/effects';
import firebase from 'firebase';

import * as types from '../constants';

function* watchDeletedBeerInApplicationSaga() {
  yield takeEvery(types.DELETE_BEER_FROM_DATABASE, deleteBeerFromDatabaseSaga);
}

function* deleteBeerFromDatabaseSaga(action) {
  try {
    yield call(deleteBeerFromDatabase, action.beer);
  }
  catch (error) {
    yield put({type: types.DELETE_BEER_ERROR, error: error.message});
  }
}

function deleteBeerFromDatabase(beer) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`beers/${beer.id}`)
        .remove()
        .then(() => resolve())
        .catch(error => reject(error));
  });
}

export default watchDeletedBeerInApplicationSaga;
