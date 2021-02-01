import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssConstraints } from "../utils/geometry";
import { View } from "@tarojs/components";

export class Stack extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          position: "relative",
          ...cssConstraints(this.props.data.constraints),
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
