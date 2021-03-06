import React from "react";
import ConnectedHeader, { Header } from "./Header";

import { StaticRouter as Router, Link } from "react-router-dom";
import Button from "../common/button/Button";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

describe("Header", () => {
  let component,
    container,
    element,
    mock,
    storeConfig = configureStore();

  beforeEach(mocks);

  describe("dumb component", () => {
    it("should render without crashing", () => {
      renderDumbComponent();
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
        component = renderDumbComponent();

        element = component.find(Link);

        expect(element.length).toEqual(1);
      });

      it("should render a logout Button component when there is a user", () => {
        component = renderDumbComponent();

        element = component.find(Button);

        expect(element.length).toEqual(1);
      });

      it("should not render a logout Button component when there is no user", () => {
        delete mock.state.authentication.user;
        component = renderDumbComponent();

        element = component.find(Button);

        expect(element.length).toEqual(0);
      });
    });
  });

  describe("smart component", () => {
    it("should render without crashing", () => {
      renderSmartComponent();
    });

    describe("connection to Redux store", () => {
      beforeEach(() => {
        container = renderSmartComponent();
      });

      it("should match props with state", () => {
        expect(container.prop("user")).toEqual(mock.state.authentication.user);
      });
    });
  });

  function renderDumbComponent() {
    return shallow(<Header user={mock.state.authentication.user} />);
  }

  function renderSmartComponent(initialState = mock.state) {
    let store = storeConfig(initialState);

    return shallow(<ConnectedHeader store={store} />);
  }

  function mocks() {
    mock = {
      context: {},
      state: {
        authentication: {
          user: { id: 1, name: "Name" }
        }
      }
    };
  }
});
