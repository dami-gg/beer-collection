// @flow
import React, { PureComponent } from "react";

import "./editable-cell.scss";

class EditableCell extends PureComponent {
  props: {
    cell: Object,
    column: Object,
    onChange: Function,
    readOnly: boolean
  };

  getCell() {
    return this.props.readOnly || !this.props.column.editable
      ? this.getReadOnlyCell()
      : this.getEditableCell();
  }

  getReadOnlyCell() {
    switch (this.props.column.type) {
      case "text":
      case "number":
        return <span>{this.props.cell}</span>;
      case "image":
        return this.props.cell
          ? <img src={this.props.cell} role="presentation" />
          : <span>No image</span>;
      default:
        return "";
    }
  }

  getEditableCell() {
    switch (this.props.column.type) {
      case "text":
      case "number":
        return (
          <input
            className="editable-table__cell"
            type="text"
            value={this.props.cell}
            onChange={event => this.props.onChange(event, this.props.column.id)}
          />
        );
      case "image":
        return <span>IMAGE</span>;
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="editable-table__cell">
        {this.getCell()}
      </div>
    );
  }
}

export default EditableCell;
