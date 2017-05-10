// @flow
import type { Beer } from '../types';

import type { ActionWithNoParameters, ActionWithBeerParameter } from '../types/action.types';

/*
  ACTION TYPES
 */

export const SET_CURRENT_BEER: string = 'SET_CURRENT_BEER';
export const RESET_CURRENT_BEER: string = 'RESET_CURRENT_BEER';

/*
  ACTIONS
 */

export const setCurrentBeer = (beer: Beer): ActionWithNoParameters => {
  return {
    type: SET_CURRENT_BEER,
    beer
  };
};

export const resetCurrentBeer = (): ActionWithBeerParameter => {
  return {
    type: RESET_CURRENT_BEER
  };
};
