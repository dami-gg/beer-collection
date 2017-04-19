import {takeEvery, call, put} from 'redux-saga/effects';
import firebase from 'firebase';

import * as types from '../constants/index';

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
  let query = firebase.database().ref('beers').orderByKey();

  return new Promise((resolve, reject) => {
    query.once('value', snapshot => {
      resolve({collection: Object.values(snapshot.val())});
      // TODO Handle rejection
    });
  });
}

export default watchLoadCollectionSaga;
