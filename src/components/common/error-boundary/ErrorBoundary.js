import React, { Component } from "react";

import "./error-boundary.scss";

import error from "../../../assets/images/error.png";

type Props = {
  children: any
};

type State = {
  hasError: boolean
};

class ErrorBoundary extends Component<Props, State> {
  state: State;
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? (
      <div className="error-boundary">
        <img className="error-boundary__image" src={error} alt="error" />
        <p className="error-boundary__text">Something went wrong!</p>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
