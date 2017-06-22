// @flow
import React, { PureComponent } from "react";

import SearchBox from "../../common/search-box/SearchBox";
import Pagination from "../../common/pagination/Pagination";
import DropdownFilter from "../../common/dropdown-filter/DropdownFilter";

import { getRegularExpression } from "./filters.helpers";

import { RESULTS_PER_PAGE, ALL_FILTER_OPTION } from "../collection.constants";

import "./filters.scss";

const TOTAL_PAGE_BUTTONS: number = 7;

class Filters extends PureComponent {
  allBeerTypesLabel: string = "All types";
  allBeerOriginsLabel: string = "All origins";

  props: {
    numItems: number,
    currentPage: number,
    onPageChange: Function,
    allBeerTypes: Array<string>,
    allBeerOrigins: Array<string>,
    onFilterUpdate: Function
  };

  updateSearchFilter = (event: Object) => {
    const searchFilterRegex = getRegularExpression(event.target.value);
    this.props.onFilterUpdate({ searchFilterRegex });
  };

  updateTypeFilter = (type: string) => {
    this.props.onFilterUpdate({
      typeFilter: type !== this.allBeerTypesLabel ? type : ALL_FILTER_OPTION
    });
  };

  updateOriginFilter = (origin: string) => {
    this.props.onFilterUpdate({
      originFilter: origin !== this.allBeerOriginsLabel
        ? origin
        : ALL_FILTER_OPTION
    });
  };

  render() {
    return (
      <div className="filters">
        <SearchBox
          className="filters__filter filters__filter--search"
          changeHandler={this.updateSearchFilter}
        />

        <div className="filters__dropdowns">
          <DropdownFilter
            className="filters__filter filters__filter--type"
            type="type"
            values={this.props.allBeerTypes}
            allOptionsLabel={this.allBeerTypesLabel}
            onOptionSelected={this.updateTypeFilter}
          />

          <DropdownFilter
            className="filters__filter filters__filter--origin"
            type="origin"
            values={this.props.allBeerOrigins}
            allOptionsLabel={this.allBeerOriginsLabel}
            onOptionSelected={this.updateOriginFilter}
          />
        </div>

        <Pagination
          className="filters__filter filters__filter--pagination"
          numItems={this.props.numItems}
          currentPage={this.props.currentPage}
          resultsPerPage={RESULTS_PER_PAGE}
          totalPageButtons={TOTAL_PAGE_BUTTONS}
          onNavigation={this.props.onPageChange}
        />
      </div>
    );
  }
}

export default Filters;
