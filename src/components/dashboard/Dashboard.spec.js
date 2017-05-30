import React from "react";
import Dashboard from "./Dashboard";
import Option from "./option/Option";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Dashboard", () => {
  let component, element, mock;

  beforeEach(mocks);

  it("should render without crashing", () => {
    shallow(<Dashboard />);
  });

  it("should match the snapshot", () => {
    component = renderer.create(<Dashboard />);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe("render", () => {
    beforeEach(setup);

    it("should render a dashboard element", () => {
      element = component.find(".dashboard");

      expect(element.length).toEqual(1);
    });

    it("should render an Option component per item", () => {
      element = component.find(Option);

      expect(element.length).toEqual(mock.items.length);
    });
  });

  function setup() {
    render();
  }

  function render() {
    component = shallow(<Dashboard items={mock.items} />);
  }

  function mocks() {
    mock = {
      items: [
        {
          title: "",
          url: "",
          image: ""
        }
      ]
    };
  }
});
