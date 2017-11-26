// @flow
import React, { PureComponent } from "react";

import FormField from "../../common/form-field/FormField";

import "../form/form.scss";

type Props = {
  fields: Array<String>,
  values: Object,
  readOnly?: boolean,
  onChange: Function,
  children?: Object
};

class FormFields extends PureComponent<Props> {
  getFormFields() {
    return this.props.fields.map((field: String, index: Number) => (
      <FormField
        key={field}
        name={field}
        label={field.charAt(0).toUpperCase() + field.slice(1)}
        value={this.props.values[field]}
        disabled={this.props.readOnly}
        onChange={event => this.props.onChange(field, event.target.value)}
        placeholder={`Enter ${field}`}
        autofocus={index === 0 ? true : false}
      />
    ));
  }

  render() {
    return (
      <div className="form__fields">
        {this.getFormFields()}

        {this.props.children}
      </div>
    );
  }
}

export default FormFields;
