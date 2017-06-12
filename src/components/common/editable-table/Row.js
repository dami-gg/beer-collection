// @flow
type State = {
  readOnly: boolean,
  editedRow: Object
};

import React, { Component } from "react";

import Cell from "./Cell";
import Buttons from "./Buttons";

import {
  handleBatchImageUpload
} from "../../common/image-uploader/image-uploader.helpers";

import "./row.scss";

class Row extends Component {
  state: State;

  props: {
    row: Object,
    columns: Array<Object>,
    type?: string,
    onSave: Function,
    onDelete: Function
  };

  constructor(props) {
    super(props);

    this.state = {
      readOnly: props.type === "extra" ? false : true,
      editedRow: props.row,
      imagesToUpload: []
    };

    this.enableEditMode = this.enableEditMode.bind(this);
    this.finishEdition = this.finishEdition.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.enqueueImage = this.enqueueImage.bind(this);
  }

  getCells() {
    return this.props.columns.map((column: Object) => (
      <Cell
        key={column.id}
        content={this.state.editedRow[column.id]}
        column={column}
        onChange={this.updateChanges}
        onImageChange={this.enqueueImage}
        readOnly={this.state.readOnly}
      />
    ));
  }

  isExtraRow(): boolean {
    return this.props.type === "extra";
  }

  enableEditMode() {
    this.setState({
      readOnly: false
    });
  }

  disableEditMode() {
    this.setState({
      readOnly: true
    });
  }

  updateChanges(column, value, imageFile) {
    this.setState({
      editedRow: { ...this.state.editedRow, [column.id]: value }
    });
  }

  enqueueImage(imageFile: Object) {
    this.setState({
      imagesToUpload: [...this.state.imagesToUpload, imageFile]
    });
  }

  discardChanges() {
    if (this.isExtraRow()) {
      this.setState({
        editedRow: this.props.row
      });
    } else {
      this.disableEditMode();
    }
  }

  finishEdition() {
    if (this.state.imagesToUpload.length > 0) {
      handleBatchImageUpload(this.state.imagesToUpload)
        .then(imageUrl => {
          this.saveChanges();
        })
        .catch(error => console.log(error));
    } else {
      this.saveChanges();
    }
  }

  saveChanges() {
    this.props.onSave(this.state.editedRow);
    this.discardChanges();
  }

  deleteRow() {
    // TODO Add confirmation message
    this.props.onDelete(this.props.row);
  }

  render() {
    return (
      <div
        className={`row row--${this.state.readOnly ? this.props.type || "light" : "edit"}`}
      >
        {this.getCells()}
        <Buttons
          readOnly={this.state.readOnly}
          onEdit={this.enableEditMode}
          onCancel={this.discardChanges}
          onSave={this.finishEdition}
          onDelete={this.deleteRow}
        />
      </div>
    );
  }
}

export default Row;
