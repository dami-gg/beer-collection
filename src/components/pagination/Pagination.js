// @flow
import type {Beer } from '../../types';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RESULTS_PER_PAGE } from '../../constants';

class Pagination extends Component {
    props: {
        collection: Array<Beer>,
        currentPage: number
    };

    getTotalPages() {
        return this.props.collection ? (this.props.collection.length / RESULTS_PER_PAGE) + 1 : 0;
    }

    getPagination(currentPage: number) {
        let totalPages = 3; // TODO this.getTotalPages();

        return [...Array(totalPages)].map((item, i) =>
            `<li className="${currentPage === i ? 'active' : ''}" key="${i}">${i}</li>`
        );
    }

    render() {
        return (
            <ul className="pagination">
                {
                    this.getTotalPages() > 1 &&
                    this.getPagination(this.props.currentPage)
                }
            </ul>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    collection: state.collection,
    currentPage: state.currentPage || 1 // TODO
});

export default connect(mapStateToProps)(Pagination);