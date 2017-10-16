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
        clickHandler={this.navigateToPage}
        active={this.props.currentPage === item}
        disabled={item === PLACEHOLDER_PAGE_LABEL}
      />
    ));
  }

  render() {
    return (
      <div
        className={`pagination ${this.totalPages === 1
          ? "pagination--hidden"
          : ""} ${this.props.className}`}>
        <PageButton
          label="&laquo;"
          disabled={this.props.currentPage === 1}
          clickHandler={this.navigateToPreviousPage}
        />

        {this.generatePageButtons()}

        <PageButton
          label="&raquo;"
          disabled={this.props.currentPage === this.totalPages}
          clickHandler={this.navigateToNextPage}
        />
      </div>
    );
  }
}

export default Pagination;
