// @flow

import type { Beer, User } from '../types';

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
