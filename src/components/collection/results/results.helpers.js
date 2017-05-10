// @flow
import type {Beer} from '../../../types/beer.types';

export const getResults = (collection: Array<Beer>,
                           filterRegex: Object,
                           currentPage: number,
                           resultsPerPage: number): Array<Beer> => {

  const results = collection.filter((beer: Beer) =>
      filterRegex ? filterRegex.test(beer.name) : true
  );

  const offset = (currentPage ? currentPage - 1 : 0) * resultsPerPage;

  return results.slice(offset, offset + resultsPerPage);
};
