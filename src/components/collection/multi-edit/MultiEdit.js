// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import {updateBeer} from '../../../actions/collection.actions';
import EditableTable from "../../common/editable-table/EditableTable";

import "./multi-edit.scss";

class MultiEdit extends Component {
  props: {
    collection: Array<Beer>
  };

  constructor(props) {
    super(props);
    
    this.editBeer = this.editBeer.bind(this);
  }

  getColumns(): Array<any> {
    return [
      { name: "Name", id: 'name', editable: true, type: 'text' },
      { name: "Type", id: 'type', editable: true, type: 'text' },
      { name: "Origin", id: 'origin', editable: true, type: 'text' },
      { name: "Rating", id: 'rating', editable: true, type: 'number' },
      { name: "Image", id: 'image', editable: false, type: 'image' }
    ];
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

  editBeer(editedBeer: Beer) {
    this.props.updateBeer(editedBeer);
  }

  render() {
    return <EditableTable columns={this.getColumns()} rows={this.props.collection} onSave={this.editBeer} />;
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    updateBeer: (beer: Beer) => {
      dispatch(updateBeer(beer));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiEdit);
