// @flow
import React, { PureComponent } from "react";

type Props = {
  value: string,
  icon: string,
  readOnly?: boolean,
  selected: boolean,
  onChange: Function
};

class RatingButton extends PureComponent<Props> {
  render() {
    let defaultChecked = this.props.selected
      ? { defaultChecked: "defaultChecked" }
      : {};
    let disabled = this.props.readOnly ? { disabled: "disabled" } : {};

    return (
      <label>
        <input
          name="rating"
          type="radio"
          component="input"
          value={this.props.value}
          className="ratings__input"
          onChange={this.props.onChange}
          {...defaultChecked}
          {...disabled}
        />
        <i
          className={`fa fa-${this.props.icon}-o ratings__icon`}
          aria-hidden="true"
        />
      </label>
    );
  }
}

export default RatingButton;
