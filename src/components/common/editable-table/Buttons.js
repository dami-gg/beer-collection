// @flow
import React, { PureComponent } from "react";

import Button from "../button/Button";

import "./buttons.scss";

type Props = {
  onPositiveButtonClick?: Function,
  onNegativeButtonClick?: Function,
  positiveButtonLabel?: string,
  negativeButtonLabel?: string,
  positiveButtonColor?: string,
  negativeButtonColor?: string
};

class Buttons extends PureComponent<Props> {
  render() {
    return (
      <div className="buttons">
        <Button
          color={this.props.positiveButtonColor}
          onClick={event => this.props.onPositiveButtonClick && this.props.onPositiveButtonClick()}>
          {this.props.positiveButtonLabel}
        </Button>
        <Button
          color={this.props.negativeButtonColor}
          onClick={event => this.props.onNegativeButtonClick && this.props.onNegativeButtonClick()}>
          {this.props.negativeButtonLabel}
        </Button>
      </div>
    );
  }
}

export default Buttons;
