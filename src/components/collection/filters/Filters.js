// @flow
import React, { PureComponent } from "react";

import SearchBox from "../../common/search-box/SearchBox";
import Pagination from "../../common/pagination/Pagination";
import DropdownFilter from "../../common/dropdown-filter/DropdownFilter";

const TOTAL_PAGE_BUTTONS: number = 7;

import { getRegularExpression } from "./filters.helpers";

import './filters.scss';

class Filters extends PureComponent {
  allBeerTypesLabel: string = 'All types';
  
  props: {
    numItems: number,
    resultsPerPage: number,
    currentPage: number,
    onSearchFilterUpdate: Function,
    onPageChange: Function,
    allBeerTypes: Array<string>,
    onTypeFilterUpdate: Function
  };

  updateSearchFilter = (event: Object) => {
    const regex = getRegularExpression(event.target.value);
    this.props.onSearchFilterUpdate(regex);
  };

  updateTypeFilter = (type: string) => {
    this.props.onTypeFilterUpdate(type !== this.allBeerTypesLabel ? type : undefined);
  };

  render() {
    return (
      <div className="filters">
        <SearchBox
          className="filters__filter filters__filter--search"
          changeHandler={this.updateSearchFilter}
        />

        <DropdownFilter
          className="filters__filter filters__filter--type"
          type="type"
          values={this.props.allBeerTypes}
          allOptionsLabel={this.allBeerTypesLabel}
          onOptionSelected={this.updateTypeFilter}
        />

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
