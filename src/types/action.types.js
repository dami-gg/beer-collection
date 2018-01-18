// @flow

import type { Beer } from "./beer.types";
import type { User } from "./user.types";
import type { Image } from "./image.types";

export type ActionWithNoParameters = {
  type: string
};

export type ActionWithUserParameter = {
  type: string,
  user: User
};

export type ActionWithBeerParameter = {
  type: string,
  beer: Beer
};

export type ActionWithImageParameter = {
  type: string,
  image: Image
};
