// @flow

import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Select from "./Select";

const pose = component => renderer.create(component).toJSON();

it("includes the options given to it", () => {
  const options = ["apple", "peppermint", "banana", "cinnamon", "cherry"];
  const component = <Select options={options} onChange={() => {}} />;

  expect(pose(component)).toMatchSnapshot();
});

it("calls onChange with index when anything is selected", () => {
  const options = ["a", "p", "b", "c"];
  const callback = jest.fn();
  const component = mount(<Select options={options} onChange={callback} />);

  component.find("select").simulate("change", { target: { value: 2 } });
  expect(callback).lastCalledWith(2);

  component.find("select").simulate("change", { target: { value: 1 } });
  expect(callback).lastCalledWith(1);

  expect(callback).toHaveBeenCalledTimes(2);
});
