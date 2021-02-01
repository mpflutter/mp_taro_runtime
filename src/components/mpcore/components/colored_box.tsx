import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssColor } from "../utils/color";
import { cssConstraints } from "../utils/geometry";
import { View } from "@tarojs/components";

export class ColoredBox extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          ...cssConstraints(this.props.data.constraints),
          backgroundColor: cssColor(this.props.data.attributes.color),
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
