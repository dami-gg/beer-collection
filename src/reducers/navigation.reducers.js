// @flow
import type {Beer} from '../types';

type NavigationState = {
  currentBeer: ?Beer;
};

import {SET_CURRENT_BEER, RESET_CURRENT_BEER} from '../actions/navigation.actions';

const initialState = {
  currentBeer: undefined
};

const navigation = (state: NavigationState = initialState, action: Object): NavigationState => {
  switch (action.type) {
    case SET_CURRENT_BEER:
      return {
        ...state,
        currentBeer: action.beer
      };

    case RESET_CURRENT_BEER:
      return {
        ...state,
        currentBeer: initialState.currentBeer
      };

    default:
      return state;
  }
};

export default navigation;
