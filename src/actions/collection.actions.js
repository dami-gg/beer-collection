// @flow
import type { Beer } from '../types/beer.types';
import type { ActionWithBeerParameter } from '../types/action.types';

/*
  ACTION TYPES
 */

export const ADD_BEER_TO_DATABASE: string = 'ADD_BEER_TO_DATABASE';
export const ADD_BEER_TO_STATE: string = 'ADD_BEER_TO_STATE';
export const ADD_BEER_ERROR: string = 'ADD_BEER_ERROR';

export const UPDATE_BEER_IN_DATABASE: string = 'UPDATE_BEER_IN_DATABASE';
export const UPDATE_BEER_IN_STATE: string = 'UPDATE_BEER_IN_STATE';
export const UPDATE_BEER_ERROR: string = 'UPDATE_BEER_ERROR';

export const DELETE_BEER_FROM_DATABASE: string = 'DELETE_BEER_FROM_DATABASE';
export const DELETE_BEER_FROM_STATE: string = 'DELETE_BEER_FROM_STATE';
export const DELETE_BEER_ERROR: string = 'DELETE_BEER_ERROR';

/*
  ACTIONS
 */

export const addBeer = (beer: Beer): ActionWithBeerParameter => {
  return {
    type: ADD_BEER_TO_DATABASE,
    beer
  };
};

export const updateBeer = (beer: Beer): ActionWithBeerParameter => {
  return {
    type: UPDATE_BEER_IN_DATABASE,
    beer
  };
};

export const deleteBeer = (beer: Beer): ActionWithBeerParameter => {
  return {
    type: DELETE_BEER_FROM_DATABASE,
    beer
  };
};
