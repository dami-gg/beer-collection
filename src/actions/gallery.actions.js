// @flow
import type { Image } from "../types/image.types";
import type { ActionWithImageParameter } from '../types/action.types';

/*
  ACTION TYPES
 */

export const ADD_IMAGE_TO_STATE: string = "ADD_IMAGE_TO_STATE";
export const ADD_IMAGE_ERROR: string = "ADD_IMAGE_ERROR";

/*
  ACTIONS
 */

export const addImageToState = (image: Image): ActionWithImageParameter => {
  return {
    type: ADD_IMAGE_TO_STATE,
    image
  };
};
