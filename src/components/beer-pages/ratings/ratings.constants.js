// @flow
import type { Rating } from "../../../types/rating.types";

export const RATINGS: Array<Rating> = [
  {
    value: "5",
    icon: "heart"
  },
  {
    value: "4",
    icon: "star"
  },
  {
    value: "3",
    icon: "smile"
  },
  {
    value: "2",
    icon: "meh"
  },
  {
    value: "1",
    icon: "frown"
  }
];

export const NOT_RATED_KEY: string = "Not rated";

export const RATINGS_LABELS: Array<string> = [
  ...RATINGS.map(rating => rating.value),
  NOT_RATED_KEY
];
