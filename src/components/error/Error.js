// @flow
import React, { PureComponent } from "react";

import error from '../../assets/images/error.png';

import './error.scss';

class Error extends PureComponent {
  render() {
    return (
      <div className="error-page">
        <h1 className="error-page__title">This page could not be found!</h1>
        <p className="error-page__text">Please try again</p>
        <div className="error-page__image-wrapper">
            <img className="error-page__image" src={error} alt="error-image"/>
        </div>
      </div>
    );
  }
}

export default Error;
