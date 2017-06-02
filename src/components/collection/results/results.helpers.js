// @flow
import type { Beer } from "../../../types/beer.types";

import { getLabelStyle } from "../../../helpers/style.helpers";

export const getResults = (
  collection: Array<Beer>,
  filterRegex: Object,
  currentPage: number,
  resultsPerPage: number
): Array<Beer> => {
  const results = collection.filter(
    (beer: Beer) => (filterRegex ? filterRegex.test(beer.name) : true)
  );

  const offset = (currentPage ? currentPage - 1 : 0) * resultsPerPage;

  return results.slice(offset, offset + resultsPerPage);
};

export const getBeerTypeLabelStyle = (
  type: string,
  allBeerTypes: Array<string>
) => {
  const typeIndex: number = allBeerTypes.findIndex(
    (currentType: string) => currentType === type
  );
  return getLabelStyle(typeIndex, allBeerTypes.length);
};
