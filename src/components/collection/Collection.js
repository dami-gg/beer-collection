// @flow
import type {Beer} from '../../types';

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import SearchBox from '../search-box/SearchBox';
import FloatingButton from '../floating-button/FloatingButton';
import Pagination from '../pagination/Pagination';

import logo from '../../assets/images/logo.png';

import './collection.scss';

class Collection extends Component {
  props: {
    collection: Array<Beer>,
    match: Object,
    location: Object,
    history: Object
  };

  constructor(props) {
    super(props);

    this.state = {
      filterRegex: null
    };
  }

  getResults = () => {
    const results = this.props.collection.filter((beer: Beer) =>
        this.state.filterRegex ? this.state.filterRegex.test(beer.name) : true
    );

    return results.map((beer: Beer) => {
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

  render() {
    return (
        <div className="collection">
          <SearchBox changeHandler={this.updateFilter}></SearchBox>
          <Pagination></Pagination>
          <div className="results">{this.getResults()}</div>
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
