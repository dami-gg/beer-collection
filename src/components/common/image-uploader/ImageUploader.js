// @flow

import React, { PureComponent } from "react";

import Button from "../button/Button";
import { readFile } from "./image-uploader.helpers";

import "./image-uploader.scss";

class ImageUploader extends PureComponent {
  handleImageSelection: Function;
  
  props: {
    onImageSelected: Function,
    thumbnail: string,
    readOnly: boolean,
    currentImage: string,
    onImageLoaded: Function,
    hidePreview?: boolean,
    buttonLabel?: string
  };

  constructor(props: Object) {
    super(props);

    this.handleImageSelection = this.handleImageSelection.bind(this);
  }

  handleImageSelection(event: Object) {
    event.persist();
    const imageFile = event.target.files[0];
    readFile(imageFile, this.props.onImageLoaded);

    this.props.onImageSelected(imageFile);
  }

  render() {
    return (
      <div className="image-uploader">
        <div
          className={`image-uploader__preview 
          ${this.props.thumbnail || this.props.currentImage ? "" : "image-uploader__preview--empty"}
          ${this.props.hidePreview ? "image-uploader__preview--hidden" : ""}`}
        >
          {(this.props.thumbnail || this.props.currentImage) &&
            <img
              className="image-uploader__preview__image"
              src={this.props.thumbnail || this.props.currentImage}
              role="presentation"
            />}
        </div>

        {!this.props.readOnly &&
          <div className="image-uploader__uploader">
            <Button className="image-uploader__button" color="blue">
              <label
                className="image-uploader__button__label"
                htmlFor="image-uploader__input"
              >
                {this.props.buttonLabel || "Select image"}
              </label>
            </Button>

            <input
              id="image-uploader__input"
              className="image-uploader__input"
              type="file"
              onChange={this.handleImageSelection}
            />
          </div>}
      </div>
    );
  }
}

export default ImageUploader;
