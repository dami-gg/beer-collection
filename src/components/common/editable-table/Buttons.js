// @flow
import React, { PureComponent } from "react";

import Button from "../button/Button";

import "./buttons.scss";

class Buttons extends PureComponent {
  props: {
    onPositiveButtonClick: Function,
    onNegativeButtonClick: Function,
    positiveButtonLabel: string,
    negativeButtonLabel: string,
    positiveButtonColor: string,
    negativeButtonColor: string
  };

  render() {
    return (
      <div className="buttons">
        <Button
          color={this.props.positiveButtonColor}
          onClick={event => this.props.onPositiveButtonClick()}
        >
          {this.props.positiveButtonLabel}
        </Button>
        <Button
          color={this.props.negativeButtonColor}
          onClick={event => this.props.onNegativeButtonClick()}
        >
          {this.props.negativeButtonLabel}
        </Button>
      </div>
    );
  }
}

export default Buttons;
