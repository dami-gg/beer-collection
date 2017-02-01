import React, {Component} from 'react';
import {connect} from 'react-redux';
import {v4} from 'node-uuid';

import {addBeer} from '../../actions';
import Form from './BeerForm';

class BeerAdd extends Component {
  handleSubmit = (formValues) => {
    let beer = {
      id: this.props.params.mode === v4(),
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin
    };

    this.props.addBeer(beer);
  }

  render() {
    return (
        <section>
          <h1>Add a new beer to your collection</h1>
          <Form onSubmit={this.handleSubmit} />
        </section>
    );
  }
}

const mapStateToProps = (state) => ({
  collection: state.collection
});

const mapDispatchToProps = (dispatch) => {
  return {
    addBeer: (beer) => {
      dispatch(addBeer(beer));
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BeerAdd);
