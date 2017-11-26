// @flow
import React, { PureComponent } from "react";

import "./form-field.scss";

type Props = {
  name: String,
  label?: String,
  type?: String,
  value: String,
  disabled?: Boolean,
  placeholder?: String,
  onChange: Function
};

class FormField extends PureComponent<Props> {
  render() {
    return (
      <div className="form__field">
        {this.props.label && (
          <label className="form__field__label" htmlFor={this.props.name}>
            {this.props.label}
          </label>
        )}

        <input
          className="form__field__input"
          id={this.props.label || "field"}
          type={this.props.type || "text"}
          name={this.props.name}
          defaultValue={this.props.value}
          disabled={this.props.disabled}
          component="input"
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default FormField;
