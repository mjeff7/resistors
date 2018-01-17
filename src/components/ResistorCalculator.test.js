// @flow

import React from "react";

import { mount } from "enzyme";

import ResistorCalculator, {
  DisplayComponent,
  FirstBandSelector,
  MultiplierBandSelector,
  SecondBandSelector,
  ToleranceBandSelector,
  attachStateHandlers,
  useCalculator
} from "./ResistorCalculator";

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

describe("state handlers effect color changes", () => {
  it("responds to changing colors", () => {
    const SimpleComponent = () => null;
    const Wrapped = attachStateHandlers(SimpleComponent);

    const component = mount(<Wrapped />);
    const getProps = () => component.find(SimpleComponent).props();
    const getProp = prop => getProps()[prop];

    const setAndTest = (handler, band, value) => {
      getProp(handler)(value);
      component.update();
      expect(getProp(band)).toBe(value);
    };

    setAndTest("setBandAColor", "bandAColor", "blue");
    setAndTest("setBandAColor", "bandAColor", "red");

    setAndTest("setBandBColor", "bandBColor", "white");
    setAndTest("setBandBColor", "bandBColor", "green");

    setAndTest("setBandCColor", "bandCColor", "pink");
    setAndTest("setBandCColor", "bandCColor", "silver");

    setAndTest("setBandDColor", "bandDColor", "violet");
    setAndTest("setBandDColor", "bandDColor", "yellow");
  });
});

describe("component interactivity", () => {
  it("responds to menu selections", () => {
    const component = mount(<ResistorCalculator />);
    const getProps = () => component.find(DisplayComponent).props();
    const getProp = prop => getProps()[prop];

    const setAndTest = (Component, band, value) => {
      component
        .find(Component)
        .find("select")
        .simulate("change", { target: { value } });
      component.update();
      expect(getProp(band)).toBe(value);
    };

    setAndTest(FirstBandSelector, "bandAColor", "blue");
    setAndTest(FirstBandSelector, "bandAColor", "white");

    setAndTest(SecondBandSelector, "bandBColor", "red");
    setAndTest(SecondBandSelector, "bandBColor", "green");

    setAndTest(MultiplierBandSelector, "bandCColor", "pink");
    setAndTest(MultiplierBandSelector, "bandCColor", "yellow");

    setAndTest(ToleranceBandSelector, "bandDColor", "violet");
    setAndTest(ToleranceBandSelector, "bandDColor", "silver");
  });

  describe("displays current value as menu selection", () => {
    const setAndTest = (Component, band, value) => {
      expect(
        mount(<ResistorCalculator {...{ [band]: value }} />)
          .find(Component)
          .find("select")
          .props().value
      ).toBe(value);
    };

    it("first selector", () => {
      setAndTest(FirstBandSelector, "bandAColor", "blue");
      setAndTest(FirstBandSelector, "bandAColor", "white");
    });

    it("second selector", () => {
      setAndTest(SecondBandSelector, "bandBColor", "red");
      setAndTest(SecondBandSelector, "bandBColor", "green");
    });

    it("third selector", () => {
      setAndTest(MultiplierBandSelector, "bandCColor", "pink");
      setAndTest(MultiplierBandSelector, "bandCColor", "yellow");
    });

    it("fourth selector", () => {
      setAndTest(ToleranceBandSelector, "bandDColor", "violet");
      setAndTest(ToleranceBandSelector, "bandDColor", "silver");
    });
  });
});
