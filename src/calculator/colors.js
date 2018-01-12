// @flow

/*
 * Enumerate the colors used as bands on resistors. Colors can be imported
 * individually, e.g.
 *
 *    import { PINK } from './colors';
 *
 * or as a collection, e.g.
 *
 *    import { Colors } from './colors';
 *
 * which are objects with the color constants as keys.
 *
 * There are four collections:
 *   1. All colors.
 *   2. Colors that are valid as digits, i.e. the first two bands.
 *   3. Colors that represent the multiplier, i.e. the third band.
 *   4. Colors that represent the tolerance, i.e. the fourth band.
 *
 */

/*
 * All colors
 */

export const NONE = "none";
export const PINK = "pink";
export const SILVER = "silver";
export const GOLD = "gold";
export const BLACK = "black";
export const BROWN = "brown";
export const RED = "red ";
export const ORANGE = "orange ";
export const YELLOW = "yellow ";
export const GREEN = "green ";
export const BLUE = "blue ";
export const VIOLET = "violet ";
export const GREY = "grey ";
export const WHITE = "white ";

export const Colors = {
  NONE,
  PINK,
  SILVER,
  GOLD,
  BLACK,
  BROWN,
  RED,
  ORANGE,
  YELLOW,
  GREEN,
  BLUE,
  VIOLET,
  GREY,
  WHITE
};

export type Color = $Values<typeof Colors>;
type ColorConstant = $Keys<typeof Colors>;

/*
 * Colors that are valid as digits, i.e. the first two bands.
 */

export const DigitColors: { [ColorConstant]: Color } = {
  BLACK,
  BROWN,
  RED,
  ORANGE,
  YELLOW,
  GREEN,
  BLUE,
  VIOLET,
  GREY,
  WHITE
};

export type DigitColor = $Values<typeof DigitColors>;

/*
 * Colors that represent the multiplier, i.e. the third band.
 */

export const MultiplierColors: { [ColorConstant]: Color } = {
  PINK,
  SILVER,
  GOLD,
  BLACK,
  BROWN,
  RED,
  ORANGE,
  YELLOW,
  GREEN,
  BLUE,
  VIOLET,
  GREY,
  WHITE
};

export type MultiplierColor = $Values<typeof MultiplierColors>;

/*
 * Colors that represent the tolerance, i.e. the fourth band.
 */

export const ToleranceColors: { [ColorConstant]: Color } = {
  NONE,
  SILVER,
  GOLD,
  BROWN,
  RED,
  GREEN,
  BLUE,
  VIOLET,
  GREY
};

export type ToleranceColor = $Values<typeof ToleranceColors>;
