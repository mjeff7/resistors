// @flow

import { withProps } from "recompose";
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

type GenericBandSelectorProps<T> = BandSelectorProps<T> & {
  values: Array<T>
};

const GenericBandSelector = <T: string>({
  value,
  values,
  onSelectValue
}: GenericBandSelectorProps<T>): React.Node => (
  <Select
    options={values}
    onChange={colorIndex => onSelectValue(values[colorIndex])}
  />
);

type FirstBandSelectorProps = BandSelectorProps<FirstDigitColor>;

const FirstBandSelector: React.ComponentType<
  FirstBandSelectorProps
> = withProps({ values: FIRST_DIGIT_COLORS })(GenericBandSelector);

type SecondBandSelectorProps = BandSelectorProps<SecondDigitColor>;

const SecondBandSelector: React.ComponentType<
  SecondBandSelectorProps
> = withProps({ values: SECOND_DIGIT_COLORS })(GenericBandSelector);

type MultiplierBandSelectorProps = BandSelectorProps<MultiplierColor>;

const MultiplierBandSelector: React.ComponentType<
  MultiplierBandSelectorProps
> = withProps({ values: MULTIPLIER_COLORS })(GenericBandSelector);

type ToleranceBandSelectorProps = BandSelectorProps<ToleranceColor>;

const ToleranceBandSelector: React.ComponentType<
  ToleranceBandSelectorProps
> = withProps({ values: TOLERANCE_COLORS })(GenericBandSelector);

export default () => (
  <div>
    <FirstBandSelector value={"brown"} onSelectValue={() => {}} />
    <SecondBandSelector value={"brown"} onSelectValue={() => {}} />
    <MultiplierBandSelector value={"brown"} onSelectValue={() => {}} />
    <ToleranceBandSelector value={"none"} onSelectValue={() => {}} />
  </div>
);
