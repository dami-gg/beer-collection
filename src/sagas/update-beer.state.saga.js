import {takeEvery, put} from 'redux-saga/effects';

import {createEventChannel} from './utils';

import {UPDATE_BEER_IN_STATE, UPDATE_BEER_ERROR} from '../actions/collection.actions';

function* watchUpdatedBeerInDatabaseSaga() {
  const updateChannel = createEventChannel('beers', 'name', 'child_changed');

  yield takeEvery(updateChannel, updateBeerInStateSaga);
}

function* updateBeerInStateSaga(beer) {
  try {
    yield put({type: UPDATE_BEER_IN_STATE, beer: beer});
  }
  catch (error) {
    yield put({type: UPDATE_BEER_ERROR, error: error.message});
  }
}

export default watchUpdatedBeerInDatabaseSaga;
