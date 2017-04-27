import {takeEvery, put} from 'redux-saga/effects';

import {createEventChannel} from '../utils';

import * as types from '../constants';

function* watchDeletedBeerInDatabaseSaga() {
  const updateChannel = createEventChannel('beers', 'name', 'child_removed');

  yield takeEvery(updateChannel, deleteBeerInStateSaga);
}

function* deleteBeerInStateSaga(beer) {
  try {
    yield put({type: types.DELETE_BEER_FROM_STATE, beer: beer});
  }
  catch (error) {
    yield put({type: types.DELETE_BEER_ERROR, error: error.message});
  }
}

export default watchDeletedBeerInDatabaseSaga;
