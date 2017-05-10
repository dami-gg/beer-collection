// @flow

export type Beer = {
  id: string;
  name: string;
  type: ?string;
  origin: ?string;
  image: ?string;
  rating: ?number;
};

export type BeerFormValues = {
  name: string;
  type: ?string;
  origin: ?string;
  image: ?string;
  rating: ?number;
};
