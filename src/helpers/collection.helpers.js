// @flow
import type { Beer } from "../types/beer.types";

export const findBeerInCollectionById = (id: string, collection: Array<Beer>) : any =>
  collection.find((element: Beer) => element.id === id);

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
