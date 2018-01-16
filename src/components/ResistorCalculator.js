// @flow

import { compose, defaultProps, withProps } from "recompose";
import * as React from "react";

import {
  FIRST_DIGIT_COLORS,
  MULTIPLIER_COLORS,
  SECOND_DIGIT_COLORS,
  TOLERANCE_COLORS,
  type FirstDigitColor,
  type MultiplierColor,
  type SecondDigitColor,
  type ToleranceColor
} from "../calculator/colors";
import {
  type OhmValueCalculatorFromColors,
  attachToleranceBounds
} from "../calculator/calculator";
import Select from "./Select";

type BandSelectorProps<T> = {
  onSelectValue: T => void,
  value: T
};

const GenericBandSelector = withProps(({ onSelectValue, values }) => ({
  onChange: onSelectValue,
  options: values
}))(Select);

type BandSelector<T> = React.ComponentType<BandSelectorProps<T>>;

const FirstBandSelector: BandSelector<FirstDigitColor> = withProps({
  values: FIRST_DIGIT_COLORS
})(GenericBandSelector);

const SecondBandSelector: BandSelector<SecondDigitColor> = withProps({
  values: SECOND_DIGIT_COLORS
})(GenericBandSelector);

const MultiplierBandSelector: BandSelector<MultiplierColor> = withProps({
  values: MULTIPLIER_COLORS
})(GenericBandSelector);

const ToleranceBandSelector: BandSelector<ToleranceColor> = withProps({
  values: TOLERANCE_COLORS
})(GenericBandSelector);

type DisplayProps = {
  resistance: number
};

const DisplayComponent = ({ resistance }: DisplayProps) => (
  <div>
    <FirstBandSelector value={"brown"} onSelectValue={() => {}} />
    <SecondBandSelector value={"brown"} onSelectValue={() => {}} />
    <MultiplierBandSelector value={"brown"} onSelectValue={() => {}} />
    <ToleranceBandSelector value={"none"} onSelectValue={() => {}} />
    <div>Resistance value: {resistance}</div>
  </div>
);

export const useCalculator = (calculator: OhmValueCalculatorFromColors) =>
  withProps(({ bandAColor, bandBColor, bandCColor, bandDColor }) => {
    // Explicitly destructure and return these properties so that Flow sees
    // that they are present as component properties.
    const { resistance, tolerance, minimum, maximum } = attachToleranceBounds(
      calculator(bandAColor, bandBColor, bandCColor, bandDColor)
    );

    return { resistance, tolerance, minimum, maximum };
  });

const enhancer = compose(
  defaultProps({
    bandAColor: "brown",
    bandBColor: "brown",
    bandCColor: "brown",
    bandDColor: "brown"
  }),
  useCalculator(() => ({ resistance: 0, tolerance: 0.2 }))
);

export default enhancer(DisplayComponent);
