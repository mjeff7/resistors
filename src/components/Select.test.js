// @flow

import React from "react";
import renderer from "react-test-renderer";
import Select from "./Select";

const pose = component => renderer.create(component).toJSON();

it("includes the options given to it", () => {
  const options = ["apple", "peppermint", "banana", "cinnamon", "cherry"];
  const component = <Select options={options} />;

  expect(pose(component)).toMatchSnapshot();
});
