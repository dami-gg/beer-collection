import React, {Component} from 'react';
import {connect} from 'react-redux';
import {v4} from 'node-uuid';

import {addBeer, editBeer, setCurrentBeer} from '../../actions';
import Form from '../form/Form';

class Beer extends Component {
  componentWillMount() {
    if (this.props.params.beerId) {
      // TODO Find beer in collection and store it in state
      // this.setCurrentBeer(beer);
    }
  }

  handleSubmit = (formValues) => {
    let beer = {
      id: this.props.params.mode === 'add' ? v4() : this.props.currentBeer.id,
      name: formValues.name,
      type: formValues.type,
      origin: formValues.origin
    };

    this.props.addBeer(beer);
  };

  render() {
    return (
        <section>
          <h1>
            {
              this.props.params.mode === 'add' ? 'Add a new beer to your collection' : 'Edit beer from your collection'
            }
          </h1>
          <Form
              onSubmit={this.handleSubmit}
              beer={this.props.currentBeer}>
          </Form>
        </section>
    );
  }
}

const mapStateToProps = (state) => ({
  collection: state.collection,
  currentBeer: state.navigation.currentBeer || {}
});

const mapDispatchToProps = (dispatch) => {
  return {
    addBeer: (beer) => {
      dispatch(addBeer(beer));
    },

    editBeer: (beer, index) => {
      dispatch(editBeer(beer, index));
    },

    setCurrentBeer: (beer) => {
      dispatch(setCurrentBeer(beer));
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Beer);
