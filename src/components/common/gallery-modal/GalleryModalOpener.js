// @flow

import React, { Component } from "react";

import Button from "../button/Button";
import GalleryModal from "./GalleryModal";

import "./gallery-modal.scss";

type Props = {
  className?: string,
  buttonLabel?: string,
  onSelection?: Function
};

type State = {
  isOpened: boolean
};

export class GalleryModalOpener extends Component<Props, State> {
  state: State;
  closeGallery: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpened: false
    };

    this.closeGallery = this.closeGallery.bind(this);
  }

  openGallery() {
    this.setState({
      isOpened: true
    });
  }

  closeGallery() {
    this.setState({
      isOpened: false
    });
  }

  render() {
    return (
      <div
        className={`gallery-modal-opener ${
          this.props.className ? this.props.className : ""
        }`}>
        <Button
          className="button--positive"
          color="purple"
          onClick={event => this.openGallery()}>
          {this.props.buttonLabel || "Select from gallery"}
        </Button>

        <GalleryModal
          isOpened={this.state.isOpened}
          onClose={this.closeGallery}
          onSelection={this.props.onSelection}
        />
      </div>
    );
  }
}

export default GalleryModalOpener;
