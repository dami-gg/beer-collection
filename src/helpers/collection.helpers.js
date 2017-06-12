// @flow
import type { Beer } from "../types/beer.types";

import { v4 } from "node-uuid";

export const findItemInCollectionById = (id: string, collection: Array<Beer>) =>
  collection.find(element => element.id === id);

export const getAllBeerTypes = (collection: Array<Beer>) =>
  collection.reduce((accumulator: Array<string>, current: Beer) => {
    if (!accumulator.find(element => element === current.type)) {
      accumulator.push(current.type);
    }
    return accumulator;
  }, []);

export const getAllBeerOrigins = (collection: Array<Beer>) =>
  collection.reduce((accumulator: Array<string>, current: Beer) => {
    if (!accumulator.find(element => element === current.origin)) {
      accumulator.push(current.origin);
    }
    return accumulator;
  }, []);

export const prepareNewBeerForStorage = (beer: Beer) => {
  beer.id = v4();
  beer.type = beer.type || '';
  beer.origin = beer.origin || '';
  beer.image = beer.image || '';
  beer.rating = beer.rating || '';

  return beer;
};