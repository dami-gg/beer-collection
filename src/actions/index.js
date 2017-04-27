// @flow
import type { User, Beer } from '../types';

type ActionWithNoParameters = {
  type: string;
};

type ActionWithUserParameter = {
  type: string;
  user: User;
};

type ActionWithBeerParameter = {
  type: string;
  beer: Beer;
};

type ActionWithIndexParameter = {
  type: string;
  index: string;
};

type Action = ActionWithNoParameters | ActionWithUserParameter | ActionWithBeerParameter | ActionWithIndexParameter;

import * as actionTypes from '../constants';

/*
 COLLECTION
 */

export const addBeer = (beer: Beer): Action => {
  return {
    type: actionTypes.ADD_BEER_TO_DATABASE,
    beer
  };
};

export const updateBeer = (beer: Beer): Action => {
  return {
    type: actionTypes.UPDATE_BEER_IN_DATABASE,
    beer
  };
};

export const deleteBeer = (beer: Beer): Action => {
  return {
    type: actionTypes.DELETE_BEER_FROM_DATABASE,
    beer
  };
};

/*
 NAVIGATION
 */

export const logUserIn = (user: User): Action => {
  return {
    type: actionTypes.LOG_USER_IN,
    user
  };
};

export const logUserOut = (): Action => {
  return {
    type: actionTypes.LOG_USER_IN
  };
};

export const setCurrentBeer = (beer: Beer): Action => {
  return {
    type: actionTypes.SET_CURRENT_BEER,
    beer
  };
};

export const resetCurrentBeer = (): Action => {
  return {
    type: actionTypes.RESET_CURRENT_BEER
  };
};
