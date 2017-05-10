// @flow
import type { User } from '../types/user.types';
import type { ActionWithUserParameter, ActionWithNoParameters } from '../types/action.types';

/*
 ACTION TYPES
 */

export const LOG_USER_IN: string = 'LOG_USER_IN';
export const LOG_USER_OUT: string = 'LOG_USER_OUT';

/*
  ACTIONS
 */

export const logUserIn = (user: User): ActionWithUserParameter => {
  return {
    type: LOG_USER_IN,
    user
  };
};

export const logUserOut = (): ActionWithNoParameters => {
  return {
    type: LOG_USER_IN
  };
};
