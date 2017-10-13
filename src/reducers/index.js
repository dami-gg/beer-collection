// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import collection from './collection.reducers';
import navigation from './navigation.reducers';
import authentication from './authentication.reducers';
import gallery from './gallery.reducers';

const reducers = combineReducers({
  collection,
  navigation,
  authentication,
  gallery,
  form: formReducer
});

export default reducers;
