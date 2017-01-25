import {takeEvery, call, put} from 'redux-saga/effects';

import * as types from '../constants/action-types';
import database from '../common/database';

function* watchLoadCollectionSaga() {
  yield takeEvery(types.LOAD_COLLECTION, loadCollectionSaga);
}

function* loadCollectionSaga() {
  try {
    const { collection } = yield call(getCollectionFromDB);
    yield put({type: types.LOAD_COLLECTION_SUCCESS, collection: collection});
  }
  catch (error) {
    yield put({type: types.LOAD_COLLECTION_ERROR, error: error.message});
  }
}

function getCollectionFromDB() {
  let query = database.ref('beers').orderByKey();

  return new Promise((resolve, reject) => {
    query.once('value', snapshot => {
      resolve({collection: Object.values(snapshot.val())}); // TODO There should be a better way to do this rather than Object.values
      // TODO Handle rejection
    });
  });
}

export default watchLoadCollectionSaga;
