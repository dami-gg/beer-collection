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

    case types.UPDATE_BEER_SUCCESS:
      let index = state.findIndex((element) => {
        return element.id === action.beer.id;
      });

      return [
        ...state.slice(0, index),
        action.beer,
        ...state.slice(index + 1)
      ];

    case types.UPDATE_BEER_ERROR:
      return state;

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
