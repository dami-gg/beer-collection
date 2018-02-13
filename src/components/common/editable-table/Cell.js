// @flow
import React, { Component } from "react";

import ImageSelector from "../../common/image-selector/ImageSelector";

import "./cell.scss";

type Props = {
  content: string,
  column: Object,
  onChange: Function,
  onImageChange: Function,
  readOnly?: boolean,
  rowId?: string
};

class Cell extends Component<Props> {
  handleChange: Function;
  updateThumbnail: Function;

  constructor(props: Object) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.updateThumbnail = this.updateThumbnail.bind(this);
  }

  getContent() {
    return this.props.readOnly || !this.props.column.editable
      ? this.getReadOnlyContent()
      : this.getEditableContent();
  }

  getReadOnlyContent() {
    switch (this.props.column.type) {
      case "text":
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
    return this.props.content ? (
      <img className="cell__image" src={this.props.content} alt="Current" />
    ) : (
      <span className="cell__text">No image</span>
    );
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
    return (
      <div className="cell__image-upload">
        <ImageSelector
          rowId={this.props.rowId} // To assign different ids to upload inputs and avoid collisions
          onImageUploaded={this.props.onImageChange}
          thumbnail={this.props.content}
          readOnly={this.props.readOnly}
          currentImage={this.props.content}
          onImageLoaded={this.updateThumbnail}
          hidePreview={true}
          uploadButtonLabel="Upload"
          galleryButtonLabel="Select"
        />
      </div>
    );
  }

  updateThumbnail(thumbnail: string) {
    this.props.onChange(this.props.column, thumbnail);
  }

  handleChange(event: Object): void {
    const value = event.target.value;
    this.props.onChange(this.props.column, value);
  }

  render() {
    return (
      <div
        className={`cell ${this.props.column.hiddenOnMobile
          ? "mobile-hidden"
          : ""}`}>
        {this.getContent()}
      </div>
    );
  }
}

export default Cell;
