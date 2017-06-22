// @flow

import { PLACEHOLDER_PAGE_LABEL } from "./pagination.constants";

export const getButtonLabels = (
  totalPages: number,
  totalPageButtons: number,
  currentPage: number
): Array<any> => {
  if (totalPages <= totalPageButtons) {
    return generateMinimumButtons(totalPages);
  } else if (currentPage <= 3) {
    return generateInitialPageButtons(totalPages, totalPageButtons);
  } else if (currentPage >= totalPages - 2) {
    return generateEndingPageButtons(totalPages, currentPage);
  } else {
    return generateIntermediatePageButtons(totalPages, totalPageButtons);
  }
};

const generateMinimumButtons = (totalPages: number): Array<any> => {
  return Array(totalPages).fill(0).map((value, index) => index + 1);
};

const generateInitialPageButtons = (
  totalPages: number,
  totalPageButtons: number
): Array<any> => {
  const remainingButtons = totalPageButtons - 2;

  let buttons: Array<any> = Array(remainingButtons)
    .fill(0)
    .map((value, index) => index + 1);
  buttons.push(PLACEHOLDER_PAGE_LABEL);
  buttons.push(totalPages);
  return buttons;
};

const generateIntermediatePageButtons = (
  totalPages: number,
  currentPage: number
): Array<any> => {
  let buttons: Array<any> = [];
  buttons.push(1);
  buttons.push(PLACEHOLDER_PAGE_LABEL);
  buttons.push(currentPage - 1);
  buttons.push(currentPage);
  buttons.push(currentPage + 1);
  buttons.push(PLACEHOLDER_PAGE_LABEL);
  buttons.push(totalPages);
  return buttons;
};

const generateEndingPageButtons = (
  totalPages: number,
  totalPageButtons: number
): Array<any> => {
  let startingButtons: Array<any> = [];
  startingButtons.push(1);
  startingButtons.push(PLACEHOLDER_PAGE_LABEL);

  const remainingButtons = totalPageButtons - 2;

  let endingButtons: Array<any> = Array(remainingButtons)
    .fill(0)
    .map((value, index) => index + totalPages - remainingButtons + 1);

  return [...startingButtons, ...endingButtons];
};
