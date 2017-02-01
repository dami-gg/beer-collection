import {fork} from 'redux-saga/effects';

import watchLoadCollectionSaga from './load-collection.saga';
import watchAddBeerSaga from './add-beer.saga';

function* rootSaga() {
  debugger;
  yield [
    fork(watchLoadCollectionSaga),
    fork(watchAddBeerSaga)
  ];
}

export default rootSaga;
