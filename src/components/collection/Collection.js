// @flow
import type {Beer} from '../../types/beer.types';

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import SearchBox from '../common/search-box/SearchBox';
import FloatingButton from '../common/floating-button/FloatingButton';
import Pagination from '../common/pagination/Pagination';

import logo from '../../assets/images/logo.png';

import './collection.scss';

const RESULTS_PER_PAGE: number = 20;
const TOTAL_PAGE_BUTTONS: number = 7;

export class Collection extends Component {
  props: {
    collection: Array<Beer>,
    match: Object,
    location: Object,
    history: Object
  };

  constructor(props) {
    super(props);

    this.state = {
      filterRegex: null,
      currentPage: 1
    };
  }

  getResults = () => {
    const results = this.props.collection.filter((beer: Beer) =>
        this.state.filterRegex ? this.state.filterRegex.test(beer.name) : true
    );

    const offset = (this.state.currentPage ? this.state.currentPage - 1 : 0) * RESULTS_PER_PAGE;

    return results.slice(offset, offset + RESULTS_PER_PAGE).map((beer: Beer) => {
      return (
          <Link to={`/beer/view/${beer.id}`}
                className="beer" key={beer.id}>
            <img src={beer.image || logo}
                 className="img-responsive img-rounded beer__image"
                 alt="beer-logo"/>
            <p className="beer__name">{beer.name}</p>
          </Link>
      );
    });
  }

  updateFilter = event => {
    const query = event.target.value;
    const invalid = /[°"§%()\[\]\/{}=\\?´`'#<>|,;.:+_-]+/g;
    const filter = query.replace(invalid, '');
    const regex = new RegExp(filter, 'i');

    this.setState({
      filterRegex: regex
    });
  }

  redirectToAddPage = (): void => {
    this.props.history.push('/beer/add');
  }

  navigateToPage = (page: number): void => {
    this.setState({currentPage: page});
  }

  render() {
    return (
        <div className="collection">
          <div className="collection__filters">
            <SearchBox
                className="collection__filters__search"
                changeHandler={this.updateFilter}>
            </SearchBox>
            <Pagination
                className="collection__filters__pagination"
                numItems={this.props.collection.length}
                currentPage={this.state.currentPage}
                resultsPerPage={RESULTS_PER_PAGE}
                totalPageButtons={TOTAL_PAGE_BUTTONS}
                onNavigation={this.navigateToPage}>
            </Pagination>
          </div>
          <div className="collection__results">{this.getResults()}</div>
          <FloatingButton
              iconClass="fa fa-plus"
              label="Add a new beer"
              buttonColor="green"
              iconColor="white"
              clickHandler={this.redirectToAddPage}>
          </FloatingButton>
        </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  collection: state.collection
});

export default withRouter(
    connect(
        mapStateToProps
    )(Collection)
);
