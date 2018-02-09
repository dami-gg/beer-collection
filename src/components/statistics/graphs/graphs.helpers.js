// @flow
import type { Beer } from "../../../types/beer.types";

import {
  RATINGS_LABELS,
  NOT_RATED_KEY
} from "../../beer-pages/ratings/ratings.constants";

/**
 * Produces data related to beers origin in a format readable by the charting library:
 *  - Array of objects which contain two properties: origin and count
 */
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

/**
 * Produces data related to beers ratings in a format readable by the charting library:
 *  - Array of objects which contain two properties: rating and count
 */
export const getRatingData = (collection: Array<Beer>) => {
  let ratingsCounts: Array<
    Object
  > = RATINGS_LABELS.reduce((accumulator: Array<Object>, current) => {
    accumulator.push({ rating: current, count: 0 });
    return accumulator;
  }, []);

  let index: number;

  return collection.reduce((accumulator: Array<Object>, current: Beer) => {
    index = accumulator.findIndex(
      element =>
        element.rating === (current.rating ? current.rating : NOT_RATED_KEY)
    );

    if (index !== -1) {
      accumulator[index].count++;
    }

    return accumulator;
  }, ratingsCounts);
};
