// @flow
import type {Beer} from '../../../types/beer.types';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {updateBeer} from '../../../actions/collection.actions';
import {setCurrentBeer, resetCurrentBeer} from '../../../actions/navigation.actions';
import {findBeerInCollectionById} from '../../collection/collection.helpers';
import Page from '../Page';

export class View extends Component {
  props: {
    params: Object,
    currentBeer: Beer,
    collection: Array<Beer>,
    setCurrentBeer: Function,
    updateBeer: Function,
    resetCurrentBeer: Function,
    match: Object,
    location: Object,
    history: Object
  };

  componentWillMount(): void {
    // Find beer in collection and store it in state
    const currentBeer: Beer = findBeerInCollectionById(this.props.match.params.beerId, this.props.collection);
    this.props.setCurrentBeer(currentBeer);
  }

  componentWillUnmount(): void {
    this.props.resetCurrentBeer();
  }

  submitHandler = (): void => {
    this.redirectToEditPage();
  }

  cancelHandler = (): void => {
    this.redirectToCollection();
  }

  redirectToEditPage = (): void => {
    this.props.history.push(`/beer/edit/${this.props.currentBeer.id}`);
  }

  redirectToCollection = (): void => {
    this.props.history.push('/collection');
  }

  render() {
    return (
        <Page
            heading={this.props.currentBeer && this.props.currentBeer.name}
            submitHandler={this.submitHandler}
            cancelHandler={this.cancelHandler}
            submitButtonLabel="Edit"
            cancelButtonLabel="Back"
            currentBeer={this.props.currentBeer}
            readOnly={true}>
        </Page>
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
    },

    resetCurrentBeer: () => {
      dispatch(resetCurrentBeer());
    }
  }
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(View)
);
