// @flow
import type { Beer, BeerFormValues } from '../../../types/types';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateBeer, setCurrentBeer} from '../../../actions';
import Form from '../beer-form/BeerForm';

class BeerEdit extends Component {
  props: {
    params: Object;
    currentBeer: Beer;
    collection: Array<Beer>;
    setCurrentBeer: Function;
    updateBeer: Function;
  };

  componentWillMount(): void {
    const beerId: string = this.props.match.params.beerId;

    if (beerId) {
      // Find beer in collection and store it in state
      this.props.setCurrentBeer(this.findBeerInCollection(beerId));
    }
  }

  findBeerInCollection(beerId: string) {
    return this.props.collection.find((element: Beer) => {
      return element.id === beerId;
    });
  }

  submitHandler = (formValues: BeerFormValues, imageUrl: string): void => {
    let beer: Beer = {
      id: this.props.currentBeer.id,
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin,
      image: imageUrl
    };

    this.props.updateBeer(beer);
  }

  render() {
    return (
        <section>
          <h1>Edit beer from your collection</h1>
          <Form onSubmit={this.submitHandler} />
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
