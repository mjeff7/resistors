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

it("calls onChange with value when anything is selected", () => {
  const options = ["a", "p", "b", "c"];
  const callback = jest.fn();
  const component = mount(<Select options={options} onChange={callback} />);

  component.find("select").simulate("change", { target: { value: "p" } });
  expect(callback).lastCalledWith("p");

  component.find("select").simulate("change", { target: { value: "a" } });
  expect(callback).lastCalledWith("a");

  expect(callback).toHaveBeenCalledTimes(2);
});

it("uses the passed in value if present", () => {
  const initialValue = "b";

  const options = ["a", "p", "b", "c"];
  const component = (
    <Select options={options} onChange={() => {}} value={initialValue} />
  );
  const mountedComponent = mount(component);

  const actualValue = mountedComponent.find("select").props().value;

  expect(actualValue).toBe(initialValue);
  expect(pose(component)).toMatchSnapshot();
});
