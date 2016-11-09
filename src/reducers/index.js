import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import collection from './collection';
import navigation from './navigation';

const reducers = combineReducers({
  collection,
  navigation,
  form: formReducer
});

export default reducers;
