// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import EditableTable from "../../common/editable-table/EditableTable";
import Button from "../../common/button/Button";
import SearchBox from "../../common/search-box/SearchBox";

import {
  addBeer,
  updateBeer,
  deleteBeer
} from "../../../actions/collection.actions";
import { COLUMNS } from "./multi-edit.constants";
import {
  exportAsCsvFile,
  getFilteredBeers
} from "../../collection/collection.helpers";
import { getRegularExpression } from "../filters/filters.helpers";

import "./multi-edit.scss";

type Props = {
  collection: Array<Beer>,
  addBeer: Function,
  updateBeer: Function,
  deleteBeer: Function
};

type State = {
  results: Array<Beer>
};

export class MultiEdit extends Component<Props, State> {
  state: State;
  createBeer: Function;
  editBeer: Function;
  deleteBeer: Function;

  constructor(props: Props) {
    super(props);

    this.createBeer = this.createBeer.bind(this);
    this.editBeer = this.editBeer.bind(this);
    this.deleteBeer = this.deleteBeer.bind(this);
    this.exportAsCsvFile = this.exportAsCsvFile.bind(this);

    this.state = {
      results: props.collection
    };
  }

  getRows(): Array<Array<any>> {
    return this.props.collection.map((beer: Beer) => [
      beer.name,
      beer.type,
      beer.origin,
      beer.rating,
      beer.image ? (
        <img src={beer.image} alt={`${beer.name} logo`} />
      ) : (
        <span>No image</span>
      )
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

  filterResults = (query: string) => {
    const searchFilterRegex = getRegularExpression(query);
    const results = getFilteredBeers(this.props.collection, searchFilterRegex);

    this.setState({ results });
  };

  render() {
    return (
      <div className="multi-edit">
        <div className="multi-edit__top">
          <SearchBox
            className="multi-edit__search"
            changeHandler={this.filterResults}
          />

          <Button
            className="multi-edit__export-button"
            color="blue"
            onClick={this.exportAsCsvFile}>
            Export as CSV file
          </Button>
        </div>

        <EditableTable
          columns={COLUMNS}
          rows={this.state.results}
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
