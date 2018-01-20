// @flow

/*
 * calculator.js
 *
 * This module provides the interface that translates a band of colors into
 * numeric values and a resistance spec for a resisitor. For example:
 *
 *    calculateOhmValueFromColors(
 *      Colors.RED,
 *      Colors.BLUE,
 *      Colors.BLACK,
 *      Colors.NONE
 *    ) === { resistance: 26, tolerance: 0.2 };
 *
 * This is separated into distinct stages:
 *   1) Translate colors into numerical values (mostly handled by colors.js).
 *   2) Combine those values into a resistance spec.
 *   3) Optionally fill in the convenience values (minimum and maximum) of a
 *      spec.
 *
 */

import {
  type FirstDigit,
  type SecondDigit,
  type MultiplierExponent,
  type ToleranceValue,
  firstDigitFromColor,
  secondDigitFromColor,
  multiplierExponentFromColor,
  toleranceValueFromColor
} from "./values";
import type {
  FirstDigitColor,
  MultiplierColor,
  SecondDigitColor,
  ToleranceColor
} from "./colors";
import { transformArgs } from "../utils";

/*
 * Types
 */

export type CalculatedOhmValue = {
  resistance: number,
  tolerance: ToleranceValue
};

// A calculator with numerical parameters.
export type OhmValueCalculator = (
  FirstDigit,
  SecondDigit,
  MultiplierExponent,
  ToleranceValue
) => CalculatedOhmValue;

// A calculator with color parameters.
export type OhmValueCalculatorFromColors = (
  FirstDigitColor,
  SecondDigitColor,
  MultiplierColor,
  ToleranceColor
) => CalculatedOhmValue;

/*
 * Combine numerical values into a resistance spec.
 */

// calculateOhmCenterValue
//
// Takes two digit bands and a multiplier and returns the resistance in ohms as
// if the resistor were perfectly precise.
export const calculateOhmCenterValue = (
  bandA: FirstDigit,
  bandB: SecondDigit,
  multiplierExponent: MultiplierExponent
): number => (bandA * 10 + bandB) * Math.pow(10, multiplierExponent);

// calculateOhmValue
//
// Takes numerical values and returns the corresponding resistance spec.
export const calculateOhmValue: OhmValueCalculator = (
  bandA,
  bandB,
  multiplierExponent,
  tolerance
) => ({
  resistance: calculateOhmCenterValue(bandA, bandB, multiplierExponent),
  tolerance
});

/*
 * Optionally fill in the minimum and maximum of the spec.
 */

// attachToleranceBounds
//
// Takes a CalculatedOhmValue, e.g. as returned from calculateOhmValue, and
// returns the same as a new object with the derived minimum and maximum values
// included.
export const attachToleranceBounds = ({
  resistance,
  tolerance
}: CalculatedOhmValue): CalculatedOhmValue & {
  minimum: number,
  maximum: number
} => ({
  resistance,
  tolerance,
  minimum: resistance * (1 - tolerance),
  maximum: resistance * (1 + tolerance)
});

// wrapOhmValueCalculator
//
// Takes a calculator that operates on numerical values and returns a calculator
// that does the same but operates on color bands instead.
export const wrapOhmValueCalculator: OhmValueCalculator => OhmValueCalculatorFromColors = transformArgs(
  firstDigitFromColor,
  secondDigitFromColor,
  multiplierExponentFromColor,
  toleranceValueFromColor
);

/*
 * Primary module export.
 */

// calculateOhmValueFromColors
//
// Take colors of bands and interprets them as a resistor spec.
export const calculateOhmValueFromColors: (
  FirstDigitColor,
  SecondDigitColor,
  MultiplierColor,
  ToleranceColor
) => CalculatedOhmValue = wrapOhmValueCalculator(calculateOhmValue);
