// @flow
import React, {PureComponent} from 'react';

import FormField from '../../common/form-field/FormField';
import Rating from '../rating/Rating';

import '../form/form.scss';

type Props = {
    readOnly?: boolean
}

class FormFields extends PureComponent<Props> {
  render() {
    return (
        <div className="beer-form__fields">
          <FormField
              name="name"
              label="Name"
              disabled={this.props.readOnly}
              placeholder="Enter name">
          </FormField>

          <FormField
              name="type"
              label="Type"
              disabled={this.props.readOnly}
              placeholder="Enter type">
          </FormField>

          <FormField
              name="origin"
              label="Origin"
              disabled={this.props.readOnly}
              placeholder="Enter origin">
          </FormField>

          <Rating
              readOnly={this.props.readOnly}>
          </Rating>
        </div>
    );
  }
}

export default FormFields;
