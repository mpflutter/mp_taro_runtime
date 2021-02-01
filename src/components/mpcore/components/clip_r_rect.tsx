import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssBorderRadius } from "../utils/geometry";
import { View } from "@tarojs/components";

export class ClipRRect extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          ...cssBorderRadius(this.props.data.attributes.borderRadius),
          overflow: "hidden",
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
