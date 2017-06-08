// @flow
type State = {
  readOnly: boolean,
  editedRow: Object
};

import React, { Component } from "react";

import Cell from "./Cell";
import Buttons from "./Buttons";

import "./row.scss";

class Row extends Component {
  state: State;

  props: {
    row: Object,
    columns: Array<Object>,
    onSave: Function,
    type?: string,
    onDelete: Function
  };

  constructor(props) {
    super(props);

    this.state = {
      readOnly: props.type === "extra" ? false : true,
      editedRow: props.row
    };

    this.enableEditMode = this.enableEditMode.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  getCells() {
    return this.props.columns.map((column: Object) => (
      <Cell
        key={column.id}
        content={this.state.editedRow[column.id] || ''}
        column={column}
        onChange={this.updateChanges}
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

  updateChanges(columnId, value) {
    this.setState({
      editedRow: { ...this.state.editedRow, [columnId]: value }
    });
  }

  discardChanges() {
    if (!this.isExtraRow()) {
      this.disableEditMode();
    }
    this.setState({
      editedRow: this.props.row
    });
  }

  saveChanges() {
    this.props.onSave(this.state.editedRow);

    if (this.isExtraRow()) {
      this.setState({
        editedRow: {}
      });
    } else {
      this.disableEditMode();
    }
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
          onSave={this.saveChanges}
          onDelete={this.deleteRow}
        />
      </div>
    );
  }
}

export default Row;
