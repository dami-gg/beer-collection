import {fork} from 'redux-saga/effects';

import watchUserLoggedIn from './login.saga';

function* rootSaga() {
  yield fork(watchUserLoggedIn);
}

export default rootSaga;
