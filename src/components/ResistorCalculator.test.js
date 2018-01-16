// @flow

import React from "react";

import { mount } from "enzyme";

import ResistorCalculator, { useCalculator } from "./ResistorCalculator";

describe("useCalculator", () => {
  const setupTest = (a, b, c, d) => {
    const calculator = jest.fn((a, b, c, d) => ({
      resistance: 10 * a.length + b.length,
      tolerance: [0.2, 0.1, 0.05][(c.length + d.length) % 3]
    }));
    const SimpleComponent = () => <div />;
    const WithCalculator = useCalculator(calculator)(SimpleComponent);

    const props = mount(
      <WithCalculator
        bandAColor={a}
        bandBColor={b}
        bandCColor={c}
        bandDColor={d}
      />
    )
      .find(SimpleComponent)
      .props();

    return { props, calculator };
  };

  it("calls the calculator with passed parameters", () => {
    expect(
      setupTest("yellow", "green", "grey", "red").calculator
    ).lastCalledWith("yellow", "green", "grey", "red");

    expect(
      setupTest("orange", "black", "violet", "white").calculator
    ).lastCalledWith("orange", "black", "violet", "white");
  });

  it("supplies calculated properties as props", () => {
    expect(setupTest("yellow", "green", "grey", "red").props).toMatchObject({
      resistance: 65,
      tolerance: 0.1,
      minimum: 58.5,
      maximum: 71.5
    });

    expect(setupTest("blue", "red", "gold", "white").props).toMatchObject({
      resistance: 43,
      tolerance: 0.2,
      minimum: 34.4,
      maximum: 51.6
    });
  });
});

describe("numerical output", () => {
  let output1, output2;

  beforeAll(() => {
    output1 = mount(
      <ResistorCalculator
        bandAColor="blue"
        bandBColor="green"
        bandCColor="brown"
        bandDColor="violet"
      />
    ).text();

    output2 = mount(
      <ResistorCalculator
        bandAColor="white"
        bandBColor="grey"
        bandCColor="gold"
        bandDColor="silver"
      />
    ).text();
  });

  it("displays the resistance somewhere", () => {
    expect(output1).toContain("650");
    expect(output2).toContain("9.8");
  });

  it("displays the tolerance somewhere", () => {
    expect(output1).toContain("0.001");
    expect(output2).toContain("0.1");
  });

  it("displays the minimum somewhere", () => {
    expect(output1).toContain("649.35");
    expect(output2).toContain("8.82");
  });

  it("displays the maximum somewhere", () => {
    expect(output1).toContain("650.65");
    expect(output2).toContain("10.78");
  });
});
