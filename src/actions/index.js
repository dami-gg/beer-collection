import * as types from '../constants/action-types';
import database from '../common/database';

/*
 COLLECTION
 */

export const loadCollection = () => {
  return dispatch => {
    return database.ref('/').once('value', snap => {
      debugger;
      const collection = snap.val();
      dispatch(loadCollectionSuccessAction(collection))
    })
        .catch((error) => {
          // TODO Log error
          debugger;
          dispatch(loadCollectionErrorAction(error));
        });
  }
};

export const addBeer = (beer) => {
  return dispatch => {
    debugger;
    database.ref('/').push({
      beer
    })
        .then(() => {
          debugger;
          dispatch(addBeerSuccessAction(beer));
        })
        .catch((error) => {
          debugger;
          dispatch(addBeerErrorAction(error));
        });
  }
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

/*
 PRIVATE METHODS
 */

function loadCollectionSuccessAction(collection) {
  return {
    type: types.LOAD_COLLECTION_SUCCESS,
    collection
  };
}

function loadCollectionErrorAction(error) {
  return {
    type: types.LOAD_COLLECTION_ERROR,
    error: error
  }
}

function addBeerSuccessAction(beer) {
  return {
    type: types.ADD_BEER_SUCCESS,
    beer
  };
}

function addBeerErrorAction(error) {
  return {
    type: types.ADD_BEER_ERROR,
    error: error
  }
}
