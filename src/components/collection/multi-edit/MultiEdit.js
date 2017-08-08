// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import EditableTable from "../../common/editable-table/EditableTable";
import Button from "../../common/button/Button";

import {
  addBeer,
  updateBeer,
  deleteBeer
} from "../../../actions/collection.actions";
import { COLUMNS } from "./multi-edit.constants";
import { exportAsCsvFile } from "../../collection/collection.helpers";

import "./multi-edit.scss";

class MultiEdit extends Component {
  createBeer: Function;
  editBeer: Function;
  deleteBeer: Function;

  props: {
    collection: Array<Beer>,
    addBeer: Function,
    updateBeer: Function,
    deleteBeer: Function
  };

  constructor(props) {
    super(props);

    this.createBeer = this.createBeer.bind(this);
    this.editBeer = this.editBeer.bind(this);
    this.deleteBeer = this.deleteBeer.bind(this);
    this.exportAsCsvFile = this.exportAsCsvFile.bind(this);
  }

  getRows(): Array<Array<any>> {
    return this.props.collection.map((beer: Beer) => [
      beer.name,
      beer.type,
      beer.origin,
      beer.rating,
      beer.image
        ? <img src={beer.image} alt={`${beer.name} logo`} />
        : <span>No image</span>
    ]);
  }

  createBeer(newBeer: Beer) {
    this.props.addBeer(newBeer);
  }

  editBeer(editedBeer: Beer) {
    this.props.updateBeer(editedBeer);
  }

  deleteBeer(deletedBeer: Beer) {
    this.props.deleteBeer(deletedBeer);
  }

  exportAsCsvFile = (): void => {
    exportAsCsvFile(this.props.collection, "collection.csv");
  };

  render() {
    return (
      <div className="multi-edit">
        <Button
          className="multi-edit__export-button"
          color="blue"
          onClick={this.exportAsCsvFile}>
          Export as CSV file
        </Button>

        <EditableTable
          columns={COLUMNS}
          rows={this.props.collection}
          onCreate={this.createBeer}
          onEdit={this.editBeer}
          onDelete={this.deleteBeer}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    addBeer: (beer: Beer) => dispatch(addBeer(beer)),
    updateBeer: (beer: Beer) => dispatch(updateBeer(beer)),
    deleteBeer: (beer: Beer) => dispatch(deleteBeer(beer))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiEdit);
