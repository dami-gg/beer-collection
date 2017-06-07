// @flow

type State = {
  showContent: boolean,
  selectedOption: string
};

import React, { Component } from "react";
import Button from "../button/Button";

import "./dropdown-filter.scss";

class DropdownFilter extends Component {
  state: State;

  props: {
    type: string,
    className: string,
    values: Array<string>,
    allOptionsLabel?: string,
    onOptionSelected: Function
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      showContent: false,
      selectedOption: this.props.allOptionsLabel || this.props.values[0]
    };
  }

  handleOptionSelection = (option?: string) => {
    this.props.onOptionSelected(option);
    this.setState({selectedOption: option});
    this.toggleContent();
  }

  getOptions() {
    let options = this.props.values.map((value: string, index: number) => (
      <li
        className="dropdown-filter__option"
        key={index + 1}
        onClick={event => this.handleOptionSelection(value)}
      >
        {value}
      </li>
    ));
    if (this.props.allOptionsLabel) {
      options.unshift(
        <li
          className="dropdown-filter__option dropdown-filter__option--default"
          key={0}
          onClick={event => this.handleOptionSelection(this.props.allOptionsLabel)}>
          {this.props.allOptionsLabel}
        </li>
      );
    }
    return options;
  }

  toggleContent() {
    this.setState({ showContent: !this.state.showContent });
  }

  render() {
    return (
      <div className={`dropdown-filter dropdown-filter--${this.props.type} ${this.props.className}`}>
        <Button
          className="dropdown-filter__button"
          color="blue"
          onClick={event => this.toggleContent()}
        >
          {this.state.selectedOption}
          <span className="dropdown-filter__arrow" />
        </Button>
        <ul
          className={`dropdown-filter__options ${this.state.showContent ? "shown" : "hidden"}`}
        >
          {this.getOptions()}
        </ul>
      </div>
    );
  }
}

export default DropdownFilter;
