import React from 'react';

import './rating.scss';

const Rating = () => (
    <div className="rating form-group">
      <input type="radio" id="rating-5" name="rating" className="rating__input"></input>
      <label htmlFor="rating-5" className="fa fa-heart-o rating__label"></label>

      <input type="radio" id="rating-4" name="rating" className="rating__input"></input>
      <label htmlFor="rating-4" className="fa fa-star-o rating__label"></label>

      <input type="radio" id="rating-3" name="rating" className="rating__input"></input>
      <label htmlFor="rating-3" className="fa fa-smile-o rating__label"></label>

      <input type="radio" id="rating-2" name="rating" className="rating__input"></input>
      <label htmlFor="rating-2" className="fa fa-meh-o rating__label"></label>

      <input type="radio" id="rating-1" name="rating" className="rating__input"></input>
      <label htmlFor="rating-1" className="fa fa-frown-o rating__label"></label>
    </div>
);

export default Rating;
