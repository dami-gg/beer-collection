// @flow

import type { Image } from "../../../types/image.types";

import React, { PureComponent } from "react";

import ImageUploader from "../image-uploader/ImageUploader";
import GalleryOpener from "../gallery-opener/GalleryOpener";

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
  galleryButtonLabel?: string,
  rowId?: string,
  inline?: boolean
};

class ImageSelector extends PureComponent<Props> {
  handleImageSelection: Function;

  constructor(props: Props) {
    super(props);

    this.handleImageSelection = this.handleImageSelection.bind(this);
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
          ${
            this.props.thumbnail || this.props.currentImage
              ? ""
              : "image-selector__preview--empty"
          }
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
          <div
            className={`image-selector__uploader ${
              this.props.inline ? "image-selector__uploader--inline" : ""
            }`}>
            <ImageUploader
              selector={this.props.rowId}
              onImageUploaded={this.props.onImageUploaded}
              onImageLoaded={this.props.onImageLoaded}
              uploadButtonLabel={this.props.uploadButtonLabel}
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
