import React from "react";
import SearchBox from "./SearchBox";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("SearchBox", () => {
  let component, element, mock;

  beforeEach(mocks);

  it("should render without crashing", () => {
    shallow(<SearchBox />);
  });

  it("should match the snapshot", () => {
    component = renderer.create(<SearchBox />);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe("render", () => {
    beforeEach(setup);

    it("should render an input which on change calls the change handler", () => {
      element = component.find("input");
      element.simulate("change", mock.event);

      expect(mock.props.changeHandler).toHaveBeenCalled();
    });
  });

  function setup() {
    render();
  }

  function render() {
    component = shallow(<SearchBox changeHandler={mock.props.changeHandler} />);
  }

  function mocks() {
    mock = {
      props: {
        changeHandler: jest.fn()
      },
      event: {
        target: {
          value: ''
        }
      }
    };
  }
});
