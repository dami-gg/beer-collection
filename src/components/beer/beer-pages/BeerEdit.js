// @flow
import type {Beer, BeerFormValues} from '../../../types/types';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import {updateBeer, setCurrentBeer} from '../../../actions';
import {findItemInCollectionById} from '../../../utils/utils';
import BeerPage from './BeerPage';

class BeerEdit extends Component {
  props: {
    params: Object,
    currentBeer: Beer,
    collection: Array<Beer>,
    setCurrentBeer: Function,
    updateBeer: Function,
    match: Object,
    location: Object,
    history: Object
  };

  componentWillMount(): void {
    // Find beer in collection and store it in state
    const currentBeer: Beer = findItemInCollectionById(this.props.match.params.beerId, this.props.collection);
    this.props.setCurrentBeer(currentBeer);
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
    this.redirectToBeerViewPage();
  }

  cancelHandler = (): void => {
    this.redirectToBeerViewPage();
  }

  redirectToBeerViewPage = (): void => {
    this.props.history.push(`/beer/view/${this.props.currentBeer.id}`);
  }

  render() {
    return (
        <BeerPage
            heading="Edit beer from your collection"
            submitHandler={this.submitHandler}
            cancelHandler={this.cancelHandler}
            submitButtonLabel="Save"
            cancelButtonLabel="Cancel"
            currentBeer={this.props.currentBeer}>
        </BeerPage>
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BeerEdit)
);
