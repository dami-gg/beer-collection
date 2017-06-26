// @flow
import React, { PureComponent } from "react";
import { Field } from "redux-form";

class RatingButton extends PureComponent {
  props: {
    value: string,
    icon: string
  };

  render() {
    return (
      <label>
        <Field
          name="rating"
          type="radio"
          component="input"
          value={this.props.value}
          className="rating__input"
        />
        <i className={`fa fa-${this.props.icon}-o rating__icon`} aria-hidden="true" />
      </label>
    );
  }
}

export default RatingButton;
