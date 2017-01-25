import * as types from '../constants/action-types';

/*
 COLLECTION
 */

export const loadCollection = () => {
  return {
    type: types.LOAD_COLLECTION
  };
};

export const addBeer = (beer) => {
  return {
    type: types.ADD_BEER,
    beer
  };
};

export const editBeer = (beer, index) => {
  return {
    type: types.EDIT_BEER,
    beer,
    index
  }
};

export const deleteBeer = (index) => {
  return {
    type: types.DELETE_BEER,
    index
  }
};

/*
 NAVIGATION
 */


export const setCurrentBeer = (beer) => {
  return {
    type: types.SET_CURRENT_BEER,
    beer
  }
};

export const resetCurrentBeer = () => {
  return {
    type: types.RESET_CURRENT_BEER
  }
};

