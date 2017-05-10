import {takeEvery, put} from 'redux-saga/effects';

import {createEventChannel} from './utils';

import {DELETE_BEER_FROM_STATE, DELETE_BEER_ERROR} from '../actions/collection.actions';

function* watchDeletedBeerInDatabaseSaga() {
  const updateChannel = createEventChannel('beers', 'name', 'child_removed');

  yield takeEvery(updateChannel, deleteBeerInStateSaga);
}

function* deleteBeerInStateSaga(beer) {
  try {
    yield put({type: DELETE_BEER_FROM_STATE, beer: beer});
  }
  catch (error) {
    yield put({type: DELETE_BEER_ERROR, error: error.message});
  }
}

export default watchDeletedBeerInDatabaseSaga;
