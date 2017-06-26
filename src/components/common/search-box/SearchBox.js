// @flow
import React, { Component } from "react";

import "./search-box.scss";

type State = {
  value: string
};

class SearchBox extends Component {
  state: State;
  onChange: Function;
  clearInput: Function;

  props: {
    className: string,
    changeHandler: Function
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      value: ""
    };

    this.onChange = this.onChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  onChange(event: Object): void {
    const value = event.target.value;

    this.setState({ value });
    this.props.changeHandler(value);
  }

  inputIsDirty(): boolean {
    return this.state.value !== "";
  }

  clearInput(): void {
    this.setState({ value: "" });
    this.props.changeHandler("");
  }

  render() {
    return (
      <div className={`search-box ${this.props.className}`}>
        <input
          className="search-box__input"
          type="text"
          value={this.state.value}
          placeholder="Search by name"
          onChange={this.onChange}
        />
        <div className="search-box__clear">
          {this.inputIsDirty() &&
            <i
              className="search-box__clear__button fa fa-times"
              onClick={this.clearInput}
            />}
        </div>
        <i className="search-box__icon fa fa-search" />
      </div>
    );
  }
}

export default SearchBox;
