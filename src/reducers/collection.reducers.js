// @flow
import type {Beer} from '../types';

import * as actionTypes from '../constants';

const initialState = [];

const collection = (state: Array<Beer> = initialState, action: Object): Array<Beer> => {
  let index: number;

  switch (action.type) {
    case actionTypes.ADD_BEER_TO_STATE:
      return [
        ...state,
        action.beer
      ];

    case actionTypes.UPDATE_BEER_IN_STATE:
      index = state.findIndex(element => element.id === action.beer.id);

      return [
        ...state.slice(0, index),
        action.beer,
        ...state.slice(index + 1)
      ];


    case actionTypes.DELETE_BEER_FROM_STATE:
      index = state.findIndex(element => element.id === action.beer.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

    case actionTypes.ADD_BEER_ERROR:
    case actionTypes.UPDATE_BEER_ERROR:
    case actionTypes.DELETE_BEER_ERROR:
      return state;

    default:
      return state;
  }
};

export default collection;
