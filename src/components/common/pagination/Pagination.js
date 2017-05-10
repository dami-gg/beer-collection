// @flow
import React, {PureComponent} from 'react';

import PageButton from './PageButton';

import './pagination.scss';

const PLACEHOLDER_PAGE_LABEL: string = '...';

class Pagination extends PureComponent {
  totalPages: number;
  navigateToPage: Function;
  navigateToPreviousPage: Function;
  navigateToNextPage: Function;

  props: {
    numItems: number,
    currentPage: number,
    resultsPerPage: number,
    totalPageButtons: number,
    onNavigation: Function
  };

  constructor(props: Object) {
    super(props);

    this.navigateToPage = this.navigateToPage.bind(this);
    this.navigateToPreviousPage = this.navigateToPreviousPage.bind(this);
    this.navigateToNextPage = this.navigateToNextPage.bind(this);
  }

  componentWillMount() {
    this.totalPages = this.getTotalPages();
  }

  getTotalPages() {
    if (!this.props.numItems) {
      return 1;
    }

    return Math.ceil(this.props.numItems / this.props.resultsPerPage);
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
    return this.getButtonLabels().map((item, i) => (
        <PageButton key={i}
                    label={item}
                    clickHandler={this.navigateToPage}
                    active={this.props.currentPage === item}
                    disabled={item === PLACEHOLDER_PAGE_LABEL}>
        </PageButton>
    ));
  }

  getButtonLabels(): Array<any> {
    if (this.totalPages <= this.props.totalPageButtons) {
      return this.generateMinimumButtons();
    }
    else if (this.props.currentPage <= 3) {
      return this.generateInitialPageButtons();
    }
    else if (this.props.currentPage >= this.totalPages - 2) {
      return this.generateEndingPageButtons();
    }
    else {
      return this.generateIntermediatePageButtons();
    }
  }

  generateMinimumButtons(): Array<any> {
    return Array(this.totalPages).fill(0).map((value, index) => index + 1);
  }

  generateInitialPageButtons(): Array<any> {
    const remainingButtons = this.props.totalPageButtons - 2;

    let buttons: Array<any> = Array(remainingButtons).fill(0)
        .map((value, index) => index + 1);
    buttons.push(PLACEHOLDER_PAGE_LABEL);
    buttons.push(this.totalPages);
    return buttons;
  }

  generateIntermediatePageButtons(): Array<any> {
    let buttons: Array<any> = [];
    buttons.push(1);
    buttons.push(PLACEHOLDER_PAGE_LABEL);
    buttons.push(this.props.currentPage - 1);
    buttons.push(this.props.currentPage);
    buttons.push(this.props.currentPage + 1);
    buttons.push(PLACEHOLDER_PAGE_LABEL);
    buttons.push(this.totalPages);
    return buttons;
  }

  generateEndingPageButtons(): Array<any> {
    let startingButtons: Array<any> = [];
    startingButtons.push(1);
    startingButtons.push(PLACEHOLDER_PAGE_LABEL);

    const remainingButtons = this.props.totalPageButtons - 2;

    let endingButtons: Array<any> = Array(remainingButtons).fill(0)
        .map((value, index) => index + this.totalPages - remainingButtons + 1);

    return [...startingButtons, ...endingButtons];
  }

  render() {
    return (
        <div className={`pagination ${this.totalPages === 1 ? 'pagination--hidden' : ''}`}>
          <PageButton label="&laquo;"
                      disabled={this.props.currentPage === 1}
                      clickHandler={this.navigateToPreviousPage}>
          </PageButton>

          { this.generatePageButtons() }

          <PageButton label="&raquo;"
                      disabled={this.props.currentPage === this.totalPages}
                      clickHandler={this.navigateToNextPage}>
          </PageButton>
        </div>
    );
  }
}

export default Pagination;
