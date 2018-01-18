// @flow
import React, { Component } from "react";

import Cell from "./Cell";
import Buttons from "./Buttons";

import { uploadImagesBatch } from "../../common/image-selector/image-selector.helpers";

import "./row.scss";

type Props = {
  row: Object,
  columns: Array<Object>,
  type?: string,
  onSave: Function,
  onDelete?: Function
};

type State = {
  mode: string,
  editedRow: Object,
  imagesToUpload: Array<Object>,
  waitingForConfirmation?: boolean,
  background: string
};

class Row extends Component<Props, State> {
  state: State;
  setReadMode: Function;
  setEditMode: Function;
  setDeleteMode: Function;
  finishEdition: Function;
  discardChanges: Function;
  deleteRow: Function;
  updateChanges: Function;
  enqueueImage: Function;

  constructor(props: Object) {
    super(props);

    this.state = {
      mode: "read",
      editedRow: props.row,
      imagesToUpload: [{ name: "A" }],
      background: ""
    };

    this.setReadMode = this.setReadMode.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.setDeleteMode = this.setDeleteMode.bind(this);
    this.finishEdition = this.finishEdition.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.enqueueImage = this.enqueueImage.bind(this);
  }

  componentWillMount() {
    this.isExtraRow() ? this.setEditMode() : this.setReadMode();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("nextState", nextState);
  }

  isExtraRow(): boolean {
    return this.props.type === "extra";
  }

  setReadMode() {
    this.setState({
      mode: "read",
      waitingForConfirmation: false,
      background: this.props.type || "light"
    });
  }

  setEditMode() {
    this.setState({
      mode: "edit",
      waitingForConfirmation: false,
      background: "edit"
    });
  }

  setDeleteMode() {
    this.setState({
      mode: "delete",
      waitingForConfirmation: true,
      background: "danger"
    });
  }

  getPositiveButton() {
    switch (this.state.mode) {
      case "edit":
        return {
          handler: this.finishEdition,
          label: "Save",
          color: "green"
        };

      case "delete":
        return {
          handler: this.deleteRow,
          label: "Confirm",
          color: "black"
        };

      case "read":
      default:
        return {
          handler: this.setEditMode,
          label: "Edit",
          color: "blue"
        };
    }
  }

  getNegativeButton() {
    switch (this.state.mode) {
      case "edit":
        return {
          handler: this.isExtraRow()
            ? this.discardChanges
            : this.setReadOnlyMode,
          label: "Cancel",
          color: "grey"
        };

      case "delete":
        return {
          handler: this.setReadOnlyMode,
          label: "Cancel",
          color: "grey"
        };

      case "read":
      default:
        return {
          handler: this.setDeleteMode,
          label: "Delete",
          color: "red"
        };
    }
  }

  finishEdition() {
    // TODO !!!!!!!!!!
    // For some reason imagesToUpload is reset when reaching this place, even if it's 
    // correctly populated when enqueueing images before O_o
    
    console.log("Finish", this.state.imagesToUpload.length);
    if (this.state.imagesToUpload.length) {
      uploadImagesBatch(this.state.imagesToUpload)
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
      this.setReadMode();
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
        readOnly={this.state.mode === "read"}
      />
    ));
  }

  updateChanges(column: Object, value: any) {
    console.log("Update", this.state.imagesToUpload.length);
    this.setState({
      editedRow: { ...this.state.editedRow, [column.id]: value }
    });
  }

  enqueueImage(imageFile: Object) {
    console.log("Enqueue", this.state.imagesToUpload.length);
    if (imageFile) {
      this.setState({
        imagesToUpload: [...this.state.imagesToUpload, imageFile]
      });
    }
  }

  render() {
    const positiveButton = this.getPositiveButton();
    const negativeButton = this.getNegativeButton();

    return (
      <div className={`row row--${this.state.background}`}>
        {this.getCells()}
        <span>{this.state.imagesToUpload.length}</span>
        <Buttons
          onPositiveButtonClick={positiveButton.handler}
          onNegativeButtonClick={negativeButton.handler}
          positiveButtonLabel={positiveButton.label}
          negativeButtonLabel={negativeButton.label}
          positiveButtonColor={positiveButton.color}
          negativeButtonColor={negativeButton.color}
        />
      </div>
    );
  }
}

export default Row;
