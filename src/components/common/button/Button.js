// @flow

import React, {PureComponent} from 'react';

import './button.scss';

class Button extends PureComponent {
  props: {
    type: string,
    color: string,
    classes?: string,
    onClick: Function,
    children: any
  };

  render() {
    return (
        <button type={this.props.type || "button"}
                className={`button button--${this.props.color} ${this.props.classes}`}
                onClick={event => this.props.onClick && this.props.onClick(event)}>
          {this.props.children}
        </button>
    );
  }
}

export default Button;
