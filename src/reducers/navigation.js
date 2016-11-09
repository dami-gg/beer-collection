import * as types from '../constants/action-types';

const initialState = {
  currentBeer: undefined
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_BEER:
      return {
        ...state,
        shownBeer: action.beer
      };

    case types.RESET_CURRENT_BEER:
      return {
        ...state,
        shownBeer: undefined
      };

    default:
      return state;
  }
};

export default navigation;
