import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssWidth, cssHeight, cssOffset } from "../utils/geometry";
import { DivContextConsumer } from "./div_context";
import { cssColor } from "../utils/color";

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
          maxHeight:
            this.props.data.attributes.scrollable === true
              ? "unset"
              : cssHeight(
                  this.props.data.attributes.maxHeight,
                  this.props.data.attributes.isTight
                ),
          overflow:
            this.props.data.attributes.scrollable === true
              ? "scroll"
              : "visible",
          boxShadow:
            this.props.data.attributes.scrollable === true &&
            this.props.data.children[0]?.attributes?.decoration?.boxShadow?.[0]
              ? `${
                  cssOffset(
                    this.props.data.children[0].attributes.decoration
                      .boxShadow?.[0].offset
                  )?.dx
                }px ${
                  cssOffset(
                    this.props.data.children[0].attributes.decoration
                      .boxShadow?.[0].offset
                  )?.dy
                }px ${
                  this.props.data.children[0].attributes.decoration
                    .boxShadow?.[0].blurRadius
                }px ${
                  this.props.data.children[0].attributes.decoration
                    .boxShadow?.[0].spreadRadius
                }px ${cssColor(
                  this.props.data.children[0].attributes.decoration
                    .boxShadow?.[0].color
                )}`
              : undefined,
        }}
      >
        {this.props.children}
      </DivContextConsumer>
    );
  }
}
