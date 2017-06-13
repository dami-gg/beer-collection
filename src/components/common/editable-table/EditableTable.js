// @flow
import React, { PureComponent } from "react";

import Row from "./Row";

import "./editable-table.scss";

class EditableTable extends PureComponent {
  props: {
    columns: Array<Object>,
    rows: Array<Object>,
    onEdit: Function,
    onCreate: Function,
    onDelete: Function
  };

  getHeader() {
    return this.props.columns.map((column: Object) => (
      <div
        className={`editable-table__header__column ${column.hiddenOnMobile ? "mobile-hidden" : ""}`}
        key={column.id}
      >
        {column.name}
      </div>
    ));
  }

  getRows() {
    return this.props.rows.map((row: Object, index: number) => (
      <Row
        row={row}
        type={index % 2 === 0 ? "light" : "dark"}
        key={`${row.id}${index}`} // Trick to make all the rows update when adding an item and keep the correct background colors
        columns={this.props.columns}
        onSave={this.props.onEdit}
        onDelete={this.props.onDelete}
      />
    ));
  }

  getExtraRow() {
    return (
      <Row
        row={{}}
        type="extra"
        columns={this.props.columns}
        onSave={this.props.onCreate}
      />
    );
  }

  render() {
    return (
      <div className="editable-table">
        <div className="editable-table__header">
          {this.getHeader()}
        </div>
        {this.getExtraRow()}
        {this.getRows()}
      </div>
    );
  }
}

export default EditableTable;
