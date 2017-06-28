import React from "react";
import Pagination from "./Pagination";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Pagination", () => {
  let component, element, mock;

  beforeEach(mocks);

  it("should render without crashing", () => {
    shallow(<Pagination />);
  });

  it("should match the snapshot", () => {
    component = renderer.create(<Pagination />);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe("render", () => {
    it("should be hidden when there is only one page", () => {
      mock.props.numItems = 5;
      mock.props.resultsPerPage = 10;

      render();

      element = component.find(".pagination--hidden");

      expect(element.length).toEqual(1);
    });
  });

  function render() {
    component = shallow(
      <Pagination
        className={mock.props.className}
        numItems={mock.props.numItems}
        currentPage={mock.props.currentPage}
        resultsPerPage={mock.props.resultsPerPage}
        totalPageButtons={mock.props.totalPageButtons}
        onNavigation={mock.props.onNavigation}
      />
    );
  }

  function mocks() {
    mock = {
      context: {},
      props: {
        className: "",
        numItems: 5,
        currentPage: 1,
        resultsPerPage: 10,
        totalPageButtons: 1,
        onNavigation: jest.fn()
      }
    };
  }
});
