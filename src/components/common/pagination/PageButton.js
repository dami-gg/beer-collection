// @flow
import React from "react";

const PageButton = (props: Object) => (
  <a
    className={`pagination__button ${props.className ? props.className : ""}
                   ${props.active ? "pagination__button--active" : ""}
                   ${props.disabled ? "pagination__button--disabled" : ""}`}
    onClick={() => props.clickHandler && props.clickHandler(props.label)}>
    <span>{props.label}</span>
  </a>
);

export default PageButton;
