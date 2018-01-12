// @flow

import { calculateOhmCenterValue } from "./calculator";
import type { MultiplierExponent } from "./values";

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
