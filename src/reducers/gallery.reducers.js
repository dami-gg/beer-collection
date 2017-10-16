// @flow

import type { Image } from "../types/image.types";

import {
  ADD_IMAGE_TO_STATE,
  ADD_IMAGE_ERROR
} from "../actions/gallery.actions";

const initialState = [];

const gallery = (
  state: Array<Image> = initialState,
  action: Object
): Array<Image> => {
  switch (action.type) {
    case ADD_IMAGE_TO_STATE:
      return imageIsAlreadyStored(state, action.image)
        ? state
        : [...state, action.image];

    case ADD_IMAGE_ERROR:
      return state;

    default:
      return state;
  }
};

const imageIsAlreadyStored = (state: Array<Image>, image: Image) =>
  state.find(storedImage => storedImage.url === image.url);

export default gallery;
