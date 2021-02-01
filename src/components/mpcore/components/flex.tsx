import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssConstraints, cssHeight, cssWidth } from "../utils/geometry";
import { View } from "@tarojs/components";

export class Flex extends Component<{ data: MPComponentsProps }> {
  render() {
    let constraints = cssConstraints(this.props.data.constraints);
    if (
      this.props.data.attributes.mainAxisSize === "MainAxisSize.max" &&
      this.props.data.attributes.direction === "Axis.vertical"
    ) {
      constraints.minHeight = this.props.data.constraints?.minHeight
        ? cssHeight(this.props.data.constraints.maxHeight)
        : "unset";
    } else if (
      this.props.data.attributes.mainAxisSize === "MainAxisSize.max" &&
      this.props.data.attributes.direction === "Axis.horizontal"
    ) {
      constraints.minWidth = this.props.data.constraints?.minWidth
        ? cssWidth(this.props.data.constraints.maxWidth)
        : "unset";
    }
    return (
      <View
        style={{
          display: "flex",
          flexDirection: (() => {
            switch (this.props.data.attributes.direction) {
              case "Axis.vertical":
                return "column";
              case "Axis.horizontal":
                return "row";
              default:
                return "column";
            }
          })(),
          justifyContent: (() => {
            switch (this.props.data.attributes.mainAxisAlignment) {
              case "MainAxisAlignment.start":
                return "flex-start";
              case "MainAxisAlignment.center":
                return "center";
              case "MainAxisAlignment.end":
                return "flex-end";
              case "MainAxisAlignment.spaceBetween":
                return "space-between";
              case "MainAxisAlignment.spaceAround":
                return "space-around";
              case "MainAxisAlignment.spaceEvenly":
                return "space-evenly";
              default:
                return "flex-start";
            }
          })(),
          alignItems: (() => {
            switch (this.props.data.attributes.crossAxisAlignment) {
              case "CrossAxisAlignment.start":
                return "flex-start";
              case "CrossAxisAlignment.center":
                return "center";
              case "CrossAxisAlignment.end":
                return "flex-end";
              case "CrossAxisAlignment.stretch":
                return "stretch";
              default:
                return "flex-start";
            }
          })(),
          ...constraints,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
