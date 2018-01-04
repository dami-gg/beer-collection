// @flow

import type { Image } from "../../../types/image.types";

import React, { PureComponent } from "react";

import Button from "../button/Button";
import GalleryOpener from "../gallery-opener/GalleryOpener";

import { readFile } from "./image-selector.helpers";

import "./image-selector.scss";

type Props = {
  onImageUploaded: Function,
  onImageSelected?: Function,
  thumbnail: string,
  readOnly?: boolean,
  currentImage: string,
  onImageLoaded: Function,
  hidePreview?: boolean,
  uploadButtonLabel?: string,
  galleryButtonLabel?: string
};

class ImageSelector extends PureComponent<void, Props, void> {
  handleImageUpload: Function;
  handleImageSelection: Function;

  constructor(props: Props) {
    super(props);

    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleImageSelection = this.handleImageSelection.bind(this);
  }

  handleImageUpload(event: Object) {
    event.persist();
    const imageFile = event.target.files[0];
    readFile(imageFile, this.props.onImageLoaded);

    this.props.onImageUploaded(imageFile);
  }

  handleImageSelection(image: Image) {
    this.props.onImageLoaded(image.url);
    this.props.onImageSelected && this.props.onImageSelected(image);
  }

  render() {
    return (
      <div className="image-selector">
        <div
          className={`image-selector__preview 
          ${this.props.thumbnail || this.props.currentImage
            ? ""
            : "image-selector__preview--empty"}
          ${this.props.hidePreview ? "image-selector__preview--hidden" : ""}`}>
          {(this.props.thumbnail || this.props.currentImage) && (
            <img
              className="image-selector__preview__image"
              src={this.props.thumbnail || this.props.currentImage}
              alt="Thumbnail"
            />
          )}
        </div>

        {!this.props.readOnly && (
          <div className="image-selector__uploader">
            <Button className="image-selector__button" color="blue">
              <label
                className="image-selector__button__label"
                htmlFor="image-selector__input">
                {this.props.uploadButtonLabel || "Select image"}
              </label>
            </Button>

            <input
              id="image-selector__input"
              className="image-selector__input"
              type="file"
              onChange={this.handleImageUpload}
            />

            <GalleryOpener
              className="button-wrapper"
              buttonLabel={this.props.galleryButtonLabel}
              onSelection={this.handleImageSelection}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ImageSelector;
