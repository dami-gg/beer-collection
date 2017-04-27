import {fork} from 'redux-saga/effects';

import watchAddedBeerInApplicationSaga from './add-beer.database.saga';
import watchAddedBeerInDatabaseSaga from './add-beer.state.saga';
import watchUpdatedBeerInApplicationSaga from './update-beer.database.saga';
import watchUpdatedBeerInDatabaseSaga from './update-beer.state.saga';
import watchDeletedBeerInApplicationSaga from './delete-beer.database.saga';
import watchDeletedBeerInDatabaseSaga from './delete-beer.state.saga';

function* rootSaga() {
  yield [
    fork(watchAddedBeerInApplicationSaga),
    fork(watchAddedBeerInDatabaseSaga),
    fork(watchUpdatedBeerInApplicationSaga),
    fork(watchUpdatedBeerInDatabaseSaga),
    fork(watchDeletedBeerInApplicationSaga),
    fork(watchDeletedBeerInDatabaseSaga)
  ];
}

export default rootSaga;
