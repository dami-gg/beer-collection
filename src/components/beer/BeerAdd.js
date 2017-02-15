// @flow
import type { Beer, BeerFormValues } from '../../types/types';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {v4} from 'node-uuid';

import {addBeer} from '../../actions';
import Form from './BeerForm';

class BeerAdd extends Component {
  props: {
    params: Object,
    addBeer: Function
  };

  handleSubmit = (formValues: BeerFormValues): void => {
    let beer: Beer = {
      id: v4(),
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin,
      image: formValues.image
    };

    this.props.addBeer(beer);
  }

  render() {
    return (
        <section>
          <h1>Add a new beer to your collection</h1>
          <Form onSubmit={this.handleSubmit} />
        </section>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    addBeer: (beer: Beer) => {
      dispatch(addBeer(beer));
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BeerAdd);
