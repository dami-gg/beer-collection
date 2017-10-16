// @flow
import type { Beer } from "../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Filters from "./filters/Filters";
import Results from "./results/Results";
import FloatingButton from "../common/floating-button/FloatingButton";

import { ALL_FILTER_OPTION } from "./collection.constants";
import {
  getAllBeerTypes,
  getAllBeerOrigins,
  getFilteredBeers,
  getBeersForPage,
  preloadCollectionImagesForPage,
  exportAsCsvFile
} from "./collection.helpers";

import "./collection.scss";

type Props = {
  collection: Array<Beer>,
  match: Object,
  location: Object,
  history: Object
}

type State = {
  searchFilterRegex?: Object,
  typeFilter?: string,
  originFilter?: string,
  currentPage: number,
  nextPagePreloaded: boolean,
  filteredBeers: Array<any>,
  beersInCurrentPage: Array<any>
};

export class Collection extends Component<Props, State> {
  navigateToPage: Function;
  redirectToAddPage: Function;
  allBeerTypes: Array<string>;
  allBeerOrigins: Array<string>;

  constructor(props: Props) {
    super(props);

    this.state = {
      searchFilterRegex: undefined,
      typeFilter: ALL_FILTER_OPTION,
      originFilter: ALL_FILTER_OPTION,
      currentPage: 1,
      nextPagePreloaded: false,
      filteredBeers: [],
      beersInCurrentPage: []
    };

    this.navigateToPage = this.navigateToPage.bind(this);
    this.redirectToAddPage = this.redirectToAddPage.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.exportAsCsvFile = this.exportAsCsvFile.bind(this);
  }

  componentWillMount(): void {
    this.allBeerTypes = getAllBeerTypes(this.props.collection);
    this.allBeerOrigins = getAllBeerOrigins(this.props.collection);

    this.setState({
      nextPagePreloaded: false
    });

    this.updateResults();
  }

  componentDidMount(): void {
    if (!this.state.nextPagePreloaded) {
      // Preload images for fast load of the next page of the collection in case the user navigates there
      preloadCollectionImagesForPage(
        this.props.collection,
        this.state.currentPage + 1
      );

      this.setState({ nextPagePreloaded: true });
    }
  }

  navigateToPage = (currentPage: number): void => {
    this.updateResults({ currentPage });
  };

  redirectToAddPage = (): void => {
    this.props.history.push("/beer/add");
  };

  updateFilter = (filter: Object): void => {
    this.updateResults({
      ...filter,
      currentPage: 1
    });
  };

  updateResults = (newState?: Object): void => {
    const filteredBeers = getFilteredBeers(
      this.props.collection,
      (newState && newState.searchFilterRegex) || this.state.searchFilterRegex,
      (newState && newState.typeFilter) || this.state.typeFilter,
      (newState && newState.originFilter) || this.state.originFilter
    );

    const beersInCurrentPage = getBeersForPage(
      filteredBeers,
      (newState && newState.currentPage) || this.state.currentPage
    );

    this.setState({ ...newState, filteredBeers, beersInCurrentPage });
  };

  exportAsCsvFile = (): void => {
    exportAsCsvFile(this.props.collection, "collection.csv");
  };

  render() {
    return (
      <div className="collection">
        <Filters
          numItems={this.state.filteredBeers.length}
          currentPage={this.state.currentPage}
          onPageChange={this.navigateToPage}
          allBeerTypes={this.allBeerTypes}
          allBeerOrigins={this.allBeerOrigins}
          onFilterUpdate={this.updateFilter}
        />

        <Results
          results={this.state.beersInCurrentPage}
          allBeerTypes={this.allBeerTypes}
          allBeerOrigins={this.allBeerOrigins}
        />

        <div className="collection__floating-buttons">
          <FloatingButton
            iconClass="fa fa-download"
            label="Export as CSV file"
            buttonColor="grey"
            iconColor="white"
            clickHandler={this.exportAsCsvFile}
          />

          <FloatingButton
            iconClass="fa fa-plus"
            label="Add a new beer"
            buttonColor="green"
            iconColor="white"
            clickHandler={this.redirectToAddPage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  collection: state.collection
});

export default withRouter(connect(mapStateToProps)(Collection));
