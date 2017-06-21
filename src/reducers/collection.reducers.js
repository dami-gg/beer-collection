// @flow
import type { Beer } from "../types/beer.types";

import {
  ADD_BEER_TO_STATE,
  UPDATE_BEER_IN_STATE,
  DELETE_BEER_FROM_STATE,
  ADD_BEER_ERROR,
  UPDATE_BEER_ERROR,
  DELETE_BEER_ERROR
} from "../actions/collection.actions";

const initialState = [];

const collection = (
  state: Array<Beer> = initialState,
  action: Object
): Array<Beer> => {
  let index: number;

  switch (action.type) {
    case ADD_BEER_TO_STATE:
      // If the beer's natural position by alphabetical order is not the last, which would mean it's added on startup from
      // the database, it means it's been created in the current session and has to be inserted in the right position
      const lastBeer = state.length > 0 ? state[state.length - 1] : null;
      const newBeerName = action.beer.name.toLowerCase();

      if (lastBeer && newBeerName < lastBeer.name.toLowerCase()) {
        index = state.findIndex(
          element => element.name.toLowerCase() > newBeerName
        );

        return [...state.slice(0, index), action.beer, ...state.slice(index)];
      } else {
        return [...state, action.beer];
      }

    case UPDATE_BEER_IN_STATE:
      index = state.findIndex(element => element.id === action.beer.id);

      return [...state.slice(0, index), action.beer, ...state.slice(index + 1)];

    case DELETE_BEER_FROM_STATE:
      index = state.findIndex(element => element.id === action.beer.id);

      return [...state.slice(0, index), ...state.slice(index + 1)];

    case ADD_BEER_ERROR:
    case UPDATE_BEER_ERROR:
    case DELETE_BEER_ERROR:
      return state;

    default:
      return state;
  }
};

export default collection;
