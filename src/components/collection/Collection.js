import React, {Component} from 'react';
import {connect} from 'react-redux';

class Collection extends Component {
  render() {
    let beerList = this.props.collection.map((beer) => {
      return (
          <tr key={beer.id}>
            <td>{beer.name}</td>
            <td>{beer.type}</td>
            <td>{beer.origin}</td>
          </tr>
      );
    });

    return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Origin</th>
            </tr>
            </thead>
            <tbody>
              {beerList}
            </tbody>
          </table>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collection: state.collection
});

export default connect(
    mapStateToProps
)(Collection);
