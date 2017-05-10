// @flow
import type {Beer} from '../../../types/beer.types';

import React, {PureComponent} from 'react';

import {Link} from 'react-router-dom';

import logo from '../../../assets/images/logo.png';

import {getResults} from './results.helpers';

class Results extends PureComponent {
  props: {
    collection: Array<Beer>,
    filterRegex: Object,
    resultsPerPage: number,
    currentPage: number
  };

  getResultLinks() {
    const {collection, filterRegex, currentPage, resultsPerPage} = this.props;

    return getResults(collection, filterRegex, currentPage, resultsPerPage).map((beer: Beer) => {
      return (
          <Link to={`/beer/view/${beer.id}`}
                className="beer" key={beer.id}>
            <img src={beer.image || logo}
                 className="beer__image"
                 alt={`${beer.name} logo`}/>
            <p className="beer__name">{beer.name}</p>
          </Link>
      );
    });
  }

  render() {
    return (
        <div className="collection__results">
          {this.getResultLinks()}
        </div>
    );
  }
}

export default Results;
