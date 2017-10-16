// @flow
import React, { PureComponent } from "react";

import "./options.scss";

type Props = {
  values: Array<string>,
  allOptionsLabel?: string,
  onOptionSelected: Function,
  visible: boolean
};

class Options extends PureComponent<Props> {
  handleOptionSelection = (option?: string) => {
    this.props.onOptionSelected(option);
  };

  getOptions(): Array<any> {
    if (!this.props.values) {
      return [];
    }

    let options: Array<
      any
    > = this.props.values.map((value: string, index: number) => (
      <li
        className="options__option"
        key={index + 1}
        onClick={event => this.handleOptionSelection(value)}>
        {value}
      </li>
    ));

    options.unshift(
      <li
        className="options__option options__option--default"
        key={0}
        onClick={event =>
          this.handleOptionSelection(this.props.allOptionsLabel)}>
        {this.props.allOptionsLabel}
      </li>
    );

    return options;
  }

  render() {
    return (
      <ul className={`options ${this.props.visible ? "visible" : "hidden"}`}>
        {this.getOptions()}
      </ul>
    );
  }
}

export default Options;
