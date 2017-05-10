// @flow
import type {User} from '../types';

type AuthenticationState = {
  user: ?User;
};

import {LOG_USER_IN, LOG_USER_OUT} from '../actions/authentication.actions';

const initialState = {
  user: undefined,
};

const authentication = (state: AuthenticationState = initialState, action: Object): AuthenticationState => {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        ...state,
        user: action.user
      };

    case LOG_USER_OUT:
      return {
        ...state,
        user: initialState.user
      };

    default:
      return state;
  }
};

export default authentication;
