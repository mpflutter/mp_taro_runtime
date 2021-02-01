import { Component } from "react";
import { MPComponentsProps } from "../component";
import { cssColor } from "../utils/color";
import { cssHeight } from "../utils/geometry";
import React from "react";
import { View } from "@tarojs/components";

export class Divider extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          display: "flex",
          minWidth: "100%",
          minHeight: cssHeight(this.props.data.attributes.height),
          maxWidth: "100%",
          maxHeight: cssHeight(this.props.data.attributes.height),
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            minWidth: "100%",
            minHeight: cssHeight(this.props.data.attributes.thickness),
            maxWidth: "100%",
            maxHeight: cssHeight(this.props.data.attributes.thickness),
            borderTopWidth: cssHeight(
              this.props.data.attributes.thickness,
              true
            ),
            borderTopStyle: "solid",
            borderTopColor: cssColor(this.props.data.attributes.color),
          }}
        ></View>
      </View>
    );
  }
}
