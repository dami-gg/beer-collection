// @flow
import type { Beer, BeerFormValues } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { addBeer } from "../../../actions/collection.actions";
import Page from "../Page";

type Props = {
  params: Object,
  addBeer: Function,
  match: Object,
  location: Object,
  history: Object
};

export class Add extends Component<Props> {
  submitHandler = (formValues: BeerFormValues, imageUrl: string): void => {
    let beer = {
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin,
      image: imageUrl,
      rating: formValues.rating
    };

    this.props.addBeer(beer);
    this.redirectToCollection();
  };

  cancelHandler = (): void => {
    this.redirectToCollection();
  };

  redirectToCollection = (): void => {
    this.props.history.push("/collection");
  };

  render() {
    return (
      <Page
        heading="Add a new beer to your collection"
        submitHandler={this.submitHandler}
        cancelHandler={this.cancelHandler}
        submitButtonLabel="Save"
        cancelButtonLabel="Cancel"
      />
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));
