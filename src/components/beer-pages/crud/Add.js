// @flow
import type {Beer, BeerFormValues} from '../../../types';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {v4} from 'node-uuid';

import {addBeer} from '../../../actions/collection.actions';
import Page from '../Page';

export class Add extends Component {
  props: {
    params: Object,
    addBeer: Function,
    match: Object,
    location: Object,
    history: Object
  };

  submitHandler = (formValues: BeerFormValues, imageUrl: string): void => {
    let beer: Beer = {
      id: v4(),
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin,
      image: imageUrl,
      rating: formValues.rating
    };

    this.props.addBeer(beer);
    this.redirectToCollection();
  }

  cancelHandler = (): void => {
    this.redirectToHome();
  }

  redirectToCollection = (): void => {
    this.props.history.push('/collection');
  }

  redirectToHome = (): void => {
    this.props.history.push('/');
  }

  render() {
    return (
        <Page
            heading="Add a new beer to your collection"
            submitHandler={this.submitHandler}
            cancelHandler={this.cancelHandler}
            submitButtonLabel="Save"
            cancelButtonLabel="Cancel">
        </Page>
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Add)
);
