// @flow
import type { Beer } from "../../../types/beer.types";

import { getLabelStyle } from "../../../helpers/style.helpers";

export const getResults = (
  collection: Array<Beer>,
  filterRegex: Object,
  currentPage: number,
  resultsPerPage: number,
  typeFilter?: string,
  originFilter?: string
): Array<Beer> => {
  const results = collection.filter((beer: Beer) => {
    if (filterRegex && !filterRegex.test(beer.name)) {
      return false;
    }
    if (typeFilter && beer.type !== typeFilter) {
      return false;
    }
    if (originFilter && beer.origin !== originFilter) {
      return false;
    }

    return true;
  });

  const offset = (currentPage ? currentPage - 1 : 0) * resultsPerPage;

  return results.slice(offset, offset + resultsPerPage);
};

export const getBeerTypeLabelStyle = (
  type?: string,
  allBeerTypes: Array<string>
) => {
  const typeIndex: number = allBeerTypes.findIndex(
    (currentType: string) => currentType === type
  );
  return getLabelStyle(typeIndex, allBeerTypes.length);
};
