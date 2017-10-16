// @flow
import type { Beer } from "../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import Dashboard from "../dashboard/Dashboard";
import { PAGE_OPTIONS } from "./home.constants";
import { RESULTS_PER_PAGE } from "../collection/collection.constants";
import { preloadBeerImage } from "../collection/collection.helpers";

type Props = {
  collection: Array<Beer>
};

export class Home extends Component<Props> {
  componentDidUpdate(): void {
    // Preload images for fast load of the first page of the collection in case the user navigates there
    if (
      this.props.collection.length &&
      this.props.collection.length <= RESULTS_PER_PAGE
    ) {
      preloadBeerImage(this.props.collection[this.props.collection.length - 1]);
    }
  }

  render() {
    return (
      <div className="home">
        <Dashboard items={PAGE_OPTIONS} />
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  collection: state.collection
});

export default connect(mapStateToProps)(Home);
