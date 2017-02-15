// @flow
import type { Beer } from '../types/types';

import * as actionTypes from '../constants/action-types';

const initialState = [];

const collection = (state: Array<Beer> = initialState, action: Object): Array<Beer> => {
  switch(action.type) {
    case actionTypes.LOAD_COLLECTION_SUCCESS:
      return action.collection;

    case actionTypes.LOAD_COLLECTION_ERROR:
      return [];

    case actionTypes.ADD_BEER_SUCCESS:
      return [
          ...state,
          action.beer
      ];

    case actionTypes.ADD_BEER_ERROR:
      return state;

    case actionTypes.UPDATE_BEER_SUCCESS:
      let index = state.findIndex((element) => {
        return element.id === action.beer.id;
      });

      return [
        ...state.slice(0, index),
        action.beer,
        ...state.slice(index + 1)
      ];

    case actionTypes.UPDATE_BEER_ERROR:
      return state;

    case actionTypes.DELETE_BEER:
      return [
          ...state.slice(0, action.index),
          ...state.slice(action.index + 1)
      ];

    default:
      return state;
  }
};

export default collection;
