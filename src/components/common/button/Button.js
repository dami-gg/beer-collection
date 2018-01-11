// @flow
import React, { PureComponent } from "react";

import "./button.scss";

type Props = {
  type?: string,
  color?: string,
  className?: string,
  onClick?: Function,
  children?: any
};

class Button extends PureComponent<Props> {
  render() {
    return (
      <button
        type={this.props.type || "button"}
        className={`button button--${this.props.color ? this.props.color : 'blue'} ${this.props.className
          ? this.props.className
          : ""}`}
        onClick={event => this.props.onClick && this.props.onClick(event)}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
