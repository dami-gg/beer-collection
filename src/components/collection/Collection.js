// @flow
import type { Beer } from "../../types/beer.types";

type State = {
  searchFilterRegex?: Object,
  typeFilter?: string,
  originFilter?: string,
  currentPage: number
};

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Filters from "./filters/Filters";
import Results from "./results/Results";
import FloatingButton from "../common/floating-button/FloatingButton";

import {getAllBeerTypes, getAllBeerOrigins} from '../../helpers/collection.helpers';
import "./collection.scss";

const RESULTS_PER_PAGE: number = 18;

export class Collection extends Component {
  state: State;
  navigateToPage: Function;
  updateSearchFilterRegex: Function;
  redirectToAddPage: Function;
  updateTypeFilter: Function;
  allBeerTypes: Array<string>;
  allBeerOrigins: Array<string>;

  props: {
    collection: Array<Beer>,
    match: Object,
    location: Object,
    history: Object
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      searchFilterRegex: undefined,
      typeFilter: undefined,
      originFilter: undefined,
      currentPage: 1
    };

    this.navigateToPage = this.navigateToPage.bind(this);
    this.updateSearchFilterRegex = this.updateSearchFilterRegex.bind(this);
    this.redirectToAddPage = this.redirectToAddPage.bind(this);
    this.updateTypeFilter = this.updateTypeFilter.bind(this);
  }

  componentWillMount(): void {
    this.allBeerTypes = getAllBeerTypes(this.props.collection);
    this.allBeerOrigins = getAllBeerOrigins(this.props.collection);
  }

  updateSearchFilterRegex(searchFilterRegex: Object): void {
    this.setState({ searchFilterRegex });
  }

  navigateToPage = (currentPage: number): void => {
    this.setState({ currentPage });
  };

  redirectToAddPage = (): void => {
    this.props.history.push("/beer/add");
  };

  updateTypeFilter = (type: string): void => {
    this.setState({typeFilter: type});
  };

  updateOriginFilter = (origin: string): void => {
    this.setState({originFilter: origin});
  };

  render() {
    return (
      <div className="collection">
        <Filters
          numItems={this.props.collection.length}
          resultsPerPage={RESULTS_PER_PAGE}
          currentPage={this.state.currentPage}
          onSearchFilterUpdate={this.updateSearchFilterRegex}
          onPageChange={this.navigateToPage}
          allBeerTypes={this.allBeerTypes}
          onTypeFilterUpdate={this.updateTypeFilter}
          allBeerOrigins={this.allBeerOrigins}
          onOriginFilterUpdate={this.updateOriginFilter}
        />

        <Results
          collection={this.props.collection}
          searchFilterRegex={this.state.searchFilterRegex}
          resultsPerPage={RESULTS_PER_PAGE}
          currentPage={this.state.currentPage}
          allBeerTypes={this.allBeerTypes}
          typeFilter={this.state.typeFilter}
          allBeerOrigins={this.allBeerOrigins}
          originFilter={this.state.originFilter}
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
