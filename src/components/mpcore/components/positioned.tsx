import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssWidth } from "../utils/geometry";
import { View } from "@tarojs/components";

export class Positioned extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          display: "flex",
          position: "absolute",
          left: cssWidth(this.props.data.attributes.left),
          top: cssWidth(this.props.data.attributes.top),
          right: cssWidth(this.props.data.attributes.right),
          bottom: cssWidth(this.props.data.attributes.bottom),
          width: cssWidth(this.props.data.attributes.width),
          height: cssWidth(this.props.data.attributes.height)
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
