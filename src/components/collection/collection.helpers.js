// @flow
import type { Beer } from "../../types/beer.types";

import { RESULTS_PER_PAGE, ALL_FILTER_OPTION } from "./collection.constants";

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

export const getFilteredBeers = (
  collection: Array<Beer>,
  filterRegex?: Object,
  typeFilter?: string,
  originFilter?: string
): Array<Beer> => {
  return collection.filter((beer: Beer) =>
    applyFilters(beer, filterRegex, typeFilter, originFilter)
  );
};

const applyFilters = (
  beer: Beer,
  filterRegex?: Object,
  typeFilter?: string,
  originFilter?: string
): boolean => {
  if (filterRegex && !filterRegex.test(beer.name)) {
    return false;
  }
  if (
    typeFilter &&
    beer.type !== typeFilter &&
    typeFilter !== ALL_FILTER_OPTION
  ) {
    return false;
  }
  if (
    originFilter &&
    beer.origin !== originFilter &&
    originFilter !== ALL_FILTER_OPTION
  ) {
    return false;
  }

  return true;
};

export const getBeersForPage = (
  beers: Array<Beer>,
  currentPage: number
): Array<Beer> => {
  const offset = (currentPage ? currentPage - 1 : 0) * RESULTS_PER_PAGE;

  return beers.slice(offset, offset + RESULTS_PER_PAGE);
};

const COLUMN_DELIMITER: string = ",";
const LINE_DELIMITER: string = "\r\n";

const convertCollectionToCsv = (collection: Array<Beer>): string => {
  let csv: string = "";

  collection.forEach((beer: Beer, index: number) => {
    csv += `${beer.id}${COLUMN_DELIMITER}
            ${beer.name}${COLUMN_DELIMITER}
            ${beer.type ? beer.type : ""}${COLUMN_DELIMITER}
            ${beer.origin ? beer.origin : ""}${COLUMN_DELIMITER}
            ${beer.image ? beer.image : ""}${COLUMN_DELIMITER}
            ${beer.rating ? beer.rating : ""}${LINE_DELIMITER}`;
  });

  return csv;
};

export const exportAsCsvFile = (
  collection: Array<Beer>,
  fileName?: string
): void => {
  if (!collection || !collection.length) {
    return;
  }

  let csv = "data:text/csv;charset=utf-8," + convertCollectionToCsv(collection);

  let link = document.createElement("a");
  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", fileName || "export.csv");
  link.click();
};
