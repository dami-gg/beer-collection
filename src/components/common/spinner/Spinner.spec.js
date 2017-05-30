import React from "react";
import Spinner from "./Spinner";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Spinner", () => {
  let component;

  it("should render without crashing", () => {
    shallow(<Spinner />);
  });

  it("should match the snapshot", () => {
    component = renderer.create(<Spinner />);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });
});
