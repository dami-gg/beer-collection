import {takeEvery, fork, all} from 'redux-saga/effects';

import {LOG_USER_IN} from '../actions/authentication.actions';

import watchAddedBeerInApplicationSaga from './add-beer.database.saga';
import watchAddedBeerInDatabaseSaga from './add-beer.state.saga';
import watchUpdatedBeerInApplicationSaga from './update-beer.database.saga';
import watchUpdatedBeerInDatabaseSaga from './update-beer.state.saga';
import watchDeletedBeerInApplicationSaga from './delete-beer.database.saga';
import watchDeletedBeerInDatabaseSaga from './delete-beer.state.saga';

function* watchUserLoggedIn() {
  yield takeEvery(LOG_USER_IN, triggerCollectionSagas);
}

function* triggerCollectionSagas() { 
  yield all([
    fork(watchAddedBeerInApplicationSaga),
    fork(watchAddedBeerInDatabaseSaga),
    fork(watchUpdatedBeerInApplicationSaga),
    fork(watchUpdatedBeerInDatabaseSaga),
    fork(watchDeletedBeerInApplicationSaga),
    fork(watchDeletedBeerInDatabaseSaga)
  ]);
}

export default watchUserLoggedIn;