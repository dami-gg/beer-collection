// @flow

import type { Image } from "../../types/image.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import { IMAGE_SIZE } from "./gallery.constants";

import "./gallery.scss";

type Props = {
  gallery: Array<Image>,
  onSelect?: Function,
  selectedImage?: Image
};

export class Gallery extends Component<Props> {
  renderImages() {
    return this.props.gallery.map((image: Image, index) => (
      <div
        className={`gallery__frame 
        ${this.props.onSelect ? "gallery__frame--selectable" : ""}
        ${
          this.props.selectedImage && this.props.selectedImage.url === image.url
            ? "gallery__frame--selected"
            : ""
        }          
          `}
        onClick={event => this.props.onSelect && this.props.onSelect(image)}
        key={index}>
        <img
          className="gallery__frame__image"
          src={image.url}
          alt={`Logo ${index}`}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
        />
      </div>
    ));
  }

  render() {
    return <div className="gallery">{this.renderImages()}</div>;
  }
}

const mapStateToProps = (state: Object): Object => ({
  gallery: state.gallery
});

export default connect(mapStateToProps)(Gallery);
