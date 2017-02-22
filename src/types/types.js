// @flow

export type Beer = {
  id: string;
  name: string;
  type: ?string;
  origin: ?string;
  image: ?string;
};

export type BeerFormValues = {
  name: string;
  type: ?string;
  origin: ?string;
  image: ?string;
};

export type User = {
  email: string;
  displayName: string;
  photoUrl: ?string;
};
