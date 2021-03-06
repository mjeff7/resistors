// @flow

/*
 * UpdateDiagramColors
 *
 * Inserts an inline SVG and mutates it according to the props given whenever
 * props are updated. It currently adjusts the fill property according to the
 * query selectors and target values given.
 */

import * as React from "react";
import ReactSVG from "react-svg";

type Selector = string;
type Value = string;

type Setters = Array<[Selector, Value]>;

/*
 * Props
 */

// These are passed through to the underlying SVG injecting component.
type PassedOnProps = {
  // The path to the svg to load. This might be src if used in an <img/> tag or
  // data if used in an <object/> tag.
  path: string,

  // A class name to add to the SVG component.
  className?: string,

  // A div is used to wrap the SVG componeont. This is a class name to add to
  // that div.
  wrapperClassName?: string,

  // A callback that will be called with a ref to the SVG when it is loaded or
  // a string representing an error.
  callback?: (HTMLElement | string) => mixed
};

// Props used by this component.
type OwnProps = {
  // An array of setters that specify which element to target and what the new
  // value must be.
  set?: Setters
};

type Props = OwnProps & PassedOnProps;

export default class extends React.Component<Props & *, *> {
  // Store the SVG component so that it is never updated by React.
  svg: React.Node;

  // Save a reference to the svg DOM object.
  svgElement: HTMLElement;

  // Save a reference that is needed to update properties.
  saveElement = (ref: HTMLElement | string) => {
    if (typeof ref === "string") this.respondToError();
    else {
      this.svgElement = ref;

      if (this.props.callback) this.props.callback(ref);

      this.updateAttributes();
    }
  };

  componentWillMount() {
    // react-svg raises an error in uncooperative environments, e.g. testing.
    // This just means that the image is unavailable but creates a large amount
    // of error logging. React currently allows catching these errors but
    // insists on noisily reporting them even if caught with componentDidCatch.
    // A patch is in the works to allow suppressing caught and expected errors,
    // but until then, take an alternate route if react-svg would raise an
    // error.

    // Declare the saught after variable so flow does not flag it as unresolved.
    declare var SVGSVGElement: *;
    if (typeof SVGSVGElement !== "undefined") {
      // All is okay and as expected.

      // Support passing some properties to the element.
      const { path, className, wrapperClassName, style } = this.props;
      this.svg = (
        <ReactSVG
          callback={this.saveElement}
          {...{
            path,
            className,
            wrapperClassName: `injected-svg-wrapper${
              wrapperClassName ? ` ${wrapperClassName}` : ""
            }`,
            style
          }}
        />
      );
    } else {
      // We're in an environment about which react-svg will complain.
      // Acknowledge the issue in case anyone is seeing this.
      this.respondToError();
    }
  }

  // Respond to any error by swapping out the real image with a placeholder.
  respondToError() {
    this.svg = (
      <div>
        Something went wrong with the image here. Rely on your mind's eye
        instead (or try reloading).
      </div>
    );

    // Show the error immediately so it is apparent when the problem occurred.
    this.forceUpdate();
  }

  // Apply changes to the DOM.
  updateAttributes = () => {
    if (!this.svgElement || !this.props.set) return;

    for (let [selector, newFill] of this.props.set) {
      this.svgElement.querySelectorAll(selector).forEach(target => {
        target.setAttribute("fill", newFill);
      });
    }
  };

  componentDidUpdate() {
    this.updateAttributes();
  }

  render = () => this.svg;
}
