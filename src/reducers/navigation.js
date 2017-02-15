// @flow
import type { Beer } from '../types/types';

type NavigationState = {
  currentBeer: ?Beer;
};

import * as actionTypes from '../constants/action-types';

const initialState = {
  currentBeer: undefined
};

const navigation = (state: NavigationState = initialState, action: Object): NavigationState => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_BEER:
      return {
        ...state,
        currentBeer: action.beer
      };

    case actionTypes.RESET_CURRENT_BEER:
      return {
        ...state,
        currentBeer: undefined
      };

    default:
      return state;
  }
};

export default navigation;
