// @flow
import React, { PureComponent } from "react";

import PageButton from "./PageButton";

import { getButtonLabels } from "./pagination.helpers";
import { PLACEHOLDER_PAGE_LABEL } from "./pagination.constants";

import "./pagination.scss";

type Props = {
  className: string,
  numItems: number,
  currentPage: number,
  resultsPerPage: number,
  totalPageButtons: number,
  onNavigation: Function
};

class Pagination extends PureComponent<Props> {
  totalPages: number;
  navigateToPage: Function;
  navigateToPreviousPage: Function;
  navigateToNextPage: Function;

  constructor(props: Props) {
    super(props);

    this.navigateToPage = this.navigateToPage.bind(this);
    this.navigateToPreviousPage = this.navigateToPreviousPage.bind(this);
    this.navigateToNextPage = this.navigateToNextPage.bind(this);

    this.totalPages = this.getTotalPages();
  }

  componentWillUpdate(nextProps: Object) {
    this.totalPages = this.getTotalPages(nextProps.numItems);
  }

  getTotalPages(numItems: number = this.props.numItems) {
    return Math.ceil(numItems / this.props.resultsPerPage);
  }

  navigateToPage(page: number) {
    if (page !== PLACEHOLDER_PAGE_LABEL) {
      this.props.onNavigation(page);
    }
  }

  navigateToPreviousPage() {
    if (this.props.currentPage !== 1) {
      this.navigateToPage(this.props.currentPage - 1);
    }
  }

  navigateToNextPage() {
    if (this.props.currentPage !== this.totalPages) {
      this.navigateToPage(this.props.currentPage + 1);
    }
  }

  generatePageButtons() {
    return getButtonLabels(
      this.totalPages,
      this.props.totalPageButtons,
      this.props.currentPage
    ).map((item, i) => (
      <PageButton
        key={i}
        label={item}
        className={
          Math.abs(i - (this.props.currentPage - 1)) > 1
            ? "small-screens--hidden"
            : ""
        }
        clickHandler={this.navigateToPage}
        active={this.props.currentPage === item}
        disabled={item === PLACEHOLDER_PAGE_LABEL}
      />
    ));
  }

  generateOutmostButton(position: string = "left") {
    if (this.props.numItems && this.props.numItems > 0) {
      const isLeftPositioned = position === "left";
      const isDisabled = isLeftPositioned
        ? this.props.currentPage === 1
        : this.props.currentPage === this.totalPages;

        console.log(isDisabled);

      return (
        <PageButton
          label={isLeftPositioned ? "<" : ">"}
          disabled={isDisabled}
          clickHandler={
            isLeftPositioned
              ? this.navigateToPreviousPage
              : this.navigateToNextPage
          }
        />
      );
    }
  }

  render() {
    return (
      <div
        className={`pagination ${this.totalPages === 1
          ? "pagination--hidden"
          : ""} ${this.props.className}`}>
        {this.generateOutmostButton("left")}

        {this.generatePageButtons()}

        {this.generateOutmostButton("right")}
      </div>
    );
  }
}

export default Pagination;
