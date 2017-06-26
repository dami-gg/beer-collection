// @flow
import React, {PureComponent} from 'react';

import './floating-button.scss';

class FloatingButton extends PureComponent {
  props: {
    iconClass: string,
    label: string,
    clickHandler: Function,
    buttonColor: string,
    iconColor: string
  };

  handleStyleCustomization() {
    let style = {};

    if (this.props.buttonColor) {
      style.backgroundColor = this.props.buttonColor;
    }
    if (this.props.iconColor) {
      style.color = this.props.iconColor;
    }

    return style;
  }

  render() {
    return (
      <div className="floating-button">
        <div onClick={this.props.clickHandler}
             className="floating-button__button"
             style={this.handleStyleCustomization()}>
          <i className={`${this.props.iconClass} floating-button__button__icon`}></i>
        </div>

        <div className="floating-button__label">
          <div className="floating-button__label__text">{this.props.label}</div>
          <i className="fa fa-play floating-button__label__arrow"></i>
        </div>
      </div>
    );
  }
}

export default FloatingButton;
