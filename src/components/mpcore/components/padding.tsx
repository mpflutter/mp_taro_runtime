import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssPadding } from "../utils/geometry";
import { View } from "@tarojs/components";

export class Padding extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          ...cssPadding(this.props.data.attributes.padding),
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
