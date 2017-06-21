// @flow
import React, { Component } from "react";

import ImageUploader from "../../common/image-uploader/ImageUploader";

import "./cell.scss";

type State = {
  thumbnail: any
};

class Cell extends Component {
  state: State;
  handleChange: Function;
  loadImage: Function;
  getThumbnail: Function;

  props: {
    content: string,
    column: Object,
    onChange: Function,
    onImageChange: Function,
    readOnly: boolean
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      thumbnail: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.getThumbnail = this.getThumbnail.bind(this);
  }

  getContent() {
    return this.props.readOnly || !this.props.column.editable
      ? this.getReadOnlyContent()
      : this.getEditableContent();
  }

  getReadOnlyContent() {
    switch (this.props.column.type) {
      case "text":
        return this.getReadOnlyText();
      case "number":
        return this.getReadOnlyText();
      case "image":
        return this.getReadOnlyImage();
      default:
        return "";
    }
  }

  getEditableContent() {
    switch (this.props.column.type) {
      case "text":
        return this.getEditableText();
      case "number":
        return this.getEditableText();
      case "image":
        return this.getEditableImage();
      default:
        return "";
    }
  }

  getReadOnlyText() {
    return <span className="cell__text">{this.props.content}</span>;
  }

  getReadOnlyImage() {
    return this.props.content
      ? <img
          className="cell__image"
          src={this.props.content}
          alt="Current"
        />
      : <span className="cell__text">No image</span>;
  }

  getEditableText() {
    return (
      <input
        className={`cell__input cell__input--${this.props.column.type}`}
        type="text"
        value={this.props.content ? this.props.content : ""}
        placeholder={this.props.column.name}
        onChange={this.handleChange}
      />
    );
  }

  getEditableImage() {
    return this.props.content
      ? <div className="cell__image-upload">
          <img
            className="cell__image"
            src={this.props.content}
            alt="Uploaded"
          />
          {this.getImageUploader()}
        </div>
      : <div className="cell__image-upload">
          {this.getImageUploader()}
        </div>;
  }

  loadImage(imageFile: Object) {
    this.props.onImageChange(imageFile);
  }

  getThumbnail(thumbnail: string) {
    this.setState({ thumbnail });
    this.props.onChange(this.props.column, thumbnail);
  }

  getImageUploader() {
    return (
      <ImageUploader
        onImageSelected={this.loadImage}
        thumbnail={this.props.content}
        readOnly={this.props.readOnly}
        currentImage={this.props.content}
        onImageLoaded={this.getThumbnail}
        hidePreview={true}
      />
    );
  }

  handleChange(event: Object): void {
    const value = event.target.value;
    this.props.onChange(this.props.column, value);
  }

  render() {
    return (
      <div
        className={`cell ${this.props.column.hiddenOnMobile ? "mobile-hidden" : ""}`}
      >
        {this.getContent()}
      </div>
    );
  }
}

export default Cell;
