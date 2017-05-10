// @flow
import type {Beer} from '../../../types/beer.types';

import React, {PureComponent} from 'react';

import {Link} from 'react-router-dom';

import logo from '../../../assets/images/logo.png';

class Results extends PureComponent {
  props: {
    collection: Array<Beer>,
    filterRegex: Object,
    resultsPerPage: number,
    currentPage: number
  };

  getResults = () => {
    const results = this.props.collection.filter((beer: Beer) =>
        this.props.filterRegex ? this.props.filterRegex.test(beer.name) : true
    );

    const offset = (this.props.currentPage ? this.props.currentPage - 1 : 0) * this.props.resultsPerPage;

    return results.slice(offset, offset + this.props.resultsPerPage).map((beer: Beer) => {
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
          {this.getResults()}
        </div>
    );
  }
}

export default Results;
