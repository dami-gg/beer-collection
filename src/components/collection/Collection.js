// @flow
import type {Beer} from '../../types/types';

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';

import logo from '../../assets/images/logo.png';

import './collection.scss';

class Collection extends Component {
  props:{
    collection: Array<Beer>;
  };

  render() {
    let beerList = this.props.collection.map((beer:Beer) => {
      return (
          <Col className="beer" xs={12} sm={3} md={1}
               key={beer.id}>
            <Link to={`/beer/edit/${beer.id}`}>
              <img src={beer.image || logo} className="beer__image" alt="beer-logo"/>
              <p className="beer__name">{beer.name}</p>
            </Link>
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

const mapStateToProps = (state:Object) => ({
  collection: state.collection
});

export default connect(
    mapStateToProps
)(Collection);
