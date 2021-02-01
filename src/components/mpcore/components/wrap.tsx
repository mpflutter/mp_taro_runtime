import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssConstraints, cssWidth } from "../utils/geometry";
import { View } from "@tarojs/components";

export class Wrap extends Component<{ data: MPComponentsProps }> {
  render() {
    let constraints = cssConstraints(this.props.data.constraints);
    return (
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
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
        {(this.props.children as any[])?.map((it: any, index: number) => {
          return (
            <View
              key={`item_${index}`}
              style={{
                marginRight: cssWidth(this.props.data.attributes.spacing),
                marginBottom: cssWidth(this.props.data.attributes.runSpacing),
              }}
            >
              {it}
            </View>
          );
        })}
      </View>
    );
  }
}
