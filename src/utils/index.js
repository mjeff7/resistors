// @flow

export * from "./transformArgs";

type NumberMagnitude = "m" | "" | "k" | "M" | "G";

const MAGNITUDE_SUFFICES: { [*]: NumberMagnitude } = {
  "-3": "m",
  "0": "",
  "3": "k",
  "6": "M",
  "9": "G"
};

/*
 * abbreviateValue
 *
 * Take a real value between 1e-6 and 1e12 (exclusive) and returns a tuple
 * [value, magnitude] where value is at least 1 and less than 1000 and magnitude
 * is the correct suffix for the value. For example,
 *
 *  abbreviateValue(1234) === [1.234, 'k'] .
 *
 * It supports negative numbers as well for the same ranges.
 */
export const abbreviateValue = (value: number): [number, NumberMagnitude] => {
  if (value === 0) return [0, ""];

  const supportingE = Math.floor(Math.log10(Math.abs(value)) / 3) * 3;
  const adjustedValue = value / Math.pow(10, supportingE);
  const magnitudeSuffix = MAGNITUDE_SUFFICES[supportingE];

  return [adjustedValue, magnitudeSuffix];
};
