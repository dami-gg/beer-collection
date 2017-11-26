// @flow
import { combineReducers } from 'redux';

import collection from './collection.reducers';
import authentication from './authentication.reducers';
import gallery from './gallery.reducers';

const reducers = combineReducers({
  collection,
  authentication,
  gallery
});

export default reducers;
