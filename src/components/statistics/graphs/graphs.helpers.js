// @flow
import type { Beer } from "../../../types/beer.types";

import {
  RATINGS_LABELS,
  NOT_RATED_KEY
} from "../../beer-pages/rating/rating.constants";

export const getOriginData = (collection: Array<Beer>) => {
  let index: number;

  return collection.reduce((accumulator: Array<Object>, current: Beer) => {
    index = accumulator.findIndex(element => element.origin === current.origin);

    if (index !== -1) {
      accumulator[index].count++;
    } else {
      accumulator.push({ origin: current.origin, count: 1 });
    }

    return accumulator;
  }, []);
};

export const getRatingData = (collection: Array<Beer>) => {
  let ratingsCounts: Array<Object> = RATINGS_LABELS.reduce((accumulator: Array<
    Object
  >, current) => {
    accumulator.push({ name: current, value: 0 });
    return accumulator;
  }, []);

  let index: number;
  
  return collection.reduce((accumulator: Array<Object>, current: Beer) => {
    index = accumulator.findIndex(
      element =>
        element.name === (current.rating ? current.rating : NOT_RATED_KEY)
    );

    if (index !== -1) {
      accumulator[index].value++;
    }

    return accumulator;
  }, ratingsCounts);
};
