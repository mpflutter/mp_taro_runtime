import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class Visibility extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          visibility: this.props.data.attributes.visible ? "unset" : "hidden",
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
