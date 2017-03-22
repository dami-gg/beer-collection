// @flow
import type {Beer, BeerFormValues} from '../../../types/types';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import {updateBeer, setCurrentBeer} from '../../../actions';
import Form from '../beer-form/BeerForm';

class BeerEdit extends Component {
  props:{
    params: Object,
    currentBeer: Beer,
    collection: Array<Beer>,
    setCurrentBeer: Function,
    updateBeer: Function,
    match: Object,
    location: Object,
    history: Object
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

  submitHandler = (formValues:BeerFormValues, imageUrl:string):void => {
    let beer:Beer = {
      id: this.props.currentBeer.id,
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin,
      image: imageUrl
    };

    this.props.updateBeer(beer);
    this.redirectToBeerViewPage();
  }

  cancelHandler = ():void => {
    this.redirectToBeerViewPage();
  }

  redirectToBeerViewPage = ():void => {
    this.props.history.push(`/beer/view/${this.props.currentBeer.id}`);
  }

  render() {
    return (
        <section>
          <h1>Edit beer from your collection</h1>
          <Form onSubmit={this.submitHandler}
                onCancel={this.cancelHandler}
                submitButtonLabel="Save"
                cancelButtonLabel="Cancel"
                currentImage={this.props.currentBeer && this.props.currentBeer.image}/>
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BeerEdit)
);
