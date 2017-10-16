// @flow
import React, { PureComponent } from "react";
import { Field } from "redux-form";

type Props = {
  value: string,
  icon: string
};

class RatingButton extends PureComponent<Props> {
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
        <i
          className={`fa fa-${this.props.icon}-o rating__icon`}
          aria-hidden="true"
        />
      </label>
    );
  }
}

export default RatingButton;
