// @flow
import type { Beer } from "../../types/beer.types";

import { RESULTS_PER_PAGE } from "./collection.constants";

export const findBeerInCollectionById = (
  id: string,
  collection: Array<Beer>
): any => collection.find((element: Beer) => element.id === id);

export const getAllBeerTypes = (collection: Array<Beer>) =>
  collection.reduce((accumulator: Array<any>, current: Beer) => {
    if (!accumulator.find(element => element === current.type)) {
      accumulator.push(current.type);
    }
    return accumulator;
  }, []);

export const getAllBeerOrigins = (collection: Array<Beer>) =>
  collection.reduce((accumulator: Array<any>, current: Beer) => {
    if (!accumulator.find(element => element === current.origin)) {
      accumulator.push(current.origin);
    }
    return accumulator;
  }, []);

export const getPaginatedBeers = (
  collection: Array<Beer> = [],
  page: number = 1
): Array<Beer> =>
  collection.slice(RESULTS_PER_PAGE * (page - 1), RESULTS_PER_PAGE * page - 1);

export const preloadBeerImages = (beersToPreload: Array<Beer> = []): void => {
  beersToPreload.forEach((beer: Beer) => preloadBeerImage(beer));
};

export const preloadBeerImage = (beer: Beer): void => {
  if (beer && beer.image) {
    let image = new Image();
    image.src = beer.image;
  }
};

export const preloadCollectionImagesForPage = (
  collection: Array<Beer> = [],
  page: number = 1
) => preloadBeerImages(getPaginatedBeers(collection, page));
