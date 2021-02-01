import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class Opacity extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          opacity: this.props.data.attributes.opacity,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
