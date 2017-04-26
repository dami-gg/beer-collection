// @flow
import type {Beer} from '../../types';

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import SearchBox from '../search-box/SearchBox';

import logo from '../../assets/images/logo.png';

import './collection.scss';

class Collection extends Component {
  props: {
    collection: Array<Beer>;
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

  render() {
    return (
        <div className="collection">
          <SearchBox changeHandler={this.updateFilter}></SearchBox>
          <div className="results">{this.getResults()}</div>
        </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  collection: state.collection
});

export default connect(
    mapStateToProps
)(Collection);
