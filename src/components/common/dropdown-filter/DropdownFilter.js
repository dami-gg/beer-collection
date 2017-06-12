// @flow

type State = {
  selectedOption: string,
  showOptions: boolean
};

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Button from "../button/Button";
import Options from "./Options";

import "./dropdown-filter.scss";

class DropdownFilter extends Component {
  state: State;

  props: {
    id?: string,
    type: string,
    className: string,
    values: Array<string>,
    allOptionsLabel?: string,
    onOptionSelected: Function
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      selectedOption: this.props.allOptionsLabel || this.props.values[0],
      showOptions: false
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({ showOptions: false });
    }
  }

  handleOptionSelection = (option?: string) => {
    this.props.onOptionSelected(option);
    this.setState({ selectedOption: option });
    this.toggleContent();
  };

  toggleContent() {
    this.setState({ showOptions: !this.state.showOptions });
  }

  render() {
    return (
      <div
        className={`dropdown-filter dropdown-filter--${this.props.type} ${this.props.className}`}
      >
        <Button
          className="dropdown-filter__button"
          color="blue"
          onClick={event => this.toggleContent()}
        >
          {this.state.selectedOption}
          <span className="dropdown-filter__arrow" />
        </Button>
        <Options
          values={this.props.values}
          allOptionsLabel={this.props.allOptionsLabel}
          onOptionSelected={this.handleOptionSelection}
          visible={this.state.showOptions}
        />
      </div>
    );
  }
}

export default DropdownFilter;
