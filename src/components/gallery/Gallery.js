// @flow

import { Image } from "../../types/image.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import { IMAGE_SIZE } from "./gallery.constants";

import "./gallery.scss";

export class Gallery extends Component {
  images: Array<string>;

  props: {
    gallery: Array<Image>,
    onSelect: Function
  };

  renderImages() {
    return this.props.gallery.map((image: Image, index) => (
      <div className="gallery__image" key={index}>
        <img
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
