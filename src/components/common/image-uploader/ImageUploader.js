// @flow
import React, { PureComponent } from "react";

import Button from "../button/Button";

import { readFile } from "./image-uploader.helpers";

import "./image-uploader.scss";

type Props = {
  selector?: string,
  wrapper?: any,
  wrapperProps?: Object,
  onImageUploaded: Function,
  onImageLoaded?: Function,
  uploadButtonLabel?: string
};

export class ImageUploader extends PureComponent<Props> {
  handleImageUpload: Function;

  constructor(props: Props) {
    super(props);

    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleImageUpload(event: Object) {
    event.persist();
    const imageFile = event.target.files[0];
    readFile(imageFile, this.props.onImageLoaded);

    this.props.onImageUploaded(imageFile);
  }

  render() {
    const Wrapper = this.props.wrapper || Button;

    return (
      <div className="image-uploader">
        <Wrapper
          className="image-uploader__button"
          {...this.props.wrapperProps}>
          <label
            className="image-uploader__button__label"
            htmlFor={`image-uploader__input ${
              this.props.selector
                ? `image-uploader__input--${this.props.selector}`
                : ""
            }`}>
            {this.props.uploadButtonLabel}
          </label>
        </Wrapper>

        <input
          id={`image-uploader__input ${
            this.props.selector
              ? `image-uploader__input--${this.props.selector}`
              : ""
          }`}
          className="image-uploader__input"
          type="file"
          accept="image/*"
          onChange={this.handleImageUpload}
        />
      </div>
    );
  }
}

export default ImageUploader;
