// @flow
import type { Beer, BeerFormValues } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { updateBeer } from "../../../actions/collection.actions";
import { findBeerInCollectionById } from "../../collection/collection.helpers";
import Page from "../Page";

type Props = {
  params: Object,
  currentBeer: Beer,
  collection: Array<Beer>,
  setCurrentBeer: Function,
  resetCurrentBeer: Function,
  updateBeer: Function,
  match: Object,
  location: Object,
  history: Object
};

type State = {
  currentBeer: Beer | null
};

export class Edit extends Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentBeer: null
    };
  }

  componentWillMount(): void {
    // Find beer in collection and store it in state
    const currentBeer: Beer = findBeerInCollectionById(
      this.props.match.params.beerId,
      this.props.collection
    );
    this.setCurrentBeer(currentBeer);
  }

  componentWillUnmount(): void {
    this.resetCurrentBeer();
  }

  setCurrentBeer(currentBeer: Beer): void {
    this.setState({ currentBeer });
  }

  resetCurrentBeer(): void {
    this.setState({ currentBeer: undefined });
  }

  submitHandler = (formValues: BeerFormValues, imageUrl: string): void => {
    if (this.state.currentBeer) {
      let beer: Beer = {
        id: this.state.currentBeer.id,
        name: formValues.name,
        type: formValues.type,
        origin: formValues.origin,
        image: imageUrl || this.state.currentBeer.image,
        rating: formValues.rating
      };

      this.props.updateBeer(beer);
      this.redirectToViewPage();
    }
  };

  cancelHandler = (): void => {
    this.redirectToViewPage();
  };

  redirectToViewPage = (): void => {
    if (this.state.currentBeer) {
      this.props.history.push(`/beer/view/${this.state.currentBeer.id}`);
    }
  };

  render() {
    return (
      <Page
        heading="Edit beer from your collection"
        submitHandler={this.submitHandler}
        cancelHandler={this.cancelHandler}
        submitButtonLabel="Save"
        cancelButtonLabel="Cancel"
        currentBeer={this.state.currentBeer}
      />
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    updateBeer: (beer: Beer) => {
      dispatch(updateBeer(beer));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
