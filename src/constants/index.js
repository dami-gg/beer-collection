// @flow

/*
  GENERAL
 */

export const AUTHENTICATING_KEY = 'authenticating';
export const RESULTS_PER_PAGE = 20;

/*
 COLLECTION ACTION TYPES
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
 NAVIGATION ACTION TYPES
 */

export const LOG_USER_IN: string = 'LOG_USER_IN';
export const LOG_USER_OUT: string = 'LOG_USER_OUT';

export const SET_CURRENT_BEER: string = 'SET_CURRENT_BEER';
export const RESET_CURRENT_BEER: string = 'RESET_CURRENT_BEER';
