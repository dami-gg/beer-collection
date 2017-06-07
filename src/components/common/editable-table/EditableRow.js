// @flow
type State = {
  readOnly: boolean,
  editedRow: Object
};

import React, { Component } from "react";

import EditableCell from "./EditableCell";
import Button from "../button/Button";

import "./editable-row.scss";

class EditableRow extends Component {
  state: State;

  props: {
    row: Object,
    columns: Array<Object>,
    onSave: Function,
    orderClass?: boolean
  };

  constructor(props) {
    super(props);

    this.state = {
      readOnly: true,
      editedRow: props.row
    };

    this.enableEditMode = this.enableEditMode.bind(this);
    this.disableEditMode = this.disableEditMode.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
  }

  getRowCells() {
    return this.props.columns.map(
      (column: Object, index: number) => (
        <EditableCell
          key={index}
          cell={this.state.editedRow[column.id]}
          column={column}
          onChange={this.updateChanges}
          readOnly={this.state.readOnly}
        />
      )
    );
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

  updateChanges(event, columnId) {
    this.setState({
      editedRow: { ...this.state.editedRow, [columnId]: event.target.value }
    });
  }

  discardChanges() {
    this.disableEditMode();
    this.setState({
      editedRow: this.props.row
    });
  }

  saveChanges() {
    this.disableEditMode();
    this.props.onSave(this.state.editedRow);
  }

  render() {
    return (
      <div
        className={`editable-table__row ${this.props.orderClass ? `editable-table__row--${this.props.orderClass}` : ""}`}
      >
        {this.getRowCells()}
        <div className="editable-table__buttons">
          <Button
            className={`button--${this.state.readOnly ? "shown" : "hidden"}`}
            color="blue"
            onClick={event => this.enableEditMode()}
          >
            Edit
          </Button>
          <Button
            className={`button--${!this.state.readOnly ? "shown" : "hidden"}`}
            color="green"
            onClick={event => this.saveChanges()}
          >
            Save
          </Button>
          <Button
            className={`button--${!this.state.readOnly ? "shown" : "hidden"}`}
            color="red"
            onClick={event => this.discardChanges()}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default EditableRow;
