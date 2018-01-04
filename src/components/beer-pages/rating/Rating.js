// @flow
import React, { PureComponent } from "react";

import RatingButton from "./RatingButton";
import { RATINGS } from "./rating.constants";

import "./rating.scss";

type Props = {
  readOnly?: boolean
};

class Rating extends PureComponent<void, Props, void> {
  getButtons() {
    return RATINGS.map((rating, index) => (
      <RatingButton key={index} value={`${rating.value}`} icon={rating.icon} />
    ));
  }

  render() {
    return <div className="rating">{this.getButtons()}</div>;
  }
}

export default Rating;
