// @flow
import React, {PureComponent} from 'react';

import SearchBox from '../../common/search-box/SearchBox';
import Pagination from '../../common/pagination/Pagination';

const TOTAL_PAGE_BUTTONS: number = 7;

import {getRegularExpression} from './filters.helpers';

class Filters extends PureComponent {
  props: {
    numItems: number,
    resultsPerPage: number,
    currentPage: number,
    onFilterUpdate: Function,
    onPageChange: Function
  };

  updateFilter = (event: Object) => {
    const regex = getRegularExpression(event.target.value);
    this.props.onFilterUpdate(regex);
  }

  render() {
    return (
        <div className="collection__filters">
          <SearchBox
              className="collection__filters__search"
              changeHandler={this.updateFilter}>
          </SearchBox>

          <Pagination
              className="collection__filters__pagination"
              numItems={this.props.numItems}
              currentPage={this.props.currentPage}
              resultsPerPage={this.props.resultsPerPage}
              totalPageButtons={TOTAL_PAGE_BUTTONS}
              onNavigation={this.props.onPageChange}>
          </Pagination>
        </div>
    );
  }
}

export default Filters;
