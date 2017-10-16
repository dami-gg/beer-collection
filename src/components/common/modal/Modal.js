// @flow

import React, { PureComponent } from "react";

import Button from "../button/Button";

import "./modal.scss";

type Props = {
  children: Object,
  isOpened: boolean,
  onClose: Function,
  onSave?: Function
};

export class Modal extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
  }

  handleSaveButtonClick(event: Object) {
    event.preventDefault();
    this.props.onSave();
    this.props.onClose();
  }

  handleCancelButtonClick(event: Object) {
    event.preventDefault();
    this.props.onClose();
  }

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
        {this.props.onSave && ( // TODO Replace by Buttons (and make it common)
          <div className="modal__buttons">
            <Button
              className="modal__button--save"
              type="submit"
              color="green"
              onClick={event => this.handleSaveButtonClick(event)}>
              Save
            </Button>
            <Button
              className="modal__button--cancel"
              color="grey"
              onClick={event => this.handleCancelButtonClick(event)}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Modal;
