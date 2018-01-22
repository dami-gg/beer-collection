// @flow
import React, { PureComponent } from "react";

import logo from "../../../assets/images/logo.png";

import "./logo.scss";

type Props = {
  collapsed?: boolean
};

class Logo extends PureComponent<Props> {
  render() {
    return (
      <div className={`logo ${this.props.collapsed ? "logo--collapsed" : ""}`}>
        <div className="logo__image-wrapper">
          <img className="logo__image" src={logo} alt="logo" />
        </div>

        <h1 className="logo__title" data-text="Beer collection">
          Beer collection
        </h1>
      </div>
    );
  }
}

export default Logo;
