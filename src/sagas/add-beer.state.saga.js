import {takeEvery, put} from 'redux-saga/effects';

import {createEventChannel} from '../utils';

import {ADD_BEER_TO_STATE, ADD_BEER_ERROR} from '../actions/collection.actions';

function* watchAddedBeerInDatabaseSaga() {
  const updateChannel = createEventChannel('beers', 'name', 'child_added');

  yield takeEvery(updateChannel, addBeerToStateSaga);
}

function* addBeerToStateSaga(beer) {
  try {
    yield put({type: ADD_BEER_TO_STATE, beer});
  }
  catch (error) {
    yield put({type: ADD_BEER_ERROR, error: error.message});
  }
}

export default watchAddedBeerInDatabaseSaga;
