import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class IgnorePointer extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          pointerEvents: this.props.data.attributes.ignoring
            ? "none"
            : undefined,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
