import {fork} from 'redux-saga/effects';

import watchLoadCollectionSaga from './load-collection.saga';
import watchAddBeerSaga from './add-beer.saga';
import watchUpdateBeerSaga from './update-beer.saga';

function* rootSaga() {
  yield [
    fork(watchLoadCollectionSaga),
    fork(watchAddBeerSaga),
    fork(watchUpdateBeerSaga)
  ];
}

export default rootSaga;
