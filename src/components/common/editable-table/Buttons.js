// @flow
import React, { PureComponent } from "react";

import Button from "../button/Button";

import "./buttons.scss";

class Buttons extends PureComponent {
  props: {
    readOnly: boolean,
    onEdit: Function,
    onCancel: Function,
    onSave: Function,
    onDelete: Function
  };

  render() {
    return (
      <div className="buttons">
        <Button
          className={`button--${this.props.readOnly ? "shown" : "hidden"}`}
          color="blue"
          onClick={event => this.props.onEdit()}
        >
          Edit
        </Button>
        <Button
          className={`button--${!this.props.readOnly ? "shown" : "hidden"}`}
          color="green"
          onClick={event => this.props.onSave()}
        >
          Save
        </Button>
        <Button
          className={`button--${!this.props.readOnly ? "shown" : "hidden"}`}
          color="grey"
          onClick={event => this.props.onCancel()}
        >
          Cancel
        </Button>
        <Button
          className={`button--${this.props.readOnly ? "shown" : "hidden"}`}
          color="red"
          onClick={event => this.props.onDelete()}
        >
          Delete
        </Button>
      </div>
    );
  }
}

export default Buttons;
