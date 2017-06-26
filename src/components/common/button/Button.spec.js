import React from "react";
import Button from "./Button";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Button", () => {
  let component, element, mock;

  beforeEach(mocks);

  it("should render without crashing", () => {
    shallow(<Button />);
  });

  it("should match the snapshot", () => {
    component = renderer.create(<Button />);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe("render", () => {
    beforeEach(setup);

    it("should render a button of the type specified in the props", () => {
      element = component.find("button");

      expect(element.props().type).toBe(mock.props.type);
    });

    it("should render a button of the type specified in the props", () => {
      element = component.find("button");
      element.simulate("click");

      expect(mock.props.onClick).toHaveBeenCalled();
    });

    it("should render a button with the class specified in props", () => {
      element = component.find("button");

      expect(element.hasClass(mock.props.className)).toBe(true);
    });

    it("should render a button of the color specified in props", () => {
      element = component.find("button");

      expect(element.hasClass(`button--${mock.props.color}`)).toBe(true);
    });
  });

  function setup() {
    render();
  }

  function render() {
    component = shallow(
      <Button
        type={mock.props.type}
        color={mock.props.color}
        className={mock.props.className}
        onClick={mock.props.onClick}
      />
    );
  }

  function mocks() {
    mock = {
      props: {
        type: "type",
        color: "color",
        className: "className",
        onClick: jest.fn()
      }
    };
  }
});
