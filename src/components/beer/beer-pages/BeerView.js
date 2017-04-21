// @flow
import type {Beer} from '../../../types';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {updateBeer, setCurrentBeer} from '../../../actions';
import {findItemInCollectionById} from '../../../utils';
import BeerPage from './BeerPage';

class BeerView extends Component {
  props: {
    params: Object,
    currentBeer: Beer,
    collection: Array<Beer>,
    setCurrentBeer: Function,
    match: Object,
    location: Object,
    history: Object
  };

  componentWillMount(): void {
    // Find beer in collection and store it in state
    const currentBeer: Beer = findItemInCollectionById(this.props.match.params.beerId, this.props.collection);
    this.props.setCurrentBeer(currentBeer);
  }

  submitHandler = (): void => {
    this.redirectToBeerEditPage();
  }

  cancelHandler = (): void => {
    this.redirectToCollection();
  }

  redirectToBeerEditPage = (): void => {
    this.props.history.push(`/beer/edit/${this.props.currentBeer.id}`);
  }

  redirectToCollection = (): void => {
    this.props.history.push('/collection');
  }

  render() {
    return (
        <BeerPage
            heading={this.props.currentBeer && this.props.currentBeer.name}
            submitHandler={this.submitHandler}
            cancelHandler={this.cancelHandler}
            submitButtonLabel="Edit"
            cancelButtonLabel="Back"
            currentBeer={this.props.currentBeer}
            readOnly={true}>
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
    )(BeerView)
);
