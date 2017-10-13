// @flow

import Button from "../button/Button";

import React, { PureComponent } from "react";

export class GalleryOpener extends PureComponent {
  props: {
    className?: string,
    buttonLabel?: string
  };

  openGallery() {}

  render() {
    return (
      <Button
        className={`button--positive ${this.props.className
          ? this.props.className
          : ""}`}
        color="purple"
        onClick={this.openGallery}>
        {this.props.buttonLabel || "Select from gallery"}
      </Button>
    );
  }
}

export default GalleryOpener;
