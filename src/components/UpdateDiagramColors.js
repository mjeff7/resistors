// @flow

import * as React from "react";
import ReactSVG from "react-svg";

type Selector = string;
type Value = string;

type Setters = Array<[Selector, Value]>;

type Props = {
  set?: Setters
};

export default class extends React.Component<Props & *, *> {
  // Store the SVG component so that it is never updated by React.
  svg: React.Node;

  // Save a reference to the svg DOM object.
  svgElement: HTMLElement;

  // Save a reference that is needed to update properties.
  saveElement = (ref: HTMLElement) => {
    if (this.props.callback) this.props.callback(ref);

    this.svgElement = ref;
    this.updateAttributes();
  };

  componentWillMount() {
    // Support passing some properties to the element.
    const { path, className, wrapperClassName, style } = this.props;
    this.svg = (
      <ReactSVG
        callback={this.saveElement}
        {...{ path, className, wrapperClassName, style }}
      />
    );
  }

  // Apply changes to the DOM.
  updateAttributes = () => {
    if (!this.svgElement || !this.props.set) return;

    for (let [selector, newFill] of this.props.set) {
      this.svgElement.querySelectorAll(selector).forEach(target => {
        target.setAttribute("fill", newFill);
        target.setAttribute("style", "transition: 1s");
      });
    }
  };

  componentDidUpdate() {
    this.updateAttributes();
  }

  render = () => this.svg;
}
