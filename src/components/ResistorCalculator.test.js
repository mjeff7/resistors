// @flow

import React from "react";

import { useCalculator } from "./ResistorCalculator";
import { shallow } from "enzyme";

describe("useCalculator", () => {
  const setupTest = (a, b, c, d) => {
    const calculator = jest.fn((a, b, c, d) => ({
      resistance: 10 * a.length + b.length,
      tolerance: [0.2, 0.1, 0.05][(c.length + d.length) % 3]
    }));
    const SimpleComponent = () => <div />;
    const WithCalculator = useCalculator(calculator)(SimpleComponent);

    const props = shallow(
      <WithCalculator
        bandAColor={a}
        bandBColor={b}
        bandCColor={c}
        bandDColor={d}
      />
    ).props();

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
