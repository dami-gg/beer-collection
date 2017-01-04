import * as types from '../constants/action-types';

const initialState = [];

const collection = (state = initialState, action) => {
  switch(action.type) {
    case types.LOAD_COLLECTION_SUCCESS:
      return action.collection;

    case types.LOAD_COLLECTION_ERROR:
      return [];

    case types.ADD_BEER_SUCCESS:
      return [
          ...state,
          action.beer
      ];

    case types.ADD_BEER_ERROR:
      return state;

    case types.EDIT_BEER:
      return [
          ...state.slice(0, action.index),
          action.beer,
          ...state.slice(action.index + 1)
      ];

    case types.DELETE_BEER:
      return [
          ...state.slice(0, action.index),
          ...state.slice(action.index + 1)
      ];

    default:
      return state;
  }
};

export default collection;
