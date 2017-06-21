// @flow
import React, { PureComponent } from "react";

import SearchBox from "../../common/search-box/SearchBox";
import Pagination from "../../common/pagination/Pagination";
import DropdownFilter from "../../common/dropdown-filter/DropdownFilter";

import { getRegularExpression } from "./filters.helpers";

import "./filters.scss";

const TOTAL_PAGE_BUTTONS: number = 7;

class Filters extends PureComponent {
  allBeerTypesLabel: string = "All types";
  allBeerOriginsLabel: string = "All origins";

  props: {
    numItems: number,
    resultsPerPage: number,
    currentPage: number,
    onSearchFilterUpdate: Function,
    onPageChange: Function,
    allBeerTypes: Array<string>,
    onTypeFilterUpdate: Function,
    allBeerOrigins: Array<string>,
    onOriginFilterUpdate: Function
  };

  updateSearchFilter = (event: Object) => {
    const regex = getRegularExpression(event.target.value);
    this.props.onSearchFilterUpdate(regex);
  };

  updateTypeFilter = (type: string) => {
    this.props.onTypeFilterUpdate(
      type !== this.allBeerTypesLabel ? type : undefined
    );
  };

  updateOriginFilter = (origin: string) => {
    this.props.onOriginFilterUpdate(
      origin !== this.allBeerOriginsLabel ? origin : undefined
    );
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
          resultsPerPage={this.props.resultsPerPage}
          totalPageButtons={TOTAL_PAGE_BUTTONS}
          onNavigation={this.props.onPageChange}
        />
      </div>
    );
  }
}

export default Filters;
