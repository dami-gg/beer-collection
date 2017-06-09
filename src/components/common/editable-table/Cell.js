// @flow
import React, { PureComponent } from "react";

import "./cell.scss";

class Cell extends PureComponent {
  props: {
    content: string,
    column: Object,
    onChange: Function,
    readOnly: boolean
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
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
          role="presentation"
        />
      : <span className="cell__text">No image</span>;
  }

  getEditableText() {
    return (
      <input
        className={`cell__input cell__input--${this.props.column.type}`}
        type="text"
        value={this.props.content ? this.props.content : ''}
        placeholder={this.props.column.name}
        onChange={this.handleChange}
      />
    );
  }

  getEditableImage() {
    return <span>IMAGE</span>; // TODO Use ImageUploader
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
    this.props.onChange(this.props.column.id, value);
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
