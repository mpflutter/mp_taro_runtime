import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssConstraints } from "../utils/geometry";
import { View } from "@tarojs/components";

export class ConstrainedBox extends Component<{ data: MPComponentsProps }> {
  render() {
    if (!this.props.children || !(this.props.children as any).length) {
      return (
        <View style={{ ...cssConstraints(this.props.data.constraints) }}></View>
      );
    }
    return this.props.children;
  }
}
