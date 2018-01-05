import React from "react";
import ConnectedMultiEdit, { MultiEdit } from "./MultiEdit";
import EditableTable from "../../common/editable-table/EditableTable";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

describe("MultiEdit", () => {
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

    xit("should match the snapshot", () => {
      component = renderer.create(
        <MultiEdit collection={mock.state.collection} />
      );
      let json = component.toJSON();

      expect(json).toMatchSnapshot();
    });

    describe("render", () => {
      beforeEach(() => (component = renderDumbComponent()));

      it("should render an export button", () => {
        element = component.find(".multi-edit__export-button");

        expect(element.length).toEqual(1);
      });

      it("should render a EditableTable", () => {
        element = component.find(EditableTable);

        expect(element.length).toEqual(1);
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
        expect(container.prop("collection")).toEqual(mock.state.collection);
      });
    });
  });

  function renderDumbComponent() {
    return shallow(<MultiEdit />);
  }

  function renderSmartComponent(initialState = mock.state) {
    let store = storeConfig(initialState);

    return shallow(<ConnectedMultiEdit store={store} />);
  }

  function mocks() {
    mock = {
      state: {
        collection: []
      }
    };
  }
});
