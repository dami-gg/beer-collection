import {takeEvery, call, put} from 'redux-saga/effects';

import * as types from '../constants/action-types';
import database from '../common/database';

function* watchUpdateBeerSaga() {
  yield takeEvery(types.UPDATE_BEER, updateBeerSaga);
}

function* updateBeerSaga(action) {
  try {
    yield call(putBeerToDB, action.beer);
    yield put({type: types.UPDATE_BEER_SUCCESS, beer: action.beer});
  }
  catch (error) {
    yield put({type: types.UPDATE_BEER_ERROR, error: error.message});
  }
}

function putBeerToDB(beer) {
  return new Promise((resolve, reject) => {
    database.ref(`beers/${beer.id}`)
        .update({
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

export default watchUpdateBeerSaga;
