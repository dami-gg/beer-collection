// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { updateBeer } from "../../../actions/collection.actions";
import { findBeerInCollectionById } from "../../collection/collection.helpers";
import Page from "../Page";

type Props = {
  params: Object,
  collection: Array<Beer>,
  updateBeer: Function,
  match: Object,
  location: Object,
  history: Object
};

type State = {
  currentBeer: Beer | null
};

export class View extends Component<Props, State> {
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

  submitHandler = (): void => {
    this.redirectToEditPage();
  };

  cancelHandler = (): void => {
    this.redirectToCollection();
  };

  redirectToEditPage = (): void => {
    if (this.state.currentBeer) {
      this.props.history.push(`/beer/edit/${this.state.currentBeer.id}`);
    }
  };

  redirectToCollection = (): void => {
    this.props.history.push("/collection");
  };

  render() {
    return (
      <Page
        heading={this.state.currentBeer ? this.state.currentBeer.name : ''}
        submitHandler={this.submitHandler}
        cancelHandler={this.cancelHandler}
        submitButtonLabel="Edit"
        cancelButtonLabel="Back"
        currentBeer={this.state.currentBeer}
        readOnly={true}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View));
