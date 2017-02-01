import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {Field, reduxForm} from 'redux-form';

class BeerForm extends Component {
  render() {
    return (
        <form onSubmit={this.props.handleSubmit}>
          <FormGroup
              controlId="name">
            <ControlLabel>Name</ControlLabel>
            <Field
                name="name"
                className="form-control"
                placeholder="Enter name"
                component="input"
                type="text"/>
          </FormGroup>

          <FormGroup
              controlId="type">
            <ControlLabel>Type</ControlLabel>
            <Field
                name="type"
                className="form-control"
                placeholder="Enter type"
                component="input"
                type="text"/>
          </FormGroup>

          <FormGroup
              controlId="origin">
            <ControlLabel>Origin</ControlLabel>
            <Field
                name="origin"
                className="form-control"
                placeholder="Enter origin"
                component="input"
                type="text"/>
          </FormGroup>

          <Button
              type="submit"
              bsStyle="primary">
            Save
          </Button>
        </form>
    );
  }
}

const mapStateToProps = (state) => ({
  initialValues: state.navigation.currentBeer || {}
});

export default connect(
    mapStateToProps
)(reduxForm({
  form: 'beerForm'
})(BeerForm));

