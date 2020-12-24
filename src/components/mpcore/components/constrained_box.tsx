import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssWidth, cssHeight } from "../utils/geometry";
import { DivContextConsumer } from "./div_context";

export class ConstrainedBox extends Component<{ data: MPComponentsProps }> {
  render() {
    if (
      this.props.data.attributes.minWidth === "Infinity" &&
      this.props.data.attributes.minHeight === "Infinity" &&
      this.props.data.attributes.maxWidth === "Infinity" &&
      this.props.data.attributes.maxHeight === "Infinity" &&
      this.props.data.attributes.isTight === true
    ) {
      return <DivContextConsumer>{this.props.children}</DivContextConsumer>;
    }
    return (
      <DivContextConsumer
        style={{
          display: "flex",
          minWidth: cssWidth(
            parseInt(this.props.data.attributes.minWidth) <= 0.01 &&
              this.props.data.attributes.maxWidth === "Infinity" &&
              this.props.data.attributes.isTight === false
              ? "Infinity"
              : this.props.data.attributes.minWidth,
            this.props.data.attributes.isTight
          ),
          minHeight: cssHeight(
            this.props.data.attributes.minHeight,
            this.props.data.attributes.isTight
          ),
          maxWidth: cssWidth(
            this.props.data.attributes.maxWidth,
            this.props.data.attributes.isTight
          ),
          maxHeight: cssHeight(
            this.props.data.attributes.maxHeight,
            this.props.data.attributes.isTight
          ),
          overflow:
            this.props.data.attributes.scrollable === true ? "scroll" : "hidden"
        }}
      >
        {this.props.children}
      </DivContextConsumer>
    );
  }
}
