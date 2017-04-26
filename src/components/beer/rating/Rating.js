import React from 'react';
import {Field} from 'redux-form';

import './rating.scss';

const Rating = () => (
    <div className="rating">
      <label>
        <Field name="rating" type="radio" component="input" value="5" className="rating__input"/>
        <i className="fa fa-heart-o rating__icon" aria-hidden="true"></i>
      </label>

      <label>
        <Field name="rating" type="radio" component="input" value="4" className="rating__input"/>
        <i className="fa fa-star-o rating__icon" aria-hidden="true"></i>
      </label>

      <label>
        <Field name="rating" type="radio" component="input" value="3" className="rating__input"/>
        <i className="fa fa-smile-o rating__icon" aria-hidden="true"></i>
      </label>

      <label>
        <Field name="rating" type="radio" component="input" value="2" className="rating__input"/>
        <i className="fa fa-meh-o rating__icon" aria-hidden="true"></i>
      </label>

      <label>
        <Field name="rating" type="radio" component="input" value="1" className="rating__input"/>
        <i className="fa fa-frown-o rating__icon" aria-hidden="true"></i>
      </label>
    </div>
);

export default Rating;
