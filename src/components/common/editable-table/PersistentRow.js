// @flow
import React, { Component } from "react";

import Cell from "./Cell";
import Buttons from "./Buttons";

import { uploadImagesBatch } from "../../common/image-uploader/image-uploader.helpers";

import "./row.scss";

type Props = {
  columns: Array<Object>,
  onSave: Function
};

type State = {
  content: Object,
  imagesToUpload: Array<Object>,
  waitingForConfirmation?: boolean
};

class PersistentRow extends Component<Props, State> {
  state: State;
  finishEdition: Function;
  discardChanges: Function;
  deleteRow: Function;
  updateChanges: Function;
  enqueueImage: Function;

  constructor(props: Object) {
    super(props);

    this.state = {
      content: {},
      imagesToUpload: [],
      waitingForConfirmation: false
    };

    this.finishEdition = this.finishEdition.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.enqueueImage = this.enqueueImage.bind(this);
  }

  finishEdition() {
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
    this.props.onSave(this.state.content);
    this.discardChanges();
  }

  discardChanges() {
    this.setState({
      content: {}
    });
  }

  updateChanges(column: Object, value: any) {
    this.setState({
      content: { ...this.state.content, [column.id]: value }
    });
  }

  enqueueImage(imageFile: Object) {
    if (imageFile) {
      this.setState({
        imagesToUpload: [...this.state.imagesToUpload, imageFile]
      });
    }
  }

  getCells() {
    return this.props.columns.map((column: Object) => (
      <Cell
        key={`persistent--${column.id}`}
        content={this.state.content[column.id]}
        column={column}
        onChange={this.updateChanges}
        onImageChange={this.enqueueImage}
        readOnly={false}
        rowId={"persistent"}
      />
    ));
  }

  render() {
    return (
      <div className={`row row--edit`}>
        {this.getCells()}
        <Buttons
          onPositiveButtonClick={this.finishEdition}
          onNegativeButtonClick={this.discardChanges}
          positiveButtonLabel="Save"
          negativeButtonLabel="Cancel"
          positiveButtonColor="green"
          negativeButtonColor="grey"
        />
      </div>
    );
  }
}

export default PersistentRow;
