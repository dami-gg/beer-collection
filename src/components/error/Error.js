// @flow
import React, { PureComponent } from "react";

import error from "../../assets/images/error.png";

import "./error.scss";

type Props = {};

class Error extends PureComponent<void, Props, void> {
  render() {
    return (
      <div className="error-page">
        <h1 className="error-page__title">This page could not be found!</h1>
        <div className="error-page__image-wrapper">
          <img className="error-page__image" src={error} alt="error" />
        </div>
        <p className="error-page__text">Please try again</p>
      </div>
    );
  }
}

export default Error;
