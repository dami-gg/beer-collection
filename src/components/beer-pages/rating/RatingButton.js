// @flow
import React, { PureComponent } from "react";

type Props = {
  value: string,
  icon: string,
  readOnly?: boolean
};

class RatingButton extends PureComponent<void, Props, void> {
  render() {
    let disabled = this.props.readOnly ? { disabled: "disabled" } : {};

    return (
      <label>
        <input
          name="rating"
          type="radio"
          component="input"
          value={this.props.value}
          className="rating__input"
          {...disabled}
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
