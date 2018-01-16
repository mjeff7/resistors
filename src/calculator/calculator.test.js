// @flow

import {
  attachToleranceBounds,
  calculateOhmCenterValue,
  calculateOhmValue,
  calculateOhmValueFromColors,
  wrapOhmValueCalculator
} from "./calculator";

describe("calculateOhmCenterValue", () => {
  it("correctly translates individual digits", () => {
    expect(calculateOhmCenterValue(1, 0, 0)).toBe(10);
    expect(calculateOhmCenterValue(2, 0, 0)).toBe(20);
    expect(calculateOhmCenterValue(1, 1, 0)).toBe(11);
    expect(calculateOhmCenterValue(1, 2, 0)).toBe(12);
    expect(calculateOhmCenterValue(3, 4, 0)).toBe(34);
    expect(calculateOhmCenterValue(5, 6, 0)).toBe(56);
    expect(calculateOhmCenterValue(7, 8, 0)).toBe(78);
    expect(calculateOhmCenterValue(9, 9, 0)).toBe(99);
  });

  it("correctly translates multipliers", () => {
    expect(calculateOhmCenterValue(1, 0, -3)).toBe(0.01);
    expect(calculateOhmCenterValue(1, 0, -2)).toBe(0.1);
    expect(calculateOhmCenterValue(1, 0, -1)).toBe(1);
    expect(calculateOhmCenterValue(1, 0, 1)).toBe(100);
    expect(calculateOhmCenterValue(1, 0, 2)).toBe(1000);
    expect(calculateOhmCenterValue(1, 0, 3)).toBe(10000);
    expect(calculateOhmCenterValue(1, 0, 4)).toBe(100000);
    expect(calculateOhmCenterValue(1, 0, 5)).toBe(1000000);
    expect(calculateOhmCenterValue(1, 0, 6)).toBe(10000000);
    expect(calculateOhmCenterValue(1, 0, 7)).toBe(100000000);
    expect(calculateOhmCenterValue(1, 0, 8)).toBe(1000000000);
    expect(calculateOhmCenterValue(1, 0, 9)).toBe(10000000000);
  });
});

describe("calculateOhmValue", () => {
  it("correctly calculates resistances", () => {
    expect(calculateOhmValue(1, 2, 3, 0.2)).toMatchObject({
      resistance: 12000,
      tolerance: 0.2
    });
    expect(calculateOhmValue(9, 5, -3, 0.1)).toMatchObject({
      resistance: 0.095,
      tolerance: 0.1
    });
  });
});

describe("attachToleranceBounds", () => {
  it("correctly incorporates bounds", () => {
    expect(
      attachToleranceBounds({ resistance: 100, tolerance: 0.2 })
    ).toMatchObject({
      resistance: 100,
      tolerance: 0.2,
      minimum: 80,
      maximum: 120
    });

    expect(
      attachToleranceBounds({ resistance: 500, tolerance: 0.1 })
    ).toMatchObject({
      resistance: 500,
      tolerance: 0.1,
      minimum: 450,
      maximum: 550
    });
  });
});

describe("wrapOhmValueCalculator", () => {
  it("transforms with standard color values", () => {
    const target = jest.fn();
    const calculator = wrapOhmValueCalculator(target);

    calculator("brown", "black", "red", "grey");
    expect(target).lastCalledWith(1, 0, 2, 0.0005);
  });
});

describe("calculateOhmValueFromColors", () => {
  it("correctly calculates resistance values from colors", () => {
    expect(
      calculateOhmValueFromColors("brown", "black", "red", "grey")
    ).toMatchObject({ resistance: 1000, tolerance: 0.0005 });

    expect(
      calculateOhmValueFromColors("yellow", "white", "grey", "brown")
    ).toMatchObject({ resistance: 4900000000, tolerance: 0.01 });
  });
});
