// @flow

import React from 'react';

import './button.scss';

const Button = (props: Object) => (
    <button type={props.type || "button"}
            className={`button button--${props.color} ${props.classes}`}
            onClick={event => props.onClick && props.onClick(event)}>
      {props.children}
    </button>
);

export default Button;
