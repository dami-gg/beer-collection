// @flow
import type { Beer, BeerFormValues } from '../../types/types';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateBeer, setCurrentBeer} from '../../actions';
import Form from './BeerForm';

class BeerEdit extends Component {
  props: {
    params: Object;
    currentBeer: Beer;
    collection: Array<Beer>;
    setCurrentBeer: Function;
    updateBeer: Function;
  };

  componentWillMount(): void {
    if (this.props.params.beerId) {
      // Find beer in collection and store it in state
      this.props.setCurrentBeer(this.findBeerInCollection(this.props.params.beerId));
    }
  }

  findBeerInCollection(beerId: string) {
    return this.props.collection.find((element: Beer) => {
      return element.id === beerId;
    });
  }

  handleSubmit = (formValues: BeerFormValues): void => {
    let beer: Beer = {
      id: this.props.currentBeer.id,
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin,
      image: formValues.image
    };

    this.props.updateBeer(beer);
  }

  render() {
    return (
        <section>
          <h1>Edit beer from your collection</h1>
          <Form onSubmit={this.handleSubmit} />
        </section>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection,
  currentBeer: state.navigation.currentBeer
});

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    updateBeer: (beer: Beer) => {
      dispatch(updateBeer(beer));
    },

    setCurrentBeer: (beer: Beer) => {
      dispatch(setCurrentBeer(beer));
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BeerEdit);
