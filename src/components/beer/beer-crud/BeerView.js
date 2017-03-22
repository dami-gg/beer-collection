// @flow
import type {Beer} from '../../../types/types';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateBeer, setCurrentBeer} from '../../../actions';
import Form from '../beer-form/BeerForm';

class BeerView extends Component {
  props:{
    params: Object;
    currentBeer: Beer;
    collection: Array<Beer>;
    setCurrentBeer: Function;
  };

  componentWillMount():void {
    const beerId:string = this.props.match.params.beerId;

    if (beerId) {
      // Find beer in collection and store it in state
      this.props.setCurrentBeer(this.findBeerInCollection(beerId));
    }
  }

  findBeerInCollection(beerId:string) {
    return this.props.collection.find((element:Beer) => {
      return element.id === beerId;
    });
  }

  submitHandler = ():void => {
    // Route to edit beer
  }

  cancelHandler = ():void => {
    // Route to collection
  }

  render() {
    return (
        <section>
          <h1>{this.props.currentBeer && this.props.currentBeer.name}</h1>
          <Form onSubmit={this.submitHandler}
                onCancel={this.cancelHandler}
                readOnly={true}
                submitButtonLabel="Edit"
                cancelButtonLabel="Back"
                currentImage={this.props.currentBeer && this.props.currentBeer.image} />
        </section>
    );
  }
}

const mapStateToProps = (state:Object):Object => ({
  collection: state.collection,
  currentBeer: state.navigation.currentBeer
});

const mapDispatchToProps = (dispatch:Function):Object => {
  return {
    updateBeer: (beer:Beer) => {
      dispatch(updateBeer(beer));
    },

    setCurrentBeer: (beer:Beer) => {
      dispatch(setCurrentBeer(beer));
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BeerView);
