// @flow
import React, { Component } from "react";

import "./search-box.scss";

type Props = {
  className: string,
  changeHandler: Function
};

type State = {
  value: string
};

class SearchBox extends Component<void, Props, State> {
  state: State;
  onChange: Function;
  clearInput: Function;  

  constructor(props: Props) {
    super(props);

    this.state = {
      value: ""
    };

    this.onChange = this.onChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  onChange(event: Object): void {
    const value: string = event.target.value;

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
          autoFocus
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
