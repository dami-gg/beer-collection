// @flow

import type { Beer } from '../types/types';

type ActionWithNoParameters = {
  type: string;
};

type ActionWithBeerParameter = {
  type: string;
  beer: Beer;
};

type ActionWithIndexParameter = {
  type: string;
  index: string;
};

type Action = ActionWithNoParameters | ActionWithBeerParameter | ActionWithIndexParameter;

import * as actionTypes from '../constants/action-types';

/*
 COLLECTION
 */

export const loadCollection = (): Action => {
  return {
    type: actionTypes.LOAD_COLLECTION
  };
};

export const addBeer = (beer: Beer): Action => {
  return {
    type: actionTypes.ADD_BEER,
    beer
  };
};

export const updateBeer = (beer: Beer): Action => {
  return {
    type: actionTypes.UPDATE_BEER,
    beer
  }
};

export const deleteBeer = (index: string): Action => {
  return {
    type: actionTypes.DELETE_BEER,
    index
  }
};

/*
 NAVIGATION
 */


export const setCurrentBeer = (beer: Beer): Action => {
  return {
    type: actionTypes.SET_CURRENT_BEER,
    beer
  }
};

export const resetCurrentBeer = (): Action => {
  return {
    type: actionTypes.RESET_CURRENT_BEER
  }
};

