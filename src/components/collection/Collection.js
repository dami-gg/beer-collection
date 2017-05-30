// @flow
import type { Beer } from "../../types/beer.types";

type State = {
  filterRegex?: Object,
  currentPage: number
};

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Filters from "./filters/Filters";
import Results from "./results/Results";
import FloatingButton from "../common/floating-button/FloatingButton";

import "./collection.scss";

const RESULTS_PER_PAGE: number = 20;

export class Collection extends Component {
  state: State;
  navigateToPage: Function;
  updateFilterRegex: Function;
  redirectToAddPage: Function;

  props: {
    collection: Array<Beer>,
    match: Object,
    location: Object,
    history: Object
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      filterRegex: undefined,
      currentPage: 1
    };

    this.navigateToPage = this.navigateToPage.bind(this);
    this.updateFilterRegex = this.updateFilterRegex.bind(this);
    this.redirectToAddPage = this.redirectToAddPage.bind(this);
  }

  updateFilterRegex(filterRegex: Object): void {
    this.setState({ filterRegex });
  }

  navigateToPage = (currentPage: number): void => {
    this.setState({ currentPage });
  };

  redirectToAddPage = (): void => {
    this.props.history.push("/beer/add");
  };

  render() {
    return (
      <div className="collection">
        <Filters
          numItems={this.props.collection.length}
          resultsPerPage={RESULTS_PER_PAGE}
          currentPage={this.state.currentPage}
          onFilterUpdate={this.updateFilterRegex}
          onPageChange={this.navigateToPage}
        />

        <Results
          collection={this.props.collection}
          filterRegex={this.state.filterRegex}
          resultsPerPage={RESULTS_PER_PAGE}
          currentPage={this.state.currentPage}
        />

        <FloatingButton
          iconClass="fa fa-plus"
          label="Add a new beer"
          buttonColor="green"
          iconColor="white"
          clickHandler={this.redirectToAddPage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  collection: state.collection
});

export default withRouter(connect(mapStateToProps)(Collection));
