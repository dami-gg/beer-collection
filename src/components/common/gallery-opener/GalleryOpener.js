// @flow

import Button from "../button/Button";
import Modal from "../modal/Modal";
import Gallery from "../../gallery/Gallery";

import React, { Component } from "react";

export class GalleryOpener extends Component {
  props: {
    className?: string,
    buttonLabel?: string
  };

  constructor(props) {
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
      <div className={this.props.className ? this.props.className : ""}>
        <Button
          className="button--positive"
          color="purple"
          onClick={event => this.openGallery()}>
          {this.props.buttonLabel || "Select from gallery"}
        </Button>
        <Modal isOpened={this.state.isOpened} onClose={this.closeGallery}>
          <Gallery />
        </Modal>
      </div>
    );
  }
}

export default GalleryOpener;
