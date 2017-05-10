import React from 'react';

import FormField from '../../common/form-field/FormField';
import Rating from '../rating/Rating';

import '../form/form.scss';

const FormFields = (props) => (
    <div className="beer-form__fields">
      <FormField
          name="name"
          label="Name"
          disabled={props.readOnly}
          placeholder="Enter name">
      </FormField>

      <FormField
          name="type"
          label="Type"
          disabled={props.readOnly}
          placeholder="Enter type">
      </FormField>

      <FormField
          name="origin"
          label="Origin"
          disabled={props.readOnly}
          placeholder="Enter origin">
      </FormField>

      <Rating
          readOnly={props.readOnly}>
      </Rating>
    </div>
);

export default FormFields;
