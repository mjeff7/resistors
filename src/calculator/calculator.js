// @flow

import type {
  FirstDigit,
  SecondDigit,
  MultiplierExponent,
  ToleranceValue
} from "./values";

export const calculateOhmCenterValue = (
  bandA: FirstDigit,
  bandB: SecondDigit,
  multiplierExponent: MultiplierExponent
) => (bandA * 10 + bandB) * Math.pow(10, multiplierExponent);

type OhmValueCalculator = (
  FirstDigit,
  SecondDigit,
  MultiplierExponent,
  ToleranceValue
) => number;

export const wrapOhmValueCalculatorWith = <AColor, BColor, CColor, DColor>(
  bandAConverter: AColor => FirstDigit,
  bandBConverter: BColor => SecondDigit,
  bandCConverter: CColor => MultiplierExponent,
  bandDConverter: DColor => ToleranceValue
) => (wrappedCalculator: OhmValueCalculator) => (
  a: AColor,
  b: BColor,
  c: CColor,
  d: DColor
) =>
  bandAConverter(a) & bandBConverter(b) & bandCConverter(c) & bandDConverter(d);
