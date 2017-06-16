// @flow
import type { User } from "../types/user.types";

import { LOG_USER_IN, LOG_USER_OUT } from "../actions/authentication.actions";

type AuthenticationState = {
  user: ?User
};

const initialState = {
  user: undefined
};

const authentication = (
  state: AuthenticationState = initialState,
  action: Object
): AuthenticationState => {
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
