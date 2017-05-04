// @flow
import type {Beer} from '../../types';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RESULTS_PER_PAGE, TOTAL_PAGE_BUTTONS, PLACEHOLDER_PAGE_LABEL} from '../../constants';

import PageButton from './PageButton';

import './pagination.scss';

class Pagination extends Component {
  totalPages: number = undefined;

  props: {
    collection: Array<Beer>,
    currentPage: number,
    onNavigation: Function
  };

  constructor(props) {
    super(props);

    this.navigateToPage = this.navigateToPage.bind(this);
    this.navigateToPreviousPage = this.navigateToPreviousPage.bind(this);
    this.navigateToNextPage = this.navigateToNextPage.bind(this);
  }

  componentWillMount() {
    this.totalPages = 12; // TODO this.getTotalPages();
  }

  getTotalPages() {
    return this.props.collection && Math.ceil(this.props.collection.length / RESULTS_PER_PAGE);
  }

  navigateToPage(page) {
    if (page !== PLACEHOLDER_PAGE_LABEL) {
      this.props.onNavigation({page});
    }
  }

  navigateToPreviousPage() {
    if (this.currentPage !== 1) {
      this.navigateToPage(this.currentPage - 1);
    }
  }

  navigateToNextPage() {
    if (this.currentPage !== this.totalPages) {
      this.navigateToPage(this.currentPage + 1);
    }
  }

  generatePageButtons() {
    return this.getButtonLabels().map((item, i) => (
        <PageButton key={i}
                    label={i}
                    clickHandler={this.navigateToPage}
                    active={this.props.currentPage === i}>
        </PageButton>
    ));
  }

  getButtonLabels(): Array<any> {
    if (this.totalPages <= TOTAL_PAGE_BUTTONS) {
      return this.generateMinimumButtons();
    }
    else if (this.currentPage <= 3) {
      return this.generateInitialPageButtons();
    }
    else if (this.currentPage >= this.totalPages - 2) {
      return this.generateEndingPageButtons();
    }
    else {
      return this.generateIntermediatePageButtons();
    }
  }

  generateMinimumButtons(): Array<any> {
    return Array(this.totalPages).fill(0).map(index => index + 1);
  }

  generateInitialPageButtons(): Array<any> {
    const remainingButtons = TOTAL_PAGE_BUTTONS - 2;

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
    buttons.push(this.currentPage - 1);
    buttons.push(this.currentPage);
    buttons.push(this.currentPage + 1);
    buttons.push(PLACEHOLDER_PAGE_LABEL);
    buttons.push(this.totalPages);
    return buttons;
  }

  generateEndingPageButtons(): Array<any> {
    let startingButtons: Array<any> = [];
    startingButtons.push(1);
    startingButtons.push(PLACEHOLDER_PAGE_LABEL);

    const remainingButtons = this.TOTAL_PAGE_BUTTONS - 2;

    let endingButtons: Array<any> = Array(remainingButtons).fill(0)
        .map((value, index) => index + this.totalPages - remainingButtons + 1);

    return [...startingButtons, ...endingButtons];
  }

  render() {
    return (
        <div className="pagination">
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

const mapStateToProps = (state: Object) => ({
  collection: state.collection,
  currentPage: state.currentPage || 1 // TODO
});

export default connect(mapStateToProps)(Pagination);
