import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateBeer, setCurrentBeer} from '../../actions';
import Form from './BeerForm';

class BeerEdit extends Component {
  componentWillMount() {
    if (this.props.params.beerId) {
      // Find beer in collection and store it in state
      this.props.setCurrentBeer(this.findBeerInCollection(this.props.params.beerId));
    }
  }

  findBeerInCollection(beerId) {
    return this.props.collection.find((element) => {
      return element.id === beerId;
    });
  }

  handleSubmit = (formValues) => {
    let beer = {
      id: this.props.currentBeer.id,
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin
    };

    this.props.updateBeer(beer);
  }

  render() {
    return (
        <section>
          <h1>Edit beer from your collection</h1>
          <Form onSubmit={this.handleSubmit} />
        </section>
    );
  }
}

const mapStateToProps = (state) => ({
  collection: state.collection,
  currentBeer: state.navigation.currentBeer
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateBeer: (beer) => {
      dispatch(updateBeer(beer));
    },

    setCurrentBeer: (beer) => {
      dispatch(setCurrentBeer(beer));
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BeerEdit);
