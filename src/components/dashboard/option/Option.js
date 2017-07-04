// @flow
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import "./option.scss";

class Option extends PureComponent {
  props: {
    title: string,
    url: string,
    image: string,
    disabled?: boolean
  };

  render() {
    return (
      <div
        className={`dashboard__option ${this.props.disabled
          ? "dashboard__option--disabled"
          : ""}`}
      >
        <Link className="dashboard__option__card" to={this.props.url}>
          <div className="dashboard__option__image-wrapper">
            <img
              src={this.props.image}
              className="dashboard__option__image"
              alt="logo"
            />
          </div>
          <div className="dashboard__option__title-wrapper">
            <p className="dashboard__option__title">
              {this.props.title}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

export default Option;
