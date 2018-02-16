// @flow
import type { Beer } from "../../../types/beer.types";

import React, { PureComponent } from "react";

import { Link } from "react-router-dom";
import ErrorBoundary from "../../common/error-boundary/ErrorBoundary";

import placeholderLabel from "../../../assets/images/label.png";

import { getBeerTypeLabelStyle } from "./results.helpers";

import "./results.scss";

type Props = {
  results: Array<Beer>,
  allBeerTypes: Array<string>,
  allBeerOrigins: Array<string>
};

class Results extends PureComponent<Props> {
  getResultLinks() {
    return this.props.results.map((beer: Beer) => {
      return (
        <ErrorBoundary key={beer.id}>
          <Link to={`/beer/view/${beer.id}`} className="beer">
            <ul
              className={`beer__card ${!beer.image
                ? "beer__card--placeholder"
                : ""}`}>
              <li className="beer__cover">
                <div
                  className="beer__type"
                  style={getBeerTypeLabelStyle(
                    beer.type || "",
                    this.props.allBeerTypes
                  )}>
                  {beer.type}
                </div>
                <img
                  className="beer__image"
                  width="180"
                  height="180"
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
        </ErrorBoundary>
      );
    });
  }

  render() {
    return <div className="results">{this.getResultLinks()}</div>;
  }
}

export default Results;
