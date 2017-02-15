// @flow
import type { Beer } from '../../types/types';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Col} from 'react-bootstrap';

import logo from '../../assets/images/logo.png';

import './collection.scss';

class Collection extends Component {
  props: {
    collection: Array<Beer>;
  };

  navigateToDetailPage(id: string) {
    hashHistory.push(`/beer/edit/${id}`);
  }

  render() {
    let beerList = this.props.collection.map((beer: Beer) => {
      return (
          <Col className="beer" xs={12} sm={3} md={1}
               onClick={() => this.navigateToDetailPage(beer.id)}>
            <img src={beer.image || logo} className="beer__image" alt="beer-logo"/>
            <p className="beer__name">{beer.name}</p>
          </Col>
      );
    });

    return (
        <div className="collection">
          {beerList}
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
