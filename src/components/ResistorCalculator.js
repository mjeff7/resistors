// @flow

import { compose, withProps, withState } from "recompose";
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

const enhancer = withState("resistance", "setResistance", 0);

export default enhancer(DisplayComponent);
