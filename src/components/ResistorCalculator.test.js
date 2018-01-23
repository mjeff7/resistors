// @flow

import React from "react";

import { mount } from "enzyme";

import {
  FIRST_DIGIT_COLORS,
  MULTIPLIER_COLORS,
  SECOND_DIGIT_COLORS,
  TOLERANCE_COLORS
} from "../calculator/colors";
import {
  FirstBandSelector,
  MultiplierBandSelector,
  SecondBandSelector,
  ToleranceBandSelector
} from "./bandSelectors";
import {
  firstDigitFromColor,
  multiplierExponentFromColor,
  secondDigitFromColor,
  toleranceValueFromColor
} from "../calculator/values";
import ResistorCalculator, {
  attachStateHandlers,
  formatResistanceValue,
  formatTolerance,
  useCalculator
} from "./ResistorCalculator";
import ResistorCalculatorLayout from "./ResistorCalculatorLayout";

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
    expect(output1).toContain("650 Ω");
    expect(output2).toContain("9.8 Ω");
  });

  it("displays the tolerance somewhere", () => {
    expect(output1).toContain("0.1%");
    expect(output2).toContain("10%");
  });

  it("displays the minimum somewhere", () => {
    expect(output1).toContain("649.35 Ω");
    expect(output2).toContain("8.82 Ω");
  });

  it("displays the maximum somewhere", () => {
    expect(output1).toContain("650.65 Ω");
    expect(output2).toContain("10.8 Ω");
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
    const getProps = () => component.find(ResistorCalculatorLayout).props();
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

describe("number formatting", () => {
  describe("resistance values", () => {
    const checkValue = value => {
      it(`${value}`, () => {
        expect(formatResistanceValue(value)).toMatchSnapshot();
      });
    };

    checkValue(0);

    checkValue(1);
    checkValue(1e-3);
    checkValue(1e3);
    checkValue(1e6);
    checkValue(1e9);

    checkValue(123);
    checkValue(9876543210);
  });

  describe("tolerance values", () => {
    const checkValue = value => {
      it(`${value}`, () => {
        expect(formatTolerance(value)).toMatchSnapshot();
      });
    };

    TOLERANCE_COLORS.forEach(color =>
      checkValue(toleranceValueFromColor(color))
    );
  });

  describe("values are guarded from rounding errors", () => {
    const checkValue = value => {
      it(`${value}`, () => {
        expect(formatResistanceValue(value).length).toBeLessThan(6);
      });
    };

    checkValue(10 * 1.2 * Math.pow(10, -1));

    const checkColorValueCombination = (firstDigit, secondDigit, multiplier) =>
      checkValue(
        Math.pow(10, multiplier) *
          (10 * firstDigit + secondDigit) *
          Math.pow(10, -multiplier)
      );

    FIRST_DIGIT_COLORS.forEach(bandAColor =>
      SECOND_DIGIT_COLORS.forEach(bandBColor =>
        MULTIPLIER_COLORS.forEach(bandCColor =>
          checkColorValueCombination(
            firstDigitFromColor(bandAColor),
            secondDigitFromColor(bandBColor),
            multiplierExponentFromColor(bandCColor)
          )
        )
      )
    );
  });
});
