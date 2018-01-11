// @flow
import type { Rating } from "../../../types/rating.types";

import React, { PureComponent } from "react";

import RatingButton from "./RatingButton";
import { RATINGS } from "./ratings.constants";

import "./ratings.scss";

type Props = {
  readOnly?: boolean,
  currentValue?: string,
  onChange: Function
};

class Ratings extends PureComponent<void, Props, void> {
  getButtons() {
    return RATINGS.map((rating: Rating, index: number) => (
      <RatingButton
        key={index}
        value={`${rating.value}`}
        icon={rating.icon}
        readOnly={this.props.readOnly}
        selected={this.props.currentValue === rating.value}
        onChange={event => this.props.onChange("rating", event.target.value)}
      />
    ));
  }

  render() {
    return <div className="ratings">{this.getButtons()}</div>;
  }
}

export default Ratings;
