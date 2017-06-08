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
    return this.props.columns.map((column: Object, index: number) => (
      <div className="editable-table__header__column" key={index}>
        {column.name}
      </div>
    ));
  }

  getRows() {
    return this.props.rows.map((row: Object, index: number) => (
      <Row
        row={row}
        type={index % 2 === 0 ? "light" : "dark"}
        key={index}
        columns={this.props.columns}
        onSave={this.props.onEdit}
        onDelete={this.props.onDelete}
      />
    ));
  }

  getExtraRow() {
    return <Row
        row={{}}
        type="extra"
        columns={this.props.columns}
        onSave={this.props.onCreate}
      />;
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
