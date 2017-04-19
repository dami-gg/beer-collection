import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import collection from './collection.reducers';
import navigation from './navigation.reducers';

const reducers = combineReducers({
  collection,
  navigation,
  form: formReducer
});

export default reducers;
