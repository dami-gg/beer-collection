import watchLoadCollectionSaga from './load-collection.saga';
import watchAddBeerSaga from './add-beer.saga';

function* rootSaga() {
  yield [
    watchLoadCollectionSaga,
    watchAddBeerSaga
  ];
}

export default rootSaga;
