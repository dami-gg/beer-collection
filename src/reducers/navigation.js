// @flow
import type {User, Beer} from '../types/types';

type NavigationState = {
  user: ?User;
  currentBeer: ?Beer;
};

import * as actionTypes from '../constants/action-types';

const initialState = {
  user: null,
  currentBeer: null
};

const navigation = (state:NavigationState = initialState, action:Object):NavigationState => {
  switch (action.type) {
    case actionTypes.LOG_USER_IN:
      return {
        ...state,
        user: action.user
      };

    case actionTypes.LOG_USER_OUT:
      return {
        ...state,
        user: null
      };

    case actionTypes.SET_CURRENT_BEER:
      return {
        ...state,
        currentBeer: action.beer
      };

    case actionTypes.RESET_CURRENT_BEER:
      return {
        ...state,
        currentBeer: null
      };

    default:
      return state;
  }
};

export default navigation;
