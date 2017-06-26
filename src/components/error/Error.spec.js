import React from "react";
import Error from "./Error";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Error", () => {
  let component;

  it("should render without crashing", () => {
    shallow(<Error />);
  });

  it("should match the snapshot", () => {
    component = renderer.create(<Error />);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });
});
