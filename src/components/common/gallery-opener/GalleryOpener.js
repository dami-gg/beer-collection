// @flow
import type { Image } from "../../../types/image.types";

import React, { Component } from "react";

import Button from "../button/Button";
import Modal from "../modal/Modal";
import Gallery from "../../gallery/Gallery";

type Props = {
  className?: string,
  buttonLabel?: string,
  onSelection?: Function
};

type State = {
  isOpened: boolean,
  selectedImage: Image | null
};

export class GalleryOpener extends Component<Props, State> {
  state: State;
  closeGallery: Function;
  handleSelection: Function;
  saveSelection: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpened: false,
      selectedImage: null
    };

    this.closeGallery = this.closeGallery.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.saveSelection = this.saveSelection.bind(this);
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

  handleSelection(selectedImage: Image) {
    this.setState({ selectedImage });
  }

  saveSelection() {
    this.props.onSelection && this.props.onSelection(this.state.selectedImage);
  }

  render() {
    return (
      <div className={this.props.className ? this.props.className : ""}>
        <Button
          className="button--positive"
          color="purple"
          onClick={event => this.openGallery()}>
          {this.props.buttonLabel || "Select from gallery"}
        </Button>

        <Modal
          isOpened={this.state.isOpened}
          onClose={this.closeGallery}
          onSave={this.saveSelection}>
          <Gallery
            onSelect={this.handleSelection}
            selectedImage={this.state.selectedImage}
          />
        </Modal>
      </div>
    );
  }
}

export default GalleryOpener;
