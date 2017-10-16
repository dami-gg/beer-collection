// @flow

import React, { PureComponent } from "react";

import "./modal.scss";

type Props = {
  children: Object,
  isOpened: boolean,
  onClose: Function
};

export class Modal extends PureComponent<Props> {
  render() {
    return (
      <div
        className={`modal ${this.props.isOpened
          ? "modal__opened"
          : "modal__closed"}`}>
        <div
          className="modal__close-button"
          onClick={event => this.props.onClose()}>
          <i className="fa fa-times" />
        </div>
        <div className="modal__content">{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
