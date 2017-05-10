// @flow

import type {Beer} from './beer.types';
import type {User} from './user.types';

export type ActionWithNoParameters = {
  type: string;
};

export type ActionWithUserParameter = {
  type: string;
  user: User;
};

export type ActionWithBeerParameter = {
  type: string;
  beer: Beer;
};
