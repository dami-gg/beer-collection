import React from 'react';
import Filters from './Filters';

import SearchBox from '../../common/search-box/SearchBox';
import Pagination from '../../common/pagination/Pagination';

import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('Filters', () => {
  let component,
      element,
      mock;

  beforeEach(mocks);

  it('should render without crashing', () => {
    shallow(<Filters></Filters>);
  });

  it('should match the snapshot', () => {
    component = renderer.create(<Filters></Filters>);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('render', () => {
    beforeEach(setup);

    it('should render a SearchBox component', () => {
      element = component.find(SearchBox);

      expect(component.find(SearchBox)).toBeDefined();
    });

    it('should render a SearchBox component which updates the filter on change', () => {
      element = component.find(SearchBox);

      expect(element.props().changeHandler).toBeDefined();
    });

    it('should render a Pagination component', () => {
      element = component.find(Pagination);

      expect(component.find(Pagination)).toBeDefined();
    });

    it('should render a Pagination component specifying the total number of items', () => {
      element = component.find(Pagination);

      expect(element.props().numItems).toBe(mock.props.numItems);
    });

    it('should render a Pagination component specifying the current page', () => {
      element = component.find(Pagination);

      expect(element.props().currentPage).toBe(mock.props.currentPage);
    });

    it('should render a Pagination component specifying the results per page', () => {
      element = component.find(Pagination);

      expect(element.props().resultsPerPage).toBe(mock.props.resultsPerPage);
    });

    it('should render a Pagination component which does a callback on page change', () => {
      element = component.find(Pagination);

      expect(element.props().onNavigation).toBe(mock.props.onPageChange);
    });
  });

  function setup() {
    render();
  }

  function render() {
    component = shallow(
        <Filters
            numItems={mock.props.numItems}
            resultsPerPage={mock.props.resultsPerPage}
            currentPage={mock.props.currentPage}
            onFilterUpdate={mock.props.onFilterUpdate}
            onPageChange={mock.props.onPageChange}>
        </Filters>
    );
  }

  function mocks() {
    mock = {
      props: {
        numItems: 10,
        resultsPerPage: 2,
        currentPage: 1,
        onFilterUpdate: jest.fn(),
        onPageChange: jest.fn()
      }
    };
  }
});

