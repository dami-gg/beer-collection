// @flow
import React, { PureComponent } from "react";

type Props = {
  value: string,
  icon: string
};

class RatingButton extends PureComponent<void, Props, void> {
  render() {
    return (
      <label>
        <input
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
