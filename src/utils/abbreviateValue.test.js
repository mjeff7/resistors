import { abbreviateValue } from "./abbreviateValue";

describe("abbreviateValue", () => {
  describe("returns a value at least 1 and less than 1000 or 0", () => {
    const checkBounds = value => {
      const result = Math.abs(abbreviateValue(value)[0]);
      it(`${value}`, () => {
        expect(result === 0 || (result >= 1 && result < 1000)).toBe(true);
      });
    };

    checkBounds(0);
    checkBounds(0.1);
    checkBounds(-0.1);
    checkBounds(0.0001);
  });

  describe("returns the same value for values at least 1 and less than 1000", () => {
    const checkResults = value => {
      const [result, suffix] = abbreviateValue(value);
      it(`${value}`, () => {
        expect(result).toBe(value);
        expect(suffix).toBe("");
      });
    };

    checkResults(0);
    checkResults(999);
    checkResults(999.9999);
  });

  describe("returns the same value for different orders of 1000", () => {
    const checkResults = value => {
      const [result1, suffix1] = abbreviateValue(value);
      const [result2, suffix2] = abbreviateValue(value * 1000);
      it(`${value} and ${value * 1000}`, () => {
        expect(result1).toBeCloseTo(result2);
        expect(suffix1).not.toBe(suffix2);
      });
    };

    checkResults(1);
    checkResults(999.9999);
    checkResults(1000000);
    checkResults(-0.0001);
  });

  describe("returns correct suffix", () => {
    const checkResults = (value, correctSuffix) => {
      const [result, suffix] = abbreviateValue(value);
      it(`${value}`, () => {
        expect(suffix).toBe(correctSuffix);
      });
    };

    checkResults(0, "");
    checkResults(1, "");
    checkResults(1e-3, "m");
    checkResults(1e3, "k");
    checkResults(1e6, "M");
    checkResults(1e9, "G");
  });
});
