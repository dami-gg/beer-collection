import React from 'react';

import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import Rating from '../rating/Rating';

import './beer-form.scss';

const BeerFormInputFields = (props) => (
    <div className="beer-form__inputs__fields">
      <FormGroup
          controlId="name">
        <ControlLabel>Name</ControlLabel>
        <Field
            name="name"
            className="form-control"
            placeholder="Enter name"
            component="input"
            disabled={props.readOnly}
            type="text">
        </Field>
      </FormGroup>

      <FormGroup
          controlId="type">
        <ControlLabel>Type</ControlLabel>
        <Field
            name="type"
            className="form-control"
            placeholder="Enter type"
            component="input"
            disabled={props.readOnly}
            type="text">
        </Field>
      </FormGroup>

      <FormGroup
          controlId="origin">
        <ControlLabel>Origin</ControlLabel>
        <Field
            name="origin"
            className="form-control"
            placeholder="Enter origin"
            component="input"
            disabled={props.readOnly}
            type="text">
        </Field>
      </FormGroup>

      <Rating
        readOnly={props.readOnly}>
      </Rating>
    </div>
);

export default BeerFormInputFields;
