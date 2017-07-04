// @flow
import React from "react";

import { Field } from "redux-form";

import "./form-field.scss";

const FormField = (props: Object) =>
  <div className="form__field">
    {props.label &&
      <label className="form__field__label" htmlFor={props.name}>
        {props.label}
      </label>}

    <Field
      className="form__field__input"
      id={props.label || "field"}
      type={props.type || "text"}
      name={props.name}
      value=""
      disabled={props.disabled}
      component="input"
      placeholder={props.placeholder}
    />
  </div>;

export default FormField;
