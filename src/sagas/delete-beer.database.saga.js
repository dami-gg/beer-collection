import {takeEvery, call, put} from 'redux-saga/effects';
import firebase from 'firebase';

import {DELETE_BEER_FROM_DATABASE, DELETE_BEER_ERROR} from '../actions/collection.actions';

function* watchDeletedBeerInApplicationSaga() {
  yield takeEvery(DELETE_BEER_FROM_DATABASE, deleteBeerFromDatabaseSaga);
}

function* deleteBeerFromDatabaseSaga(action) {
  try {
    yield call(deleteBeerFromDatabase, action.beer);
  }
  catch (error) {
    yield put({type: DELETE_BEER_ERROR, error: error.message});
  }
}

function deleteBeerFromDatabase(beer) {
  const user = firebase.auth().currentUser;
  
  return new Promise((resolve, reject) => {
    firebase.database().ref(`users/${user.uid}/beers/${beer.id}`)
        .remove()
        .then(() => resolve())
        .catch(error => reject(error));
  });
}

export default watchDeletedBeerInApplicationSaga;
