// @flow
import type { Beer } from "../../../types/beer.types";

import React, { PureComponent } from "react";

import { Link } from "react-router-dom";

import placeholderLabel from "../../../assets/images/label.png";

import { getResults, getBeerTypeLabelStyle } from "./results.helpers";

class Results extends PureComponent {
  props: {
    collection: Array<Beer>,
    filterRegex: Object,
    resultsPerPage: number,
    currentPage: number,
    allBeerTypes: Array<string>
  };  

  getResultLinks() {
    const { collection, filterRegex, currentPage, resultsPerPage } = this.props;
    const results = getResults(
      collection,
      filterRegex,
      currentPage,
      resultsPerPage
    );

    return results.map((beer: Beer) => {
      return (
        <Link to={`/beer/view/${beer.id}`} className="beer" key={beer.id}>
          <ul className="beer__card">
            <li>
              <div
                className="beer__type"
                style={getBeerTypeLabelStyle(beer.type, this.props.allBeerTypes)}
              >
                {beer.type}
              </div>
              <img
                className={`beer__image ${!beer.image ? "beer__image--placeholder" : ""}`}
                width="200"
                height="200"
                src={beer.image || placeholderLabel}
                alt={`${beer.name} logo`}
              />
            </li>
            <li>
              <h2 className="beer__name">{beer.name}</h2>
              <p className="beer__description">{beer.origin}</p>
            </li>
          </ul>
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
