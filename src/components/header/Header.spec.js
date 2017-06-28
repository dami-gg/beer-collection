import React from "react";
import { Header } from "./Header";

import { StaticRouter as Router, Link } from "react-router-dom";
import Button from "../common/button/Button";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Header", () => {
  let component, element, mock;

  beforeEach(mocks);

  it("should render without crashing", () => {
    shallow(<Header />);
  });

  it("should match the snapshot", () => {
    component = renderer.create(
      <Router context={mock.context}>
        <Header />
      </Router>
    );
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe("render", () => {
    it("should render a Link component", () => {
      render();

      element = component.find(Link);

      expect(element.length).toEqual(1);
    });

    it("should render a logout Button component when there is a user", () => {
      render();

      element = component.find(Button);

      expect(element.length).toEqual(1);
    });

    it("should not render a logout Button component when there is no user", () => {
      delete mock.props.user;
      render();

      element = component.find(Button);

      expect(element.length).toEqual(0);
    });
  });

  function render() {
    component = shallow(<Header user={mock.props.user} />);
  }

  function mocks() {
    mock = {
      context: {},
      props: {
        user: { id: 1, name: "Name" }
      }
    };
  }
});
