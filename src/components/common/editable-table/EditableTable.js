// @flow
import React, { PureComponent } from "react";

import EditableRow from "./EditableRow";

import "./editable-table.scss";

class EditableTable extends PureComponent {
  props: {
    columns: Array<Object>,
    rows: Array<Object>,
    onSave: Function
  };

  getHeader() {
    return this.props.columns.map((column: string, index: number) =>
      this.getCell(column.name, index)
    );
  }

  getRows() {
    return this.props.rows.map((row: Object, index: number) => (
      <EditableRow
        row={row}
        key={index}
        orderClass={index % 2 === 0 ? "even" : "odd"}
        columns={this.props.columns}
        onSave={this.props.onSave}
      />
    ));
  }

  getCell(cell: string, index: number) {
    return <div className="editable-table__cell" key={index}>{cell}</div>;
  }

  render() {
    return (
      <div className="editable-table">
        <div className="editable-table__header">
          {this.getHeader()}
        </div>
        {this.getRows()}
      </div>
    );
  }
}

export default EditableTable;
