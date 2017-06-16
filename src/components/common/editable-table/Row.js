// @flow
import React, { Component } from "react";

import Cell from "./Cell";
import Buttons from "./Buttons";

import {
  handleBatchImageUpload
} from "../../common/image-uploader/image-uploader.helpers";

import "./row.scss";

type State = {
  readOnly: boolean,
  editedRow: Object,
  imagesToUpload: Array<Object>,
  waitingForConfirmation: boolean,
  background: string,
  positiveButtonHandler: Function,
  negativeButtonHandler: Function,
  positiveButtonLabel: string,
  negativeButtonLabel: string,
  positiveButtonColor: string,
  negativeButtonColor: string
};

class Row extends Component {
  state: State;
  setReadOnlyMode: Function;
  setEditMode: Function;
  setDeleteMode: Function;
  finishEdition: Function;
  discardChanges: Function;
  deleteRow: Function;
  updateChanges: Function;
  enqueueImage: Function;

  props: {
    row: Object,
    columns: Array<Object>,
    type?: string,
    onSave: Function,
    onDelete?: Function
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      editedRow: props.row,
      imagesToUpload: []
    };

    this.setReadOnlyMode = this.setReadOnlyMode.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.setDeleteMode = this.setDeleteMode.bind(this);
    this.finishEdition = this.finishEdition.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.enqueueImage = this.enqueueImage.bind(this);
  }

  componentWillMount() {
    if (this.isExtraRow()) {
      this.setEditMode();
    } else {
      this.setReadOnlyMode();
    }
  }

  isExtraRow(): boolean {
    return this.props.type === "extra";
  }

  setReadOnlyMode() {
    this.setState({
      readOnly: true,
      waitingForConfirmation: false,
      background: this.props.type || "light",
      positiveButtonHandler: this.setEditMode,
      negativeButtonHandler: this.setDeleteMode,
      positiveButtonLabel: "Edit",
      negativeButtonLabel: "Delete",
      positiveButtonColor: "blue",
      negativeButtonColor: "red"
    });
  }

  setEditMode() {
    this.setState({
      readOnly: false,
      waitingForConfirmation: false,
      background: "edit",
      positiveButtonHandler: this.finishEdition,
      negativeButtonHandler: this.isExtraRow()
        ? this.discardChanges
        : this.setReadOnlyMode,
      positiveButtonLabel: "Save",
      negativeButtonLabel: "Cancel",
      positiveButtonColor: "green",
      negativeButtonColor: "grey"
    });
  }

  setDeleteMode() {
    this.setState({
      readOnly: false,
      waitingForConfirmation: true,
      background: "danger",
      positiveButtonHandler: this.deleteRow,
      negativeButtonHandler: this.setReadOnlyMode,
      positiveButtonLabel: "Confirm",
      negativeButtonLabel: "Cancel",
      positiveButtonColor: "black",
      negativeButtonColor: "grey"
    });
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

    if (this.isExtraRow()) {
      this.discardChanges();
    } else {
      this.setReadOnlyMode();
    }
  }

  discardChanges() {
    this.setState({
      editedRow: this.props.row
    });
  }

  deleteRow() {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.row);
    }
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

  updateChanges(column: Object, value: any) {
    this.setState({
      editedRow: { ...this.state.editedRow, [column.id]: value }
    });
  }

  enqueueImage(imageFile: Object) {
    this.setState({
      imagesToUpload: [...this.state.imagesToUpload, imageFile]
    });
  }

  render() {
    return (
      <div className={`row row--${this.state.background}`}>
        {this.getCells()}
        <Buttons
          onPositiveButtonClick={this.state.positiveButtonHandler}
          onNegativeButtonClick={this.state.negativeButtonHandler}
          positiveButtonLabel={this.state.positiveButtonLabel}
          negativeButtonLabel={this.state.negativeButtonLabel}
          positiveButtonColor={this.state.positiveButtonColor}
          negativeButtonColor={this.state.negativeButtonColor}
        />
      </div>
    );
  }
}

export default Row;
