import React from 'react';

const PageButton = (props) => (
    <a className={`pagination__button
                   ${props.active ? 'pagination__button--active' : ''}
                   ${props.disabled ? 'pagination__button--disabled' : ''}`}
       onClick={props.clickHandler && props.clickHandler(props.label)}>
      <span>{props.label}</span>
    </a>
);

export default PageButton;
