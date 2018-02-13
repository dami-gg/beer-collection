// @flow
import React, { PureComponent } from "react";

import Row from "./Row";
import PersistentRow from "./PersistentRow";

import "./editable-table.scss";

type Props = {
  columns: Array<Object>,
  rows: Array<Object>,
  onEdit: Function,
  onCreate: Function,
  onDelete: Function
};

class EditableTable extends PureComponent<Props> {
  getHeader() {
    return this.props.columns.map((column: Object) => (
      <div
        className={`editable-table__header__column ${column.hiddenOnMobile
          ? "mobile-hidden"
          : ""}`}
        key={column.id}>
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

  render() {
    return (
      <div className="editable-table">
        <div className="editable-table__header">{this.getHeader()}</div>
        <PersistentRow
          columns={this.props.columns}
          onSave={this.props.onCreate}
        />
        {this.getRows()}
      </div>
    );
  }
}

export default EditableTable;
