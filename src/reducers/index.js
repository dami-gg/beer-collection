import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import collection from './collection.reducers';
import navigation from './navigation.reducers';
import authentication from './authentication.reducers';

const reducers = combineReducers({
  collection,
  navigation,
  authentication,
  form: formReducer
});

export default reducers;
